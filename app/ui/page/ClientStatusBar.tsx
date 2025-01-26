"use client";

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

  const user = session?.user;

  return (
    <div className = "statusBar">
      { user && <NavButton /> }

      <div>
        { user &&
        
        <div style = { { display: "flex", gap: "24px" } }>
          <p>{ user.name }</p>
          <form action = { handleSignOut }>
          <button>{ user ? "Sign Out" : "" }</button>
          </form>
        </div>
         }

        <p>New York City</p>
        <p>{ formattedDate }</p>
      </div>
    </div>
  );
}