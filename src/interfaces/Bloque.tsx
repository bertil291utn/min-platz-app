export interface Bloque {
  id?: number;
  location?: string;
  name: string;
  description?: string;
  numCuadrantes: number;
  numCamas: number;
  numCuadrosPerCama: number;
  archived?: boolean;
}

export type SegmentBloque = 'bloques' | 'monitoring-options' | 'camas' | 'diseases' | 'options' | 'placas' | 'mallas';
export type SegmentViewBloque = 'bloques' | 'camas' | 'cuadros' | 'details';