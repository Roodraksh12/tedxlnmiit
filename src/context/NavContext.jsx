import { createContext, useState } from "react";

export const NavbarContext = createContext();

export default function NavbarProvider({ children }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
   <NavbarContext.Provider value={{ navOpen, setNavOpen }}>

      {children}
    </NavbarContext.Provider>
  );
}
