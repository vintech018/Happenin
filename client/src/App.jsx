import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetailPage from './pages/MovieDetailPage';
import MovieShowtimes from './pages/MovieShowtimes';
import MovieSeats from './pages/MovieSeats';
import Checkout from './pages/Checkout';
import LiveEvents from './pages/LiveEvents';
import LiveEventDetail from './pages/LiveEventDetail';
import LiveEventBooking from './pages/LiveEventBooking';
import Offers from './pages/Offers';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:slug" element={<MovieDetailPage />} />
          <Route path="/movies/:slug/showtimes" element={<MovieShowtimes />} />
          <Route path="/movies/:slug/seats" element={<MovieSeats />} />
          <Route path="/live-events" element={<LiveEvents />} />
          <Route path="/live-events/:id" element={<LiveEventDetail />} />
          <Route path="/live-events/:id/book" element={<LiveEventBooking />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Legacy routes - redirect to new format */}
          <Route path="/deadpool" element={<MovieDetailPage />} />
          <Route path="/deadpool-showtimes" element={<MovieShowtimes />} />
          <Route path="/deadpool-seats" element={<MovieSeats />} />
          <Route path="/venom" element={<MovieDetailPage />} />
          <Route path="/venom-showtimes" element={<MovieShowtimes />} />
          <Route path="/venom-seats" element={<MovieSeats />} />
          <Route path="/joker" element={<MovieDetailPage />} />
          <Route path="/joker-showtimes" element={<MovieShowtimes />} />
          <Route path="/joker-seats" element={<MovieSeats />} />
          <Route path="/dune-part-two" element={<MovieDetailPage />} />
          <Route path="/dune-showtimes" element={<MovieShowtimes />} />
          <Route path="/dune-seats" element={<MovieSeats />} />
          <Route path="/thebatman" element={<MovieDetailPage />} />
          <Route path="/thebatman-showtimes" element={<MovieShowtimes />} />
          <Route path="/thebatman-seats" element={<MovieSeats />} />
          <Route path="/insideout2" element={<MovieDetailPage />} />
          <Route path="/insideout2-showtimes" element={<MovieShowtimes />} />
          <Route path="/insideout2-seats" element={<MovieSeats />} />
          <Route path="/oppenheimer" element={<MovieDetailPage />} />
          <Route path="/oppenheimer-showtimes" element={<MovieShowtimes />} />
          <Route path="/oppenheimer-seats" element={<MovieSeats />} />
        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
