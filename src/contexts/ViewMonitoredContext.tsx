// import React, { createContext, useContext, useState } from 'react';
// import { BloqueMonitored, CamaMonitored, CuadroMonitored } from '../interfaces/Monitoring';
// import { SegmentViewBloque } from '../interfaces/Bloque';

// interface ViewMonitoredContextType {
//   activeViewSegment: SegmentViewBloque;
//   setActiveViewSegment: (segment: SegmentViewBloque) => void;
//   selectedBloque: BloqueMonitored | null;
//   setSelectedBloque: (bloque: BloqueMonitored | null) => void;
//   selectedCama: CamaMonitored | null;
//   setSelectedCama: (cama: CamaMonitored | null) => void;
//   selectedCuadro: CuadroMonitored | null;
//   setSelectedCuadro: (cuadro: CuadroMonitored | null) => void;
// }

// const ViewMonitoredContext = createContext<ViewMonitoredContextType | undefined>(undefined);

// export const ViewMonitoredProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [activeViewSegment, setActiveViewSegment] = useState<SegmentViewBloque>('bloques');
//   const [selectedBloque, setSelectedBloque] = useState<BloqueMonitored | null>(null);
//   const [selectedCama, setSelectedCama] = useState<CamaMonitored | null>(null);
//   const [selectedCuadro, setSelectedCuadro] = useState<CuadroMonitored | null>(null);

//   return (
//     <ViewMonitoredContext.Provider value={{
//       activeViewSegment,
//       setActiveViewSegment,
//       selectedBloque,
//       setSelectedBloque,
//       selectedCama,
//       setSelectedCama,
//       selectedCuadro,
//       setSelectedCuadro
//     }}>
//       {children}
//     </ViewMonitoredContext.Provider>
//   );
// };

// export const useViewMonitored = () => {
//   const context = useContext(ViewMonitoredContext);
//   if (context === undefined) {
//     throw new Error('useViewMonitored must be used within a ViewMonitoredProvider');
//   }
//   return context;
// };
