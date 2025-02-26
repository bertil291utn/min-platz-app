import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BloqueInfoContextType {
  bloqueInfo: number;
  setBloqueInfo: (value: number) => void;
}

const BloqueInfoContext = createContext<BloqueInfoContextType | undefined>(undefined);

interface BloqueInfoProviderProps {
  children: ReactNode;
}

export const BloqueInfoProvider: React.FC<BloqueInfoProviderProps> = ({ children }) => {
  const [bloqueInfo, setBloqueInfo] = useState<number>(1);

  return (
    <BloqueInfoContext.Provider value={{ bloqueInfo, setBloqueInfo }}>
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
