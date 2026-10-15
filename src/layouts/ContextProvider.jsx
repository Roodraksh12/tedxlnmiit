import { createContext, useState } from 'react';

export const AppContext = createContext();

export default function ContextProvider({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  return (
    <AppContext.Provider value={{ isNavOpen, setIsNavOpen }}>
      {children}
    </AppContext.Provider>
  );
}
