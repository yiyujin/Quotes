import type { Metadata } from "next";
import "./globals.css";
import SideNav from './ui/editor/sidenav';
import StatusBar from "./ui/page/StatusBar";
import { notoSerifKorean } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: "Quotes",
  description: "Quotes Made Fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang = "en">
      <body className = {`${notoSerifKorean.className} antialiased`}>
        <div>
          <StatusBar/>
          <div style = { { display : "flex", width : "100vw", height : "100vh" } }>
            <SideNav/>
            { children }
          </div>
        </div>
      </body>
    </html>
  );
}