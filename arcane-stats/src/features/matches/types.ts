export type Resultado = 'Vitória' | 'Derrota';

export interface Partida {
  id: number;
  data: string;
  resultado: Resultado;
  duracao: string;
  modo: string;
  kda: string;
  campeao: string;
  build: number[];
  role: string;
  gold: number;
  dano: number;
  visao: number;
}
