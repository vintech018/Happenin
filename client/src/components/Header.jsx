import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link to="/" className="brand">Happenin</Link>
        <nav>
          <Link to="/movies">Movies</Link>
          <Link to="/live-events">Live Events</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/about">About</Link>
          <Link to="/login" className="btn">Login</Link>
        </nav>
      </div>
    </header>
  );
}

