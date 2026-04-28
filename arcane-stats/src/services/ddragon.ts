// services/ddragon.ts

// helpers to build URLs for the Data Dragon assets.  A small "translation" layer
// between the numeric identifiers that the Riot API returns and the visual atoms
// that Data Dragon exposes.

type Champion = {
  id: string;
  key: string;
};

type ChampionResponse = {
  data: Record<string, Champion>;
};

export const getChampionIcon = (version: string, championName: string) => {
  // Data Dragon uses the internal champion id, e.g. "Vayne", "Aatrox" etc.
  // caller is responsible for normalising/removing accents if necessary
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
};

export const getItemIcon = (version: string, itemId: number) => {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
};

export const getSpellIcon = (version: string, spellName: string) => {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellName}.png`;
};

// utility that downloads the champion catalogue once and returns a map from the
// numeric key used by the Riot API ("67") to the internal name used by
// Data Dragon ("Vayne").  callers can cache the result for the current patch
// and reuse it for every participant in a match.
export const fetchChampionMap = async (version: string): Promise<Record<number, string>> => {
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
  
  if (!res.ok) throw new Error(`failed to fetch champion list: ${res.status}`);

  const json: ChampionResponse = await res.json();

  const map: Record<number, string> = {};

  Object.values(json.data).forEach((champ) => {
    map[Number(champ.key)] = champ.id;
  });
  return map;
};

// helper to normalise a full `gameVersion` string like "14.5.562.1234" into
// the two‑segment version that Data Dragon uses ("14.5").  callers that know the
// version field on a match can apply this before passing it to the provider so
// older games continue to show the correct assets.
export const extractPatchVersion = (gameVersion: string) => {
  const parts = gameVersion.split('.');
  return parts.slice(0, 2).join('.');
};

// (optional) similar helpers could be added for items, runes, spells etc.
// for now the provider only needs champions, but expanding later is trivial.