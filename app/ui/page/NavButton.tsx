"use client";

interface NavButtonProps {
  nav: boolean;
  toggleNav: () => void;
}

export default function NavButton( { nav, toggleNav } : NavButtonProps) {
  return (
    <button onClick = { toggleNav }>
      { nav ? "Open" : "Close" }
    </button>
  );
}
