"use client";

import { useState } from "react";

export default function NavButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button onClick={toggleNav}>
      {isOpen ? "Close Nav" : "Open Nav"}
    </button>
  );
}