"use client";

import { useState } from "react";
import NavButton from "./NavButton";
import { handleSignOut } from "@/app/lib/actions";

interface ClientStatusBarProps {
  session: any;
  formattedDate: string;
}

export default function ClientStatusBar({ 
  session, 
  formattedDate
}: ClientStatusBarProps) {

  return (
    <div className = "statusBar">
      <NavButton />
      <div style = { { display: "flex", gap: "24px" } }>
        <form action = { handleSignOut }>
          <button>{ session?.user ? `${ session.user.name } Sign Out` : "Sign In" }</button>
        </form>
        <p>New York City</p>
        <p>{ formattedDate }</p>
      </div>
    </div>
  );
}