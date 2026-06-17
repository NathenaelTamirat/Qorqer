import { useState, type ReactNode } from "react";
import { AppContext, pageContent } from "./AppContext";

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState("home");

  const value = {
    siteName: "Adiss Qoqer",
    siteTagline: "Celebrating youngesters ethiopian breakfast snack",
    image1: "/qoqer 1.png",
    image2: "/qoqer 2.png",
    currentPage,
    pages: pageContent,
    setCurrentPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
