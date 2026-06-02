import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reserva from './pages/Reserva';
import WhatsAppButton from './components/WhatsAppButton';
import PopupCTA from './components/PopupCTA';
import { TransitionProvider } from './context/TransitionContext';
import PageTransition from './components/PageTransition';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <TransitionProvider>
        <PageTransition />
        <ScrollToTop />
        <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reserva" element={<Reserva />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <PopupCTA />
      </div>
      </TransitionProvider>
    </Router>
  );
}

export default App;
