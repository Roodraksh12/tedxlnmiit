// src/components/NavWrapper.jsx
import React from "react";
import NavbarProvider from "../context/NavContext.jsx";
import Navbar from "./Nav.jsx";
import FullScreenNav from "./FullScreenNav.jsx";

export default function NavWrapper({ pathname = '/' }) {
  return (
    <NavbarProvider>
      <Navbar pathname={pathname} />
      <FullScreenNav pathname={pathname} />
    </NavbarProvider>
  );
}
