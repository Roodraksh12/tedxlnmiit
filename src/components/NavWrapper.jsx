// src/components/NavWrapper.jsx
import React from "react";
import Navbar from "./Nav.jsx";

export default function NavWrapper({ pathname = '/' }) {
  return <Navbar pathname={pathname} />;
}
