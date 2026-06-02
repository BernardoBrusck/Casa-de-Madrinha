import { MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Decorative Bubbles (mesmas do hero) */}
      <div className="hero-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>

      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img 
              src="/Casa-de-Madrinha---Logotipo_principal.png" 
              alt="Casa de Madrinha Logo" 
              className="footer-logo-img"
              width="160"
              height="120"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="footer-bio">A casa de festas mais charmosa e animada da região. Transformando momentos em memórias inesquecíveis.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/casademadrinha_bc/" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/casademadrinha" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/5547999999999" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" aria-label="WhatsApp">
              <WhatsAppIcon size={22} />
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Nossas Unidades</h3>
          <ul>
            <li>
              <MapPin size={20} className="icon" />
              <span>Balneário Camboriú, SC</span>
            </li>
            <li>
              <MapPin size={20} className="icon" />
              <span>Camboriú, SC</span>
            </li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h3>Contato</h3>
          <ul>
            <li>
              <Phone size={20} className="icon" />
              <span>(47) 99999-9999</span>
            </li>
          </ul>
          <div className="footer-cta">
            <a href="/reserva" className="btn btn-primary">Faça um Orçamento</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            Este site é uma demonstração desenvolvida pela <a href="https://brusck.com" target="_blank" rel="noopener noreferrer" className="demo-link">BRUSCK</a>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
