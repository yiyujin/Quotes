// contexts/NavContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface NavContextType {
  nav: boolean;
  toggleNav: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav(!nav);

  return (
    <NavContext.Provider value={{ nav, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
}