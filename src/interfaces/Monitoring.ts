export interface DiseaseMonitored {
  id: number;
  name: string;
  folderName: string;
  tercio?: number; // Optional for acaros
}

export interface CuadroMonitored {
  id: number;
  name: string;
  diseases: DiseaseMonitored[];
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


export type MonitoringModal = 'monitorear-camas' | 'view' | 'monitorear-placas' | 'monitorear-mallas';