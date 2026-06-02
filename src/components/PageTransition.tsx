import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTransition } from '../context/TransitionContext';

const PageTransition: React.FC = () => {
  const { isTransitioning, isInitialLoad, completeInitialLoad, startTransitionOut } = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !bubblesRef.current) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    const bubblesContainer = bubblesRef.current;

    // Helper to generate bubbles
    const createBubbles = () => {
      bubblesContainer.innerHTML = ''; // Clear existing
      const bubbleCount = 200; // Aumentado para preencher a tela completamente
      const fragments = document.createDocumentFragment();

      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'transition-bubble';
        
        // Tamanhos variados para cobrir bem a tela
        const size = Math.random() * 250 + 50;
        const left = Math.random() * 120 - 10;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}vw`;
        
        // Agrupar as bolhas em um bloco denso logo abaixo da tela
        const yOffset = Math.random() * 800;
        bubble.style.bottom = `-${size + yOffset}px`;
        
        // Deixar as bolhas um pouco mais opacas para esconder o fundo melhor
        bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8) 60%, rgba(255, 255, 255, 0.4) 100%)';
        
        fragments.appendChild(bubble);
      }
      bubblesContainer.appendChild(fragments);
      return Array.from(bubblesContainer.children);
    };

    const animateOut = () => {
      const bubbles = createBubbles();
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { display: 'none', clearProps: 'all' });
          if (isInitialLoad) {
            completeInitialLoad();
          } else {
            startTransitionOut();
          }
        }
      });

      // Anima as bolhas subindo (passando direto pela tela)
      tl.to(bubbles, {
        y: () => -window.innerHeight - 1200, // Sobem bastante para limpar a tela
        duration: () => 1.8 + Math.random() * 1.2,
        stagger: {
          amount: 0.6,
          from: 'random'
        },
        ease: 'power1.inOut'
      }, 0);

      // Exatamente quando a tela está cheia de bolhas (aprox 1.2s),
      // apagamos o fundo rosa e a logo instantaneamente/rapidamente.
      // Como a tela tá cheia de bolhas, o usuário não vê sumir.
      tl.to(container, {
        backgroundColor: 'transparent',
        duration: 0.2
      }, 1.2);

      tl.to(logo, {
        opacity: 0,
        duration: 0.2
      }, 1.2);
    };

    const animateIn = () => {
      // Define a logo como visível e o container pronto para cair
      gsap.set(container, { display: 'flex', yPercent: -100, opacity: 1, backgroundColor: 'var(--color-pink)' });
      gsap.set(logo, { scale: 1, opacity: 1 });
      
      const tl = gsap.timeline();
      
      // A tela rosa cai e já traz a logo junto com ela
      // Duração ajustada para coincidir com o setTimeout do router (0.6s)
      tl.to(container, { 
        yPercent: 0, 
        duration: 0.6, 
        ease: 'power2.out',
        onComplete: animateOut // Anima as bolhas assim que terminar de cobrir a tela (e a rota trocar)
      });
    };

    if (isInitialLoad) {
      // For initial load, it's already covering the screen
      gsap.set(container, { display: 'flex', yPercent: 0, opacity: 1 });
      
      // Just animate logo pop and then animate out
      gsap.fromTo(logo, 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.2 }
      ).then(() => {
        // Wait a tiny bit then clear the screen
        setTimeout(animateOut, 400);
      });
    } else if (isTransitioning) {
      // Triggered by navigation
      animateIn();
    }

  }, [isTransitioning, isInitialLoad, completeInitialLoad, startTransitionOut]);

  // If it's not initial load and not transitioning, don't render or render hidden
  if (!isInitialLoad && !isTransitioning) return null;

  return (
    <div 
      ref={containerRef}
      className="page-transition-container"
      style={{ display: isInitialLoad ? 'flex' : 'none' }}
    >
      <div ref={bubblesRef} className="bubbles-container"></div>
      <img 
        ref={logoRef}
        src="/Casa-de-Madrinha---Logotipo_principal.png" 
        alt="Casa de Madrinha" 
        className="transition-logo"
      />
    </div>
  );
};

export default PageTransition;
