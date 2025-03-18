// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// import { EXPERT_USER, USER_AUTH } from '../helpers/AuthConst';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (value: boolean) => void;
//   logout: () => void;
//   expertUser: boolean;
//   setExpertUser: (value: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [expertUser, setExpertUser] = useState<boolean>(false);

//   useEffect(() => {
//     // Check if user auth exists in local storage
//     const userAuth = localStorage.getItem(USER_AUTH);
    
//     if (userAuth) {
//       try {
//         const authData = JSON.parse(userAuth);
//         const now = new Date().getTime();
        
//         // Check if token is still valid (not expired)
//         if (authData.expiry && authData.expiry > now) {
//           setIsAuthenticated(true);
//         } else {
//           // Token expired, clean up
//           localStorage.removeItem(USER_AUTH);
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         // Invalid JSON, clean up
//         localStorage.removeItem(USER_AUTH);
//         setIsAuthenticated(false);
//       }
//     }

//     // Load expert user preference
//     const expertPreference = localStorage.getItem(EXPERT_USER);
//     if (expertPreference) {
//       setExpertUser(JSON.parse(expertPreference));
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem(USER_AUTH);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       isAuthenticated, 
//       setIsAuthenticated, 
//       logout,
//       expertUser,
//       setExpertUser 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
