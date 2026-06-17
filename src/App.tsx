import { useAppContext } from "./context/AppContext";
import { AppProvider } from "./context/AppProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CulturePage from "./pages/CulturePage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function PageRenderer() {
  const { currentPage } = useAppContext();

  switch (currentPage) {
    case "about":
      return (
        <div key="about" className="page-wrapper">
          <AboutPage />
        </div>
      );
    case "culture":
      return (
        <div key="culture" className="page-wrapper">
          <CulturePage />
        </div>
      );
    case "contact":
      return (
        <div key="contact" className="page-wrapper">
          <ContactPage />
        </div>
      );
    default:
      return (
        <div key="home" className="page-wrapper">
          <HomePage />
        </div>
      );
  }
}

function App() {
  return (
    <AppProvider>
      <div className="app">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
        <Header />
        <main className="main-content">
          <PageRenderer />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
