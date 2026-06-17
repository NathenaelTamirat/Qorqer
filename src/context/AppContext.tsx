import { createContext, useContext } from "react";

interface PageContent {
  title: string;
  subtitle: string;
}

export interface AppContextType {
  siteName: string;
  siteTagline: string;
  image1: string;
  image2: string;
  currentPage: string;
  pages: Record<string, PageContent>;
  setCurrentPage: (page: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const pageContent: Record<string, PageContent> = {
  home: {
    title: "Welcome to",
    subtitle: "Celebrating youngesters ethiopian breakfast snack",
  },
  about: {
    title: "About Qorqer",
    subtitle: "The story behind Ethiopia's beloved street snack",
  },
  culture: {
    title: "Qorqer Culture",
    subtitle: "A taste of Ethiopian youth and tradition",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you",
  },
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
