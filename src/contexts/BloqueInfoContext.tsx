import React, { createContext, useState, useContext, ReactNode } from 'react';
import { BLOQUE_KEY_LOCAL_STORAGE } from '../helpers/bloquesConstant';

export interface Bloque {
  id?: number;
  location?: string;
  name: string;
  description?: string;
  numCuadrantes: number;
  numCamas: number;
  numCuadrosPerCama: number;
  archived?: boolean;
}

interface BloqueInfoContextType {
  bloques: Bloque[];
  archivedBloques: Bloque[];
  activeBloques: Bloque[];
  setBloques: (bloques: Bloque[]) => void;
  addBloque: (bloque: Bloque) => void;
  removeBloque: (id: number) => void;
  unarchiveBloque: (id: number) => void;
  editBloque: (id: number, updatedBloque: Bloque) => void;
  getBloques: () => void
}

export const INITIAL_BLOQUE = {
  id: 1,
  location: '',
  name: '',
  description: '',
  numCamas: 0,
  numCuadrantes: 0,
  numCuadrosPerCama: 0,
  archived: false
}


const BloqueInfoContext = createContext<BloqueInfoContextType | undefined>(undefined);

interface BloqueInfoProviderProps {
  children: ReactNode;
}

export const BloqueInfoProvider: React.FC<BloqueInfoProviderProps> = ({ children }) => {
  const [bloques, setBloques] = useState<Bloque[]>([]);

  const addBloque = (bloque: Bloque) => {
    if (bloques.length < 10) {
      const newBloque: Bloque = {
        ...bloque,
        id: bloques.length + 1,
      }
      const bloquesToAdd = [...bloques, newBloque];
      setBloques(bloquesToAdd);
      localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(bloquesToAdd));
      //store in database 
    };
  }

  const removeBloque = (id: number) => {
    if (bloques.length >= 1) {
      setBloques(bloques.map(bloque =>
        bloque.id === id ? { ...bloque, archived: true } : bloque
      ));
      localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(bloques.map(bloque =>
        bloque.id === id ? { ...bloque, archived: true } : bloque
      )));
      //set also as false in database
    }
  };

  const unarchiveBloque = (id: number) => {
    setBloques(bloques.map(bloque =>
      bloque.id === id ? { ...bloque, archived: false } : bloque
    ));
    localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(bloques.map(bloque =>
      bloque.id === id ? { ...bloque, archived: false } : bloque
    )));
    //update in database
  };

  const editBloque = (id: number, updatedBloque: Bloque) => {
    setBloques(bloques.map(bloque =>
      bloque.id === id ? { ...updatedBloque, id } : bloque
    ));
    localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(bloques.map(bloque =>
      bloque.id === id ? { ...updatedBloque, id } : bloque
    )));
    //update in database
  };

  const archivedBloques = bloques.filter(bloque => bloque.archived);
  const activeBloques = bloques.filter(bloque => !bloque.archived);

  const getBloques = async () => {
    const localBloques = localStorage.getItem(BLOQUE_KEY_LOCAL_STORAGE);
    if (navigator.onLine) {
      // TODO: Replace with actual database fetch call
      try {
        const response = await fetch('/api/bloques');
        const dbBloques = await response.json();
        localStorage.setItem(BLOQUE_KEY_LOCAL_STORAGE, JSON.stringify(dbBloques));
        setBloques(dbBloques);
      } catch (error) {
        if (localBloques) {
          setBloques(JSON.parse(localBloques));
        }
      }
    } else if (localBloques) {
      setBloques(JSON.parse(localBloques));
    }
  }




  // add a function to send new stored data from local storage  to the database automatically when the user is online or manually by a button press by user
  return (
    <BloqueInfoContext.Provider value={{
      bloques,
      setBloques,
      addBloque,
      removeBloque,
      editBloque,
      archivedBloques,
      activeBloques,
      getBloques,
      unarchiveBloque
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
