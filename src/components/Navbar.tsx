import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isOpen ? 'navbar-open' : ''} ${!isHome ? 'navbar-internal' : ''}`}>
      <div className="container navbar-container">
        <TransitionLink to="/" className="navbar-logo" onClick={closeMenu}>
          <img 
            src="/Casa-de-Madrinha---Logotipo_principal.png" 
            alt="Casa de Madrinha Logo" 
            className="logo-img"
            width="120"
            height="90"
            loading="eager"
            decoding="async"
          />
        </TransitionLink>
        
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
            href={isHome ? "#" : "/"} 
            onClick={(e) => { 
              if (isHome) {
                e.preventDefault(); 
                window.scrollTo({top: 0, behavior: 'smooth'}); 
              }
              closeMenu();
            }} 
            className="nav-link"
          >
            Início
          </a>
          <a 
            href={isHome ? "#espaco" : "/#espaco"} 
            onClick={(e) => { 
              if (isHome) {
                const el = document.getElementById('espaco'); 
                if(el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth'}); } 
              }
              closeMenu();
            }} 
            className="nav-link"
          >
            Unidades
          </a>
          <a 
            href={isHome ? "#servicos" : "/#servicos"} 
            onClick={(e) => { 
              if (isHome) {
                const el = document.getElementById('servicos'); 
                if(el) { e.preventDefault(); el.scrollIntoView({behavior: 'smooth'}); } 
              }
              closeMenu();
            }} 
            className="nav-link"
          >
            Serviços
          </a>
          <TransitionLink to="/reserva" className="nav-mobile-btn btn btn-primary" onClick={closeMenu}>
            Fazer Reserva
          </TransitionLink>
        </nav>
        
        <div className="navbar-actions">
          <TransitionLink to="/reserva" className="btn btn-primary">Fazer Reserva</TransitionLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
