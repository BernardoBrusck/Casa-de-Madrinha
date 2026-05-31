import './WhatsAppButton.css';
import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/5547999999999" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float-btn"
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="whatsapp-badge">1</div>
      <WhatsAppIcon size={34} />
    </a>
  );
};

export default WhatsAppButton;
