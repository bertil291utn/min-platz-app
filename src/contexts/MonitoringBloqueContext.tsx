import React, { createContext, useContext, useState } from 'react';
import { Bloque, SegmentBloque } from '../interfaces/Bloque';

interface MonitoringBloqueContextType {
  selectedBloque: Bloque | undefined;
  setSelectedBloque: (bloque: Bloque | undefined) => void;
  activeSegment: SegmentBloque;
  setActiveSegment: (segment: SegmentBloque) => void;
}

const MonitoringBloqueContext = createContext<MonitoringBloqueContextType | undefined>(undefined);

export const MonitoringBloqueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();
  const [activeSegment, setActiveSegment] = useState<SegmentBloque>('bloques');

  return (
    <MonitoringBloqueContext.Provider value={{
      selectedBloque,
      setSelectedBloque,
      activeSegment,
      setActiveSegment
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
