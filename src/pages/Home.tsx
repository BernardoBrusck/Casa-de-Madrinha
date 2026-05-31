import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Gamepad2, Cake, Sparkles, Plus, Music, Heart, Star } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

// Helper: cria um ScrollTrigger ultra-suave com opacidade e pequenos deslocamentos
const scrollAnim = (
  target: string | Element,
  from: gsap.TweenVars,
  triggerEl: string | Element,
  delay = 0
) => {
  gsap.fromTo(
    target,
    { ...from, opacity: 0 },
    {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.9,
      delay,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 88%',
        toggleActions: 'play none none reverse', // "play" previne oscilações/flicker ao scrollar rápido
      },
    }
  );
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'O que é a Casa de Madrinha?', a: 'Somos um espaço de festas infantis completo, com brinquedão gigante, fliperamas, cama elástica e equipe especializada. Tudo para que a festa do seu filho seja inesquecível.' },
    { q: 'Qual a duração de uma festa?', a: 'Nossos pacotes padrão têm 4 horas de festa, com roteiro guiado do início ao fim. Há opções de extensão de horário conforme disponibilidade.' },
    { q: 'Quantas pessoas cabem?', a: 'Atendemos até 120 pessoas por festa. Temos espaço para crianças, pais e acompanhantes com conforto e segurança.' },
    { q: 'Tem estacionamento?', a: 'Sim! Contamos com estacionamento próprio e gratuito para os convidados nas nossas unidades de Balneário Camboriú e Camboriú.' },
    { q: 'Como funciona a alimentação?', a: 'Oferecemos 4 opções de buffet completo, incluindo lanches salgados, doces, bolo personalizado e bebidas. Tudo preparado com qualidade e capricho.' },
  ];

  // ── Smooth Scrolling Removido para Testes ───────────────────────────────────

  useGSAP(
    () => {
      // ── HERO: CSS keyframes (já na tela, sem ScrollTrigger) ──────────
      // Handled via pure CSS on Home.css with smooth fade-in and subtle 50px displacements

      // ── SEÇÃO 3: Conheça o Espaço ────────────────────────────────────
      scrollAnim('.section-header', { y: 35 }, '.space-section');
      scrollAnim('.space-video-wrapper', { y: 40, scale: 0.98 }, '.space-section', 0.15);
      scrollAnim('.space-location', { y: 30 }, '.space-section', 0.35);

      // ── SEÇÃO 4: Sobre ───────────────────────────────────────────────
      scrollAnim('.about-content', { x: -40 }, '.about-split');
      scrollAnim('.about-image-wrapper', { x: 40 }, '.about-split', 0.2);

      // ── SEÇÃO 5: Ecossistema ─────────────────────────────────────────
      scrollAnim('.ecosystem-title', { y: 35 }, '.ecosystem-section');
      const ecoDirections: gsap.TweenVars[] = [
        { x: -40 },   // Card 01 (Pais e Mães) — da esquerda suave
        { y: 40 },    // Card 02 (Crianças) — de baixo suave
        { x: 40 },    // Card 03 (Adultos) — da direita suave
      ];
      gsap.utils.toArray<Element>('.eco-card').forEach((el, i) => {
        gsap.fromTo(el,
          { ...ecoDirections[i], opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15 + i * 0.15,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: '.ecosystem-section',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ── SEÇÃO 6: Aniversário ─────────────────────────────────────────
      scrollAnim('.services-label', { y: 30 }, '.birthday-section');
      scrollAnim('.birthday-card', { y: 40, scale: 0.98 }, '.birthday-section', 0.2);

      // ── SEÇÃO 7: Timeline ────────────────────────────────────────────
      scrollAnim('.timeline-title', { y: 35 }, '.timeline-section');
      const timeDirections: gsap.TweenVars[] = [
        { x: -40 },   // Step 1 (O Início) — esq
        { y: 40 },    // Step 2 (A Brincadeira) — baixo
        { y: 40 },    // Step 3 (O Momento Épico) — baixo
        { x: 40 },    // Step 4 (Encerramento) — dir
      ];
      gsap.utils.toArray<Element>('.time-step').forEach((el, i) => {
        gsap.fromTo(el,
          { ...timeDirections[i], opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15 + i * 0.15,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: '.timeline-section',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ── SEÇÃO 8: Mais Experiências ───────────────────────────────────
      scrollAnim('.experiences-title', { y: 35 }, '.more-exp-section');
      gsap.utils.toArray<Element>('.exp-box').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15 + i * 0.15,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: '.more-exp-section',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ── SEÇÃO 9: FAQ ─────────────────────────────────────────────────
      scrollAnim('.faq-title', { y: 35 }, '.faq-section');
      gsap.utils.toArray<Element>('.faq-item').forEach((el, i) => {
        gsap.fromTo(el,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            delay: 0.08 * i,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: '.faq-section',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // ── SEÇÃO 10: CTA Final ──────────────────────────────────────────
      scrollAnim('.bottom-cta .container', { y: 40 }, '.bottom-cta');
    },
    { scope: containerRef }
  );

  return (
    <div className="home-page" ref={containerRef}>
      {/* 1. Hero Section (Split) */}
      <section className="hero-split">
        <div className="hero-bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <div className="container hero-container-split">
          <div className="hero-left">
            <span className="hero-label hero-anim-left">A MELHOR CASA DE FESTAS DE BC E CAMBORIÚ</span>
            <h1 className="hero-title-clean hero-anim-left hero-delay-1">
              Sua festa vai virar <br/>uma aventura mágica!
            </h1>
            <p className="hero-subtitle-clean hero-anim-left hero-delay-2">
              Brinquedão gigante, equipe de monitores especializados e a energia de sentir na pele o que é viver um dia mágico.
            </p>
            <div className="hero-actions-split hero-anim-up hero-delay-3">
              <Link to="/simulator" className="btn btn-primary btn-lg">
                Reservar Data <ArrowRight size={20} />
              </Link>
              <a href="#espaco" className="btn btn-outline btn-lg" style={{ backgroundColor: 'white' }}>
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="hero-right animate-float hero-anim-right hero-delay-1">
            <div className="hero-image-composition">
              <div className="hero-shape shape-1 bg-pink"></div>
              <div className="hero-shape shape-2 bg-cyan"></div>
              <div className="hero-shape shape-3 bg-green"></div>
              <div className="hero-shape shape-4 bg-light-yellow"></div>
              <img
                src="/Casa-de-Madrinha---Logotipo_principal.png"
                alt="Casa de Madrinha Logo"
                className="hero-big-logo"
                width="560"
                height="420"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Wavy bottom or decoration */}
        <div className="hero-bottom-decoration"></div>
      </section>

      {/* 2. Features Bar (Marquee) */}
      <div className="features-bar">
        <div className="marquee-content">
          <span className="feature-item"><Gamepad2 size={24}/> BRINQUEDÃO GIGANTE</span>
          <span className="feature-item"><Sparkles size={24}/> ÁREA BABY EXCLUSIVA</span>
          <span className="feature-item"><Star size={24}/> FLIPERAMAS E GAMES</span>
          <span className="feature-item"><Cake size={24}/> BUFFET PREMIUM</span>
          <span className="feature-item"><Music size={24}/> BALADINHA INFANTIL</span>
          <span className="feature-item"><Heart size={24}/> EQUIPE DE MONITORES</span>

          {/* Duplicado para loop infinito */}
          <span className="feature-item" aria-hidden="true"><Gamepad2 size={24}/> BRINQUEDÃO GIGANTE</span>
          <span className="feature-item" aria-hidden="true"><Sparkles size={24}/> ÁREA BABY EXCLUSIVA</span>
          <span className="feature-item" aria-hidden="true"><Star size={24}/> FLIPERAMAS E GAMES</span>
          <span className="feature-item" aria-hidden="true"><Cake size={24}/> BUFFET PREMIUM</span>
          <span className="feature-item" aria-hidden="true"><Music size={24}/> BALADINHA INFANTIL</span>
          <span className="feature-item" aria-hidden="true"><Heart size={24}/> EQUIPE DE MONITORES</span>
        </div>
      </div>

      {/* 3. Conheça o Espaço */}
      <section id="espaco" className="space-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label text-purple">TOUR VIRTUAL</p>
            <h2 className="section-title-large">Conheça o Espaço</h2>
          </div>
          <div className="space-video-wrapper bg-light">
            {/* Placeholder for wide video/image */}
            <PlayCircle size={64} className="play-icon text-cyan" />
            <p className="text-muted" style={{marginTop: '16px'}}>Vídeo Tour Casa de Madrinha</p>
          </div>
          <p className="space-location text-center text-muted">
            CASA DE MADRINHA — BALNEÁRIO CAMBORIÚ, SC E CAMBORIÚ, SC
          </p>
        </div>
      </section>

      {/* 4. About (Fundada por...) */}
      <section className="about-split section-padding section-purple">
        <div className="about-stars">
          {/* Estrelas */}
          <div className="star-sparkle" style={{top: '10%', left: '10%'}}></div>
          <div className="star-sparkle" style={{top: '20%', left: '40%'}}></div>
          <div className="star-sparkle" style={{top: '30%', left: '80%'}}></div>
          <div className="star-sparkle" style={{top: '50%', left: '20%'}}></div>
          <div className="star-sparkle" style={{top: '70%', left: '50%'}}></div>
          <div className="star-sparkle" style={{top: '80%', left: '15%'}}></div>
          <div className="star-sparkle" style={{top: '90%', left: '75%'}}></div>
          <div className="star-sparkle" style={{top: '40%', left: '90%'}}></div>
          <div className="star-sparkle" style={{top: '15%', left: '60%'}}></div>
          <div className="star-sparkle" style={{top: '60%', left: '85%'}}></div>
          <div className="star-sparkle" style={{top: '85%', left: '40%'}}></div>
          
          {/* Planetas */}
          <img src="/planet.png" alt="Planeta azul" className="planet-svg" style={{position: 'absolute', top: '5%', right: '5%', width: '120px', animation: 'float 8s infinite alternate', opacity: 0.9}} />
          <img src="/earth.png" alt="Terra" className="planet-svg" style={{position: 'absolute', bottom: '30%', left: '5%', width: '100px', animation: 'floatUpShape 6s infinite alternate', opacity: 0.9}} />

          {/* Foguetinho animado estilo minhoca (Desktop) */}
          <div className="rocket-wrapper desktop-rocket">
            <div className="rocket-animation">
              <img src="/rocket.png" alt="Rocket" className="rocket-img" />
            </div>
          </div>
        </div>
        <div className="container about-split-container">
          <div className="about-content">
            <p className="section-label label-yellow">CONHEÇA A CASA DE MADRINHA</p>
            <h2 className="section-title-large">
              Nascida para<br/>
              Realizar <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                Sonhos
                <div className="mobile-rocket">
                  <img src="/rocket.png" alt="Rocket" className="rocket-img" />
                </div>
              </span>
            </h2>
            <p className="about-text">
              A Casa de Madrinha inspira a alegria de centenas de famílias em Santa Catarina. Ao lado de uma equipe dedicada, construímos um espaço que une segurança de ponta com a verdadeira essência da infância.
            </p>
            <p className="about-text">
              Transformamos o sonho em realidade, em um ambiente criado para crianças de verdade, com alimentação de qualidade, brinquedos inovadores e a presença das pessoas que mais amamos.
            </p>
          </div>
          <div className="about-image-wrapper">
            <div className="about-placeholder bg-pink">
              <span className="placeholder-text">Foto dos Fundadores / Equipe</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Ecossistema para todos */}
      <section className="ecosystem-section section-padding">
        <div className="container">
          <h2 className="section-title-large text-center ecosystem-title" style={{marginBottom: '48px'}}>
            Um <span className="text-purple">ECOSSISTEMA</span> para todos
          </h2>
          <div className="ecosystem-grid">
            <div className="eco-card border-pink">
              <div className="eco-number">01</div>
              <h3 style={{color: 'inherit'}}>Pais e Mães</h3>
              <p style={{color: 'inherit'}}>Equipe presente do check-in ao check-out, cardápio delicioso e ambiente monitorado. Você curte junto ou relaxa na área dos pais — a festa é nossa responsabilidade.</p>
            </div>
            <div className="eco-card border-yellow">
              <div className="eco-number">02</div>
              <h3>Crianças e Jovens</h3>
              <p>Brinquedão gigante, fliperamas, cama elástica e os desafios que você só vê na internet. Diversão garantida com monitores super animados.</p>
            </div>
            <div className="eco-card border-cyan">
              <div className="eco-number">03</div>
              <h3>Adultos</h3>
              <p>Para quem quer celebrar sem preocupações. Festas de confraternização, aniversários e eventos familiares com estrutura completa de som e luz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Festas de Aniversário: A Estrela do Dia */}
      <section id="servicos" className="birthday-section section-padding section-cyan">
        <div className="services-shapes">
          <div className="floating-shape cube"></div>
          <div className="floating-shape bubble-soft"></div>
          <div className="floating-shape triangle"></div>
          <div className="floating-shape star-soft"></div>
          <div className="floating-shape cube"></div>
          <div className="floating-shape bubble-soft"></div>
          <div className="floating-shape triangle"></div>
          <div className="floating-shape star-soft"></div>
          
          {/* Formas extras que também flutuam */}
          <div className="floating-shape cube"></div>
          <div className="floating-shape bubble-soft"></div>
          <div className="floating-shape triangle"></div>
          <div className="floating-shape star-soft"></div>
          <div className="floating-shape cube"></div>
          <div className="floating-shape star-soft"></div>
        </div>
        <div className="container">
          {/* NOSSOS SERVIÇOS label removed */}
          <div className="birthday-card">
            <div className="birthday-content">
              <p className="card-label">FESTA INFANTIL</p>
              <h2>Festas de Aniversário:<br/><span className="text-pink">A Estrela do Dia</span></h2>
              <p className="birthday-desc">
                4 horas de festa completa com roteiro guiado, equipe dedicada e diversão do início ao fim. Brincadeiras, hora do lanchinho e a Hora do Parabéns — um aniversário épico que vai ficar na memória de todo mundo.
              </p>
              <div className="tags-grid">
                <span className="tag">Até 120 pessoas</span>
                <span className="tag">4 opções de buffet</span>
                <span className="tag">Convite Digital</span>
                <span className="tag">Brinquedão e Games</span>
                <span className="tag">Equipe Completa</span>
              </div>
              <Link to="/simulator" className="btn btn-primary" style={{marginTop: '32px'}}>
                Reservar Agora <ArrowRight size={20} />
              </Link>
            </div>
            <div className="birthday-image bg-yellow">
              {/* Image Placeholder */}
              <span className="placeholder-text text-dark">Foto Criança com Bolo</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 4H QUE FICARÃO PARA A HISTÓRIA */}
      <section className="timeline-section section-padding">
        <div className="container text-center">
          <h2 className="section-title-large timeline-title" style={{marginBottom: '64px'}}>
            4H QUE FICARÃO PARA A <span className="text-pink">HISTÓRIA</span>
          </h2>
          <div className="timeline-4-grid">
            <div className="time-step">
              <div className="time-number bg-cyan">1</div>
              <h4>O Início</h4>
              <p>A casa abre, os convidados chegam e a experiência começa com recepção calorosa.</p>
            </div>
            <div className="time-step">
              <div className="time-number bg-yellow" style={{color: '#333'}}>2</div>
              <h4>A Brincadeira</h4>
              <p>Monitores guiam as crianças pelos brinquedos, com desafios e interações sem parar.</p>
            </div>
            <div className="time-step">
              <div className="time-number bg-pink">3</div>
              <h4>O Momento Épico</h4>
              <p>Hora do Parabéns, com trilha sonora especial, registros mágicos e emoção garantida.</p>
            </div>
            <div className="time-step">
              <div className="time-number bg-purple">4</div>
              <h4>Encerramento</h4>
              <p>Aproveite a casa livremente, distribua as lembrancinhas e finalize em clima de vitória.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Mais Experiências */}
      <section className="more-exp-section section-padding section-beach">

        {/* ── Cenário de Horizonte ── */}
        <div className="horizon-scene" aria-hidden="true">
          
          {/* Céu (metade superior) */}
          <div className="horizon-sky">
            {/* Sol animado */}
            <div className="horizon-sun"></div>
            
            {/* Nuvens paradinhas nas laterais */}
            <svg className="horizon-cloud cloud-1" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 40 Q 10 40 10 30 Q 10 20 25 20 Q 30 10 45 10 Q 60 10 65 20 Q 80 20 85 30 Q 90 40 80 40 Z" fill="#ffffff" opacity="0.8"/>
            </svg>
            <svg className="horizon-cloud cloud-2" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 40 Q 10 40 10 30 Q 10 20 25 20 Q 30 10 45 10 Q 60 10 65 20 Q 80 20 85 30 Q 90 40 80 40 Z" fill="#ffffff" opacity="0.6"/>
            </svg>
            <svg className="horizon-cloud cloud-3" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 40 Q 10 40 10 30 Q 10 20 25 20 Q 30 10 45 10 Q 60 10 65 20 Q 80 20 85 30 Q 90 40 80 40 Z" fill="#ffffff" opacity="0.9"/>
            </svg>
            
            {/* Gaivotas voando (vetores) */}
            <div className="seagulls">
              <svg className="seagull seagull-1" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5 20 Q 15 10 25 20 Q 35 10 45 20 Q 40 15 25 25 Q 10 15 5 20 Z" fill="#ffffff" opacity="0.9"/>
              </svg>
              <svg className="seagull seagull-2" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5 20 Q 15 10 25 20 Q 35 10 45 20 Q 40 15 25 25 Q 10 15 5 20 Z" fill="#ffffff" opacity="0.8"/>
              </svg>
              <svg className="seagull seagull-3" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5 20 Q 15 10 25 20 Q 35 10 45 20 Q 40 15 25 25 Q 10 15 5 20 Z" fill="#ffffff" opacity="0.7"/>
              </svg>
            </div>
          </div>
          
          {/* Mar (metade inferior) */}
          <div className="horizon-ocean">
            {/* Peixinhos azuis transparentes sob a água na esquerda */}
            <div className="fishes">
              <svg className="fish fish-1" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 40 15 C 30 5, 15 5, 5 15 C 15 25, 30 25, 40 15 Z" fill="#002244" opacity="0.15"/>
                <path d="M 5 15 L 0 10 L 0 20 Z" fill="#002244" opacity="0.15"/>
              </svg>
              <svg className="fish fish-2" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 40 15 C 30 5, 15 5, 5 15 C 15 25, 30 25, 40 15 Z" fill="#002244" opacity="0.12"/>
                <path d="M 5 15 L 0 10 L 0 20 Z" fill="#002244" opacity="0.12"/>
              </svg>
              <svg className="fish fish-3" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M 40 15 C 30 5, 15 5, 5 15 C 15 25, 30 25, 40 15 Z" fill="#002244" opacity="0.18"/>
                <path d="M 5 15 L 0 10 L 0 20 Z" fill="#002244" opacity="0.18"/>
              </svg>
            </div>

            {/* Barquinho pirata boiando na direita */}
            <img src="/barco-pirata.svg" alt="Barco Pirata" className="horizon-boat boat-right" />

            {/* Ondas SVG animadas sobre o mar */}
            <div className="ocean-waves-container">
              <svg className="ocean-wave-svg wave-1" viewBox="0 0 1000 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 50 C 250 100, 750 0, 1000 50 L 1000 150 L 0 150 Z" fill="rgba(255, 255, 255, 0.25)"/>
              </svg>
              <svg className="ocean-wave-svg wave-2" viewBox="0 0 1000 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 70 C 350 20, 650 120, 1000 70 L 1000 150 L 0 150 Z" fill="rgba(255, 255, 255, 0.15)"/>
              </svg>
              <svg className="ocean-wave-svg wave-3" viewBox="0 0 1000 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 90 C 200 130, 800 30, 1000 90 L 1000 150 L 0 150 Z" fill="rgba(255, 255, 255, 0.1)"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Conteúdo ── */}
        <div className="container beach-content-layer">
          <h2 className="section-title-large text-center experiences-title" style={{marginBottom: '48px'}}>
            Mais <span className="text-purple">EXPERIÊNCIAS</span>
          </h2>
          <div className="more-exp-grid">
            {/* Card 1 */}
            <div className="exp-box">
              <p className="exp-badge bg-cyan text-dark">EVENTO FECHADO</p>
              <h3>Festa Escolar</h3>
              <p>Traga a turma inteira! Pacotes especiais para comemorações de turmas e encerramento de ano letivo. Diversão garantida com segurança.</p>
              <ul className="exp-details text-muted">
                <li>• 3h de evento</li>
                <li>• Equipe de monitores</li>
                <li>• Lanche incluso</li>
              </ul>
              <Link to="/simulator" className="exp-link exp-link-cyan">SAIBA MAIS <ArrowRight size={16}/></Link>
            </div>
            {/* Card 2 */}
            <div className="exp-box">
              <p className="exp-badge bg-purple text-white">NOVIDADE</p>
              <h3>Festa do Pijama</h3>
              <p>Reserva fechada a noite! Cabanas temáticas, contação de histórias e muita diversão com os melhores amigos sob a luz das estrelas.</p>
              <ul className="exp-details text-muted">
                <li>• Cabanas individuais</li>
                <li>• Café da manhã</li>
                <li>• Recreação noturna</li>
              </ul>
              <Link to="/simulator" className="exp-link exp-link-purple">SAIBA MAIS <ArrowRight size={16}/></Link>
            </div>
            {/* Card 3 */}
            <div className="exp-box">
              <p className="exp-badge bg-yellow text-dark">SOB MEDIDA</p>
              <h3>Locação de Espaço</h3>
              <p>Quer fazer do seu jeito? Alugue apenas o espaço e traga a sua equipe. Estrutura completa de cozinha e banheiros liberada.</p>
              <ul className="exp-details text-muted">
                <li>• Horário flexível</li>
                <li>• Som ambiente</li>
                <li>• Limpeza inclusa</li>
              </ul>
              <Link to="/simulator" className="exp-link exp-link-yellow">RESERVAR <ArrowRight size={16}/></Link>
            </div>
            {/* Card 4 */}
            <div className="exp-box">
              <p className="exp-badge bg-pink text-white">ADULTOS</p>
              <h3>Eventos Sociais</h3>
              <p>Formatura, casamento civil ou bodas. Adaptamos nosso espaço para um formato sofisticado com luz e som adequados.</p>
              <ul className="exp-details text-muted">
                <li>• Mesas premium</li>
                <li>• Pista de dança</li>
                <li>• Bar disponível</li>
              </ul>
              <Link to="/simulator" className="exp-link exp-link-pink">SAIBA MAIS <ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ / Dúvidas */}
      <section className="faq-section section-padding">
        <div className="container">
          <div className="text-center faq-title" style={{marginBottom: '48px'}}>
            <p className="section-label text-pink">PERGUNTAS FREQUENTES</p>
            <h2 className="section-title-large">Tire suas <span className="text-yellow" style={{color: '#D4A000'}}>DÚVIDAS</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <div
                className={`faq-item${openFaq === i ? ' open' : ''}`}
                key={i}
              >
                <button
                  className="faq-trigger"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="faq-num text-muted">0{i+1}</span>
                  <span className="faq-question">{item.q}</span>
                  <Plus size={20} className="faq-icon" />
                </button>
                <div className="faq-answer">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Bottom CTA */}
      <section className="bottom-cta section-padding text-center">
        <div className="container">
          <div className="cta-card">
            <h2 className="section-title-large" style={{marginBottom: '16px', color: '#ffffff', position: 'relative', zIndex: 5}}>Reserve sua data</h2>
            <p style={{marginBottom: '32px', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 32px', color: '#ffffff', position: 'relative', zIndex: 5}}>
              Finais de semana lotam rápido. Monte seu orçamento online em 2 minutos ou fale direto com a gente.
            </p>
            <Link to="/simulator" className="btn btn-primary btn-lg" style={{position: 'relative', zIndex: 5, whiteSpace: 'nowrap'}}>
              MONTAR ORÇAMENTO
            </Link>
            <p style={{marginTop: '24px', fontSize: '0.9rem', position: 'relative', zIndex: 5}}>
              <a href="#" className="text-yellow" style={{fontWeight: 'bold', textDecoration: 'underline'}}>Fale com um atendente pelo WhatsApp</a>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
