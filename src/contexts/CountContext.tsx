// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface CountContextType {
//   count: number;
//   setCount: (value: number) => void;
// }

// const CountContext = createContext<CountContextType | undefined>(undefined);

// interface CountProviderProps {
//   children: ReactNode;
// }

// export const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
//   const [count, setCount] = useState<number>(1);

//   return (
//     <CountContext.Provider value={{ count, setCount }}>
//       {children}
//     </CountContext.Provider>
//   );
// };

// export const useCount = (): CountContextType => {
//   const context = useContext(CountContext);
//   if (context === undefined) {
//     throw new Error('useCount must be used within a CountProvider');
//   }
//   return context;
// };
