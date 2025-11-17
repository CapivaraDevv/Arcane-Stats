import { useState, useEffect } from 'react';

export interface ConfigType {
  animacoes: boolean;
  reduzirMovimento: boolean;
  densidadeCompacta: boolean;
  notificacoesPush: boolean;
  notificacoesEmail: boolean;
  alertasPartidas: boolean;
  alertasEstatisticas: boolean;
  mostrarGraficos: boolean;
  mostrarDicas: boolean;
  autoRefresh: boolean;
  intervaloRefresh: number;
  salvarHistorico: boolean;
  compartilharEstatisticas: boolean;
  modoPrivado: boolean;
  cacheImagens: boolean;
  preloadDados: boolean;
}

export const defaultConfigs: ConfigType = {
  animacoes: true,
  reduzirMovimento: false,
  densidadeCompacta: false,
  notificacoesPush: true,
  notificacoesEmail: false,
  alertasPartidas: true,
  alertasEstatisticas: true,
  mostrarGraficos: true,
  mostrarDicas: true,
  autoRefresh: false,
  intervaloRefresh: 30,
  salvarHistorico: true,
  compartilharEstatisticas: false,
  modoPrivado: false,
  cacheImagens: true,
  preloadDados: true,
};

const STORAGE_KEY = 'arcane-stats-config';

export const useConfig = () => {
  const [configs, setConfigs] = useState<ConfigType>(defaultConfigs);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar configurações do localStorage ao montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfigs({ ...defaultConfigs, ...parsed });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salvar configurações no localStorage
  const saveConfigs = (newConfigs: ConfigType) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfigs));
      setConfigs(newConfigs);
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  };

  // Restaurar configurações padrão
  const resetConfigs = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setConfigs(defaultConfigs);
      return true;
    } catch (error) {
      console.error('Erro ao restaurar configurações:', error);
      return false;
    }
  };

  // Atualizar uma configuração específica
  const updateConfig = <K extends keyof ConfigType>(key: K, value: ConfigType[K]) => {
    const newConfigs = { ...configs, [key]: value };
    setConfigs(newConfigs);
    saveConfigs(newConfigs);
  };

  return {
    configs,
    isLoaded,
    saveConfigs,
    resetConfigs,
    updateConfig,
    setConfigs,
  };
};

