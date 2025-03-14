import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Bloque, SegmentBloque, SegmentViewBloque } from '../interfaces/Bloque';
import { Disease } from '../interfaces/Diseases';
import { BloqueMonitored, CuadroMonitored } from '../interfaces/Monitoring';
import { STORE_MONITORED_VAR } from '../helpers/bloquesConstant';
import { CURRENT_DATE_UTC5, getWeekNumber } from '../helpers/regularHelper';

interface MonitoringBloqueContextType {
  selectedBloque: Bloque | undefined;
  setSelectedBloque: (bloque: Bloque | undefined) => void;
  selectedCuadro: number | undefined;
  setSelectedCuadro: (cuadro: number | undefined) => void;
  selectedCama: number;
  setSelectedCama: Dispatch<SetStateAction<number>>;
  selectedDiseases: Disease[];
  setSelectedDiseases: Dispatch<SetStateAction<Disease[]>>;
  selectedCuadros: CuadroMonitored[];
  setSelectedCuadros: Dispatch<SetStateAction<CuadroMonitored[]>>;
  activeSegment: SegmentBloque;
  setActiveSegment: (segment: SegmentBloque) => void;
  updateMonitoring: (bloqueId: number, camaId: number, newCuadro: CuadroMonitored) => Promise<void>;
  syncWithDatabase: () => Promise<void>;
  isOnline: boolean;
  bloquesMonitored: BloqueMonitored[];
  getMonitoredBloques: () => void
  IsToastSavedOpen: boolean;
  setIsToastSavedOpen: Dispatch<SetStateAction<boolean>>;
  activeViewSegment: SegmentViewBloque;
  setActiveViewSegment: Dispatch<SetStateAction<SegmentViewBloque>>
}

const MonitoringBloqueContext = createContext<MonitoringBloqueContextType | undefined>(undefined);
const INITIAL_BLOQUES_MONITORED = [{
  id: 1,
  name: '',
  dateMonitoring: '',
  camas: []
}]

export const MonitoringBloqueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [activeSegment, setActiveSegment] = useState<SegmentBloque>('bloques');
  const [activeViewSegment, setActiveViewSegment] = useState<SegmentViewBloque>('bloques');
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();
  const [selectedCuadro, setSelectedCuadro] = useState<number>();
  const [selectedCama, setSelectedCama] = useState(1);
  const [selectedDiseases, setSelectedDiseases] = useState<Disease[]>([]);
  const [selectedCuadros, setSelectedCuadros] = useState<CuadroMonitored[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [bloquesMonitored, setBloquesMonitored] = useState<BloqueMonitored[]>([]);
  const [IsToastSavedOpen, setIsToastSavedOpen] = useState(false);

  useEffect(() => {
    // Set up online/offline listeners
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);



  const updateMonitoring = async (bloqueId: number, camaId: number, newCuadro: CuadroMonitored) => {
    let updatedBloques = [...bloquesMonitored];
    const currentWeekNumber = getWeekNumber(CURRENT_DATE_UTC5);

    // First check if there's any bloque in the same week
    let bloqueIndex = updatedBloques.findIndex(b =>
      b.weekNumber === currentWeekNumber && b.id === bloqueId
    );

    // If no bloque found in current week, check if we need to create a new one
    if (bloqueIndex === -1) {
      updatedBloques.push({
        id: bloqueId,
        name: `Bloque ${bloqueId}`,
        dateMonitoring: CURRENT_DATE_UTC5.toISOString(),
        weekNumber: currentWeekNumber,
        camas: []
      });
      bloqueIndex = updatedBloques.length - 1;
    }

    // Find or create cama
    let cama = updatedBloques[bloqueIndex].camas.find(c => c.id === camaId);
    if (!cama) {
      updatedBloques[bloqueIndex].camas.push({
        id: camaId,
        name: `Cama ${camaId}`,
        cuadros: []
      });
      cama = updatedBloques[bloqueIndex].camas[updatedBloques[bloqueIndex].camas.length - 1];
    }

    // Find and update existing cuadro or add new one
    const cuadroIndex = cama.cuadros.findIndex(c => c.id === newCuadro.id);
    if (cuadroIndex !== -1) {
      cama.cuadros[cuadroIndex] = newCuadro;
    } else {
      cama.cuadros.push(newCuadro);
    }

    // Update local state and storage
    setBloquesMonitored(updatedBloques);
    localStorage.setItem(STORE_MONITORED_VAR, JSON.stringify(updatedBloques));

    // If online, sync with database
    if (isOnline) {
      try {
        await updateDatabaseMonitoring(bloqueId, camaId, newCuadro);
      } catch (error) {
        console.error('Failed to sync with database:', error);
      }
    }
  };

  const syncWithDatabase = async () => {
    if (!isOnline) return;

    try {
      // Here you would implement your database sync logic
      const response = await fetch('/api/monitoring/sync', {
        method: 'POST',
        body: JSON.stringify(bloquesMonitored)
      });
      const updatedData = await response.json();
      setBloquesMonitored(updatedData);
      localStorage.setItem(STORE_MONITORED_VAR, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to sync with database:', error);
    }
  };


  const getMonitoredBloques = async () => {
    const localBloques = localStorage.getItem(STORE_MONITORED_VAR);
    if (navigator.onLine) {
      // TODO: Replace with actual database fetch call
      try {
        const response = await fetch('/api/monitored-bloques');
        const dbBloques = await response.json();
        localStorage.setItem(STORE_MONITORED_VAR, JSON.stringify(dbBloques));
        setBloquesMonitored(dbBloques);
      } catch (error) {
        if (localBloques) {
          setBloquesMonitored(JSON.parse(localBloques));
        }
      }
    } else if (localBloques) {
      setBloquesMonitored(JSON.parse(localBloques));
    }
  }

  return (
    <MonitoringBloqueContext.Provider value={{
      selectedBloque,
      setSelectedBloque,
      activeSegment,
      setActiveSegment,
      selectedCuadro,
      setSelectedCuadro,
      selectedCama,
      setSelectedCama,
      selectedDiseases,
      setSelectedDiseases,
      updateMonitoring,
      syncWithDatabase,
      isOnline,
      bloquesMonitored,
      selectedCuadros,
      setSelectedCuadros,
      getMonitoredBloques,
      IsToastSavedOpen,
      setIsToastSavedOpen,
      activeViewSegment,
      setActiveViewSegment
    }}>
      {children}
    </MonitoringBloqueContext.Provider>
  );
};

export const useMonitoringBloque = () => {
  const context = useContext(MonitoringBloqueContext);
  if (context === undefined) {
    throw new Error('useMonitoringBloque must be used within a MonitoringBloqueProvider');
  }
  return context;
};


const updateDatabaseMonitoring = async (bloqueId: number, camaId: number, newCuadro: CuadroMonitored) => {
  // Implement your API call here
  const response = await fetch('/api/monitoring/update', {
    method: 'POST',
    body: JSON.stringify({ bloqueId, camaId, newCuadro })
  });
  if (!response.ok) {
    throw new Error('Failed to update database');
  }
  return await response.json();
};