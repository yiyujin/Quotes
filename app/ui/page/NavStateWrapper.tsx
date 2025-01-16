"use client";
import { ReactNode } from "react";
import { useNav } from "./NavContext";

interface NavStateWrapperProps {
  children: ReactNode;
}

export default function NavStateWrapper({ children }: NavStateWrapperProps) {
  const { nav } = useNav();

  return (
    <div className={`sidenav ${nav ? "closed" : ""}`}>
      {children}
    </div>
  );
}