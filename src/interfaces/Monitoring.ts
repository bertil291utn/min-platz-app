import { DiseaseMain } from './Diseases';

export interface DiseaseMonitored extends DiseaseMain {
  tercio?: number; // Optional for acaros
}

export interface CuadroMonitored {
  id: number;
  name: string;
  diseases: DiseaseMonitored[];
  //if there's no listed disease it might need to be added a modal to add new disease and be selected
  notes?: string;
}

export interface CamaMonitored {
  id: number;
  name: string;
  cuadros: CuadroMonitored[];
}

export interface BloqueMonitored {
  id: number;
  name: string;
  dateMonitoring: string;
  weekNumber: number;
  camas: CamaMonitored[];
}


export type MonitoringModal = 'monitorear-camas' | 'monitorear-placas' | 'monitorear-mallas' | 'view-camas' | 'view-placas' | 'view-mallas';