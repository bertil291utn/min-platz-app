import React, { createContext, useContext, useState } from 'react';
import { Bloque } from '../interfaces/Bloque';

interface SelectedBloqueContextType {
  selectedBloque: Bloque | undefined;
  setSelectedBloque: (bloque: Bloque | undefined) => void;
}

const SelectedBloqueContext = createContext<SelectedBloqueContextType | undefined>(undefined);

export const SelectedBloqueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();

  return (
    <SelectedBloqueContext.Provider value={{ selectedBloque, setSelectedBloque }}>
      {children}
    </SelectedBloqueContext.Provider>
  );
};

export const useSelectedBloque = () => {
  const context = useContext(SelectedBloqueContext);
  if (context === undefined) {
    throw new Error('useSelectedBloque must be used within a SelectedBloqueProvider');
  }
  return context;
};
