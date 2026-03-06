import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as ddragon from '../services/ddragon';

interface AssetContextType {
  version: string;
  championMap: Record<number, string>;

  /**
   * override the version that will be used for every URL.  useful when replaying
   * an old match where the gameVersion field is known, or for tests.
   */
  setVersion: (version: string) => void;

  /**
   * build a full URL to a champion icon given the internal name
   */
  getChampionIcon: (championName: string) => string;

  /**
   * convert a numeric championId returned by the Riot API into a URL.  the
   * provider keeps the championMap loaded so this is a one‑liner for callers.
   */
  getChampionIconById: (championId: number) => string;

  getItemIcon: (itemId: number) => string;
  getSpellIcon: (spellName: string) => string;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  // start with empty string so we don't accidentally request `/cdn/latest`
  const [version, setVersion] = useState<string>('');
  const [championMap, setChampionMap] = useState<Record<number, string>>({});

  // load the current patch version once
  useEffect(() => {
    const loadVersion = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions: string[] = await response.json();
        if (versions && versions.length > 0) setVersion(versions[0]);
      } catch (err) {
        console.error('failed to fetch ddragon version', err);
      }
    };
    loadVersion();
  }, []);

  // whenever we know a concrete version (not the placeholder 'latest'),
  // fetch the champion catalogue. the initial state is 'latest' which is
  // convenient for building URLs but doesn't work for the JSON metadata –
  // the CDN rejects the request with 403, so we skip it until we replace the
  // value with an actual patch string.
  useEffect(() => {
    if (!version || version === 'latest') return;
    ddragon.fetchChampionMap(version)
      .then(setChampionMap)
      .catch(err => console.error('failed to fetch champion map', err));
  }, [version]);


  const getChampionIcon = (championName: string) => {
    const v = version || 'latest';
    return ddragon.getChampionIcon(v, championName);
  };

  const getChampionIconById = (championId: number) => {
    const name = championMap[championId];
    return name ? ddragon.getChampionIcon(version, name) : '';
  };

  const getItemIcon = (itemId: number) => {
    const v = version || 'latest';
    return ddragon.getItemIcon(v, itemId);
  };
  const getSpellIcon = (spellName: string) => {
    const v = version || 'latest';
    return ddragon.getSpellIcon(v, spellName);
  };

  const value: AssetContextType = {
    version,
    championMap,
    setVersion,
    getChampionIcon,
    getChampionIconById,
    getItemIcon,
    getSpellIcon,
  };

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
};

export const useAssets = (): AssetContextType => {
  const ctx = useContext(AssetContext);
  if (!ctx) throw new Error('useAssets must be used within an AssetProvider');
  return ctx;
};
