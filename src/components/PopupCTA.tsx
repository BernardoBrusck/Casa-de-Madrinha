import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, PartyPopper, ArrowRight, Sparkles } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './PopupCTA.css';

const PopupCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // Para teste rápido inicial
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    // Repete a cada 15 minutos
    const intervalTimer = setInterval(() => {
      setIsOpen(true);
    }, 900000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  if (location.pathname !== '/') return null;
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={() => setIsOpen(false)} aria-label="Fechar">
          <X size={24} />
        </button>
        
        {/* Elementos decorativos */}
        <div className="popup-shape popup-shape-1"></div>
        <div className="popup-shape popup-shape-2"></div>
        <div className="popup-shape popup-shape-3"></div>

        <div className="popup-top">
          <div className="popup-icon-wrapper">
            <PartyPopper size={40} className="popup-icon" />
          </div>
          <h2>A festa perfeita<br/>está te <span className="text-pink">esperando!</span></h2>
        </div>
        
        <div className="popup-body">
          <p className="popup-text">
            Não deixe para a última hora. Nossos finais de semana <strong>lotam rápido!</strong> Como você prefere continuar?
          </p>

          <div className="popup-actions">
            <button 
              className="btn btn-primary btn-lg popup-sim-btn" 
              onClick={() => {
                setIsOpen(false);
                navigate('/simulator');
                window.scrollTo(0, 0);
              }}
            >
              <span className="btn-icon-left"><Sparkles size={20} /></span>
              <span>Fazer Simulação Rápida</span>
              <span className="btn-icon-right"><ArrowRight size={20} /></span>
            </button>
            
            <a 
              href="https://wa.me/5547999999999" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn popup-whats-btn btn-lg"
              onClick={() => setIsOpen(false)}
            >
              <WhatsAppIcon size={22} />
              Falar com Atendente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCTA;
