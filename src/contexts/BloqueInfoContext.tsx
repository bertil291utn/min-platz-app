import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Nave {
  id: number;
  location: string;
  name: string;
  numCamas: number;
  numCuadrosPerCama: number;
  description: string;
}

interface Bloque {
  id: number;
  location: string;
  name: string;
  description: string;
  naves: Nave[];
}

interface BloqueInfoContextType {
  bloques: Bloque[];
  setBloques: (bloques: Bloque[]) => void;
  addBloque: () => void;
  removeBloque: (id: number) => void;
}

const BloqueInfoContext = createContext<BloqueInfoContextType | undefined>(undefined);

interface BloqueInfoProviderProps {
  children: ReactNode;
}

export const BloqueInfoProvider: React.FC<BloqueInfoProviderProps> = ({ children }) => {
  const [bloques, setBloques] = useState<Bloque[]>([
    {
      id: 1,
      location: '',
      name: '',
      description: '',
      naves: [
        {
          id: 1,
          location: '',
          name: '',
          numCamas: 0,
          numCuadrosPerCama: 0,
          description: ''
        }
      ]
    }
  ]);

  const addBloque = () => {
    if (bloques.length < 10) {
      const newBloque: Bloque = {
        id: bloques.length + 1,
        location: '',
        name: '',
        description: '',
        naves: [
          {
            id: 1,
            location: '',
            name: '',
            numCamas: 0,
            numCuadrosPerCama: 0,
            description: ''
          }
        ]
      };
      setBloques([...bloques, newBloque]);
    }
  };

  const removeBloque = (id: number) => {
    if (bloques.length > 1) {
      setBloques(bloques.filter(bloque => bloque.id !== id));
    }
  };

  return (
    <BloqueInfoContext.Provider value={{ bloques, setBloques, addBloque, removeBloque }}>
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
