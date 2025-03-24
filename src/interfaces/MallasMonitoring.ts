import { Disease } from './Diseases';
import { Bloque } from './Bloque';

export type MallasSegment = 'bloques' | 'variety' | 'diseases' | 'details';

export interface DiseaseStatus extends Disease {
  status: 'vivo' | 'muerto';
  count: number;
}

export interface MallaMonitored {
  id: number;
  bloqueId: number;
  dateMonitoring: string;
  weekNumber: number;
  variety: string;
  diseases: DiseaseStatus[];
  observations?: string;
}

export interface BloqueMallaMonitored {
  id: number;
  name: string;
  dateMonitoring: string;
  weekNumber: number;
  mallas: MallaMonitored[];
}