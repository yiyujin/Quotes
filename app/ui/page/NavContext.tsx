"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface NavContextType {
  nav: boolean;
  toggleNav: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState(false);
  const toggleNav = () => setNav(!nav);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if ( (event.metaKey || event.ctrlKey) && event.key === "\\" ) {
        event.preventDefault();
        setNav(prevNav => !prevNav);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <NavContext.Provider value = { { nav, toggleNav } }>
      { children }
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