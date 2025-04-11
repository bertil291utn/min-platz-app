import React from 'react';
import { useLocation } from 'react-router';
import HelpFab from './HelpFab';

const excludedPaths = ['/login', '/register', '/planes', '/settings'];

export const HelpFabWrapper: React.FC = () => {
  const location = useLocation();
  
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return <HelpFab />;
};

export default HelpFabWrapper; 