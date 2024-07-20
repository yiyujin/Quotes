import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from './ui/editor/sidenav';

// const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body>
        <div className="flex h-screen flex-row">
          <SideNav />
          <div className="flex grow">
            <div className="flex grow justify-center items-center">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}