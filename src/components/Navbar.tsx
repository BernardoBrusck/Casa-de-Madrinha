import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu if window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isOpen ? 'navbar-open' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img 
            src="/Casa-de-Madrinha---Logotipo_principal.png" 
            alt="Casa de Madrinha Logo" 
            className="logo-img"
            width="120"
            height="90"
            loading="eager"
            decoding="async"
          />
        </Link>
        
        {/* Hamburger Menu Toggle Button */}
        <button 
          className="navbar-burger" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          <a 
            href="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              window.scrollTo({top: 0, behavior: 'smooth'}); 
              closeMenu();
            }} 
            className="nav-link"
          >
            Início
          </a>
          <a 
            href="#espaco" 
            onClick={(e) => { 
              const el = document.getElementById('espaco'); 
              if(el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth'}); } 
              closeMenu();
            }} 
            className="nav-link"
          >
            Unidades
          </a>
          <a 
            href="#servicos" 
            onClick={(e) => { 
              const el = document.getElementById('servicos'); 
              if(el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth'}); } 
              closeMenu();
            }} 
            className="nav-link"
          >
            Serviços
          </a>
          <Link to="/simulator" className="nav-mobile-btn btn btn-primary" onClick={closeMenu}>
            Simular Reserva
          </Link>
        </nav>
        
        <div className="navbar-actions">
          <Link to="/simulator" className="btn btn-primary">Simular Reserva</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
