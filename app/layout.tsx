import type { Metadata } from "next";
import "./globals.css";
import SideNav from './ui/editor/sidenav';
import { notoSerifKorean } from '@/app/ui/fonts';
import { NavProvider } from "./ui/page/NavContext";
import NavButton from "./ui/page/NavButton";
import NavStateWrapper from "./ui/page/NavStateWrapper";
import ServerStatusBar from "./ui/page/ServerStatusBar";

import { auth } from "@/auth";


export const metadata: Metadata = {
  title: "Quotes",
  description: "Quotes Made Fun",
};

export default async function RootLayout( { children, } : Readonly<{ children: React.ReactNode; }>){
  const session = await auth();

  return (
    <html lang = "en">
      <body className = {`${notoSerifKorean.className} antialiased`}>
        <div style = { { width : "100vw", height : "100vh" } }>
          <NavProvider>
            <ServerStatusBar/>
            <div style = { { display : "flex", flexDirection : "row", height : "calc(100% - 24px)" } }>

              { session?.user ?
                <NavStateWrapper>
                  <SideNav/>
                </NavStateWrapper>
              : ""}
              
              { children }
            </div>
            
          </NavProvider>
        </div>
      </body>
    </html>
  );
}