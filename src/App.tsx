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

  const key = currentPage;

  switch (currentPage) {
    case "about":
      return <AboutPage key={key} />;
    case "culture":
      return <CulturePage key={key} />;
    case "contact":
      return <ContactPage key={key} />;
    default:
      return <HomePage key={key} />;
  }
}

function App() {
  return (
    <AppProvider>
      <div className="app">
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
