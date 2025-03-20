import { DiseaseMonitored } from './Monitoring';

export type PlacaType = 'interno' | 'externo';
export type PlacasSegment = 'bloques' | 'type' | 'number' | 'diseases' | 'details';

export interface DiseaseInPlaca extends DiseaseMonitored {
  count: number;
}

export interface PlacaMonitored {
  id: number;
  type: PlacaType;
  diseases: DiseaseInPlaca[];
  notes?: string;
}

export interface BloqueMonPlaca {
  id: number;
  name: string;
  dateMonitoring: string;
  weekNumber: number;
  placas: PlacaMonitored[];
}