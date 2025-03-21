export interface PlacaDetails {
  id: number;
  description: string;
  type: 'interno' | 'externo';
}

export interface Bloque {
  id?: number;
  location?: string;
  name: string;
  description?: string;
  numCuadrantes: number;
  numCamas: number;
  numCuadrosPerCama: number;
  archived?: boolean;
  placasDetails?: PlacaDetails[];
}

export type SegmentBloque = 'bloques' | 'camas' | 'diseases' | 'options' | 'cuadros';
export type SegmentViewBloque = 'bloques' | 'camas' | 'cuadros' | 'details';