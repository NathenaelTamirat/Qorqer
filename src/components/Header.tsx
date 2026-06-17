import { useAppContext } from "../context/AppContext";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "culture", label: "Culture" },
  { id: "contact", label: "Contact" },
];

function Header() {
  const { siteName, currentPage, setCurrentPage } = useAppContext();

  return (
    <header className="header">
      <div className="header-bg" />
      <div className="header-content">
        <button className="site-logo" onClick={() => setCurrentPage("home")}>
          <span className="logo-icon">✦</span>
          <span className="logo-text">{siteName}</span>
        </button>
        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? "active" : ""}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <span className="nav-label">{item.label}</span>
              {currentPage === item.id && <span className="nav-indicator" />}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
