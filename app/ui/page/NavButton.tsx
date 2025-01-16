"use client";
import { useNav } from "./NavContext";

export default function NavButton() {
  const { nav, toggleNav } = useNav();
  
  return (
    <div>
      <button onClick = { toggleNav }>
        {nav ? "Open" : "Close"}
      </button>
    </div>
  );
}