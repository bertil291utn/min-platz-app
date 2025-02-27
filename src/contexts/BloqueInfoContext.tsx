import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Bloque {
  id?: number;
  location?: string;
  name: string;
  description?: string;
  numCuadrantes: number;
  numCamas: number;
  numCuadrosPerCama: number;
}

interface BloqueInfoContextType {
  bloques: Bloque[];
  setBloques: (bloques: Bloque[]) => void;
  addBloque: (bloque:Bloque) => void;
  removeBloque: (id: number) => void;
}

export const INITIAL_BLOQUE={
  id: 1,
  location: '',
  name: 'Bloque ',
  description: '',
  numCamas: 0,
  numCuadrantes: 0,
  numCuadrosPerCama: 0,
}


const BloqueInfoContext = createContext<BloqueInfoContextType | undefined>(undefined);

interface BloqueInfoProviderProps {
  children: ReactNode;
}

export const BloqueInfoProvider: React.FC<BloqueInfoProviderProps> = ({ children }) => {
  const [bloques, setBloques] = useState<Bloque[]>([]);

  const addBloque = (bloque:Bloque) => {
    if (bloques.length < 10) {
      const newBloque: Bloque = {
        ...bloque,
        id: bloques.length + 1,
        name: `Bloque ${bloques.length + 1}`
      }
      setBloques([...bloques, newBloque]);
    };
  }

  const removeBloque = (id: number) => {
    if (bloques.length > 1) {
      setBloques(bloques.filter(bloque => bloque.id !== id));
    }
  };

  return (
    <BloqueInfoContext.Provider value={{
      bloques,
      setBloques,
      addBloque,
      removeBloque,
    }}>
      {children}
    </BloqueInfoContext.Provider>
  );
};

export const useBloqueInfo = (): BloqueInfoContextType => {
  const context = useContext(BloqueInfoContext);
  if (context === undefined) {
    throw new Error('useBloqueInfo must be used within a BloqueInfoProvider');
  }
  return context;
};
