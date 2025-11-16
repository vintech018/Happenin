import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link to="/" className="brand">Happenin</Link>
        <nav>
          <Link to="/movies">Movies</Link>
          <Link to="/live-events">Live Events</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/about">About</Link>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <Link to="/login" className="btn">Login</Link>
        </nav>
      </div>
    </header>
  );
}

