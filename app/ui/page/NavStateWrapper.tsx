"use client";

import { useState, ReactNode } from "react";

interface NavStateWrapperProps {
  children: ReactNode;
}

export default function NavStateWrapper( { children } : NavStateWrapperProps ) {
  const [nav, setNav] = useState(true);
  const toggleNav = () => setNav(!nav);

  return (
    <div>
      <div style = { { width : "100%", backgroundColor : "red"} }>
      <button onClick = { toggleNav }>
        { nav ? "Open" : "Close"}
      </button>
      </div>

      <div className = {`sidenav ${nav ? "closed" : ""}`}>
        { children }
      </div>

    </div>
  );
}
