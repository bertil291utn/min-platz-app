import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Bloque, SegmentBloque } from '../interfaces/Bloque';
import { Disease } from '../interfaces/Diseases';
import { BloqueMonitored, CuadroMonitored } from '../interfaces/Monitoring';

interface MonitoringBloqueContextType {
  selectedBloque: Bloque | undefined;
  setSelectedBloque: (bloque: Bloque | undefined) => void;
  selectedCuadro: number | undefined;
  setSelectedCuadro: (cuadro: number | undefined) => void;
  selectedCama: number;
  setSelectedCama: Dispatch<SetStateAction<number>>;
  selectedDiseases: Disease[];
  setSelectedDiseases: Dispatch<SetStateAction<Disease[]>>;
  activeSegment: SegmentBloque;
  setActiveSegment: (segment: SegmentBloque) => void;
  updateMonitoring: (bloqueId: number, camaId: number, newCuadro: CuadroMonitored) => Promise<void>;
  syncWithDatabase: () => Promise<void>;
  isOnline: boolean;
  bloquesMonitored: BloqueMonitored[];
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
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();
  const [selectedCuadro, setSelectedCuadro] = useState<number>();
  const [selectedCama, setSelectedCama] = useState(1);
  const [selectedDiseases, setSelectedDiseases] = useState<Disease[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [bloquesMonitored, setBloquesMonitored] = useState<BloqueMonitored[]>([]);

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
    // Find or create bloque
    let bloqueIndex = updatedBloques.findIndex(b => b.id === bloqueId);
    if (bloqueIndex === -1) {
      updatedBloques.push({
      id: bloqueId,
      name: `Bloque ${bloqueId}`,
      dateMonitoring: new Date().toISOString(),
      camas: []
      });
      bloqueIndex = updatedBloques.length - 1;
    }

    // Find or create cama
    let cama = updatedBloques[bloqueIndex].camas.find(c => c.id === camaId);
    if (!cama) {
      updatedBloques[bloqueIndex].camas.push({
      id: camaId,
      name:`Cama ${camaId}`,
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
    console.log(updatedBloques)
    // Update local state and storage
    setBloquesMonitored(updatedBloques);
    localStorage.setItem('monitoring', JSON.stringify(updatedBloques));

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
      localStorage.setItem('monitoring', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to sync with database:', error);
    }
  };


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
      bloquesMonitored
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