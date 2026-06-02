import { useState, useMemo, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, User, Building2, MapPin, Users, Mail, Phone, CreditCard, Hash, Map } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import confetti from 'canvas-confetti';
import './Reserva.css';

// ─── tipos ────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface Unidade {
  id: string;
  nome: string;
  endereco: string;
  capacidade: number;
  foto: string;
}

const UNIDADES: Record<string, Unidade[]> = {
  bc: [
    { id: 'bc1', nome: 'Casa de Madrinha Centro', endereco: 'R. das Flores, 120 – Centro, BC', capacidade: 120, foto: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400&h=300' },
    { id: 'bc2', nome: 'Casa de Madrinha Beira-Mar', endereco: 'Av. Atlântica, 840 – BC', capacidade: 150, foto: 'https://images.unsplash.com/photo-1530103862676-de8892bc952f?auto=format&fit=crop&q=80&w=400&h=300' },
  ],
  camboriu: [
    { id: 'cam1', nome: 'Casa de Madrinha Camboriú', endereco: 'R. Principal, 55 – Camboriú', capacidade: 200, foto: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=400&h=300' },
  ],
};

const TIPOS_EVENTO = [
  { id: 'infantil',    label: 'Festa Infantil',   emoji: '🎂', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400&h=300', cor: 'var(--color-pink)' },
  { id: '15anos',      label: '15 Anos',           emoji: '👑', img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=400&h=300', cor: 'var(--color-purple)' },
  { id: 'corporativo', label: 'Corporativo',       emoji: '💼', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400&h=300', cor: '#2196F3' },
  { id: 'outros',      label: 'Outros',            emoji: '🎉', img: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&q=80&w=400&h=300', cor: '#FF9800' },
];

const EXTRAS = [
  { id: 'decoracao',   label: 'Decoração Premium',   emoji: '🌸', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=150&h=150', cor: 'var(--color-pink)',   preco: 800 },
  { id: 'fotografia',  label: 'Foto & Vídeo',        emoji: '📸', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=150&h=150', cor: 'var(--color-purple)', preco: 1200 },
  { id: 'dj',          label: 'DJ & Iluminação',     emoji: '🎵', img: 'https://images.unsplash.com/photo-1571266028243-cb40fce75736?auto=format&fit=crop&q=80&w=150&h=150', cor: '#2196F3',             preco: 900 },
  { id: 'bartender',   label: 'Bartender / Drinks',  emoji: '🍹', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=150&h=150', cor: '#FF9800',             preco: 700 },
  { id: 'brinquedos',  label: 'Brinquedos',          emoji: '🎠', img: 'https://images.unsplash.com/photo-1566579090262-51cde5ebe92e?auto=format&fit=crop&q=80&w=150&h=150', cor: '#4CAF50',             preco: 600 },
  { id: 'convite',     label: 'Convite Digital',     emoji: '✉️', img: 'https://images.unsplash.com/photo-1607344645866-009c520b6602?auto=format&fit=crop&q=80&w=150&h=150', cor: '#9C27B0',             preco: 200 },
];

const PACOTES_COMIDA = [
  { id: 'combo1', titulo: 'Combo Herói Clássico', desc: 'Salgadinhos premium + mini cachorro quente + bolo + docinhos + refri + suco', preco: 74, pop: false, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 'combo2', titulo: 'Dia/Noite do Hambúrguer', desc: 'Hambúrguer + batata frita + bolo + docinhos + refri + suco', preco: 89, pop: true, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 'combo3', titulo: 'Pizza dos Heróis', desc: 'Rodízio de pizzas salgadas e doces + bolo + docinhos + refri + suco', preco: 85, pop: false, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 'combo4', titulo: 'Banquete dos Heróis', desc: 'Finger foods, rústicos de risoto e massas, bolo + doces + bebidas', preco: 110, pop: false, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600&h=400' },
];

// ─── calendário ───────────────────────────────────────────────────────────────
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const Reserva = () => {
  const today = new Date();
  today.setHours(0,0,0,0);
  
  const [step, setStep] = useState<Step>(1);
  
  // Passo 1: Local
  const [cidade, setCidade] = useState('');
  const [unidadeId, setUnidadeId] = useState('');
  
  // Passo 2: Experiência
  const [tipoEvento, setTipoEvento] = useState('');
  
  // Passo 3: Data
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [dataSel,  setDataSel]  = useState<string>('');
  const [convidados, setConvidados] = useState(35);

  // Passo 4: Serviços
  const [extras, setExtras] = useState<string[]>([]);

  // Passo 5: Comida
  const [pacoteComida, setPacoteComida] = useState<string>('');

  // Passo 6: Dados
  const [tipoPessoa, setTipoPessoa] = useState<'fisica'|'juridica'>('fisica');
  const [formData, setFormData] = useState({
    nomeAniversariante: '',
    idade: '',
    nomeResp: '',
    docResp: '',
    emailResp: '',
    telResp: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidadeAddr: '',
    uf: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (step === 7) {
      const colors = ['#D4A000', '#FF3366', '#00E5FF', '#9D4EDD'];
      const defaults = { particleCount: 300, spread: 150, startVelocity: 70, colors, zIndex: 10000 };
      confetti({ ...defaults, angle: 60, origin: { x: 0, y: 0.8 } });
      confetti({ ...defaults, angle: 120, origin: { x: 1, y: 0.8 } });
      confetti({ ...defaults, angle: 90, origin: { x: 0.5, y: 1 } });
    }
  }, [step]);

  // unidades disponíveis
  const unidadesDisponiveis = cidade ? UNIDADES[cidade] : [...UNIDADES.bc, ...UNIDADES.camboriu];
  const unidadeSel = [...UNIDADES.bc, ...UNIDADES.camboriu].find(u => u.id === unidadeId);
  const maxConvidados = unidadeSel?.capacidade ?? 200;

  // calendário
  const cells = useMemo(() => buildCalendar(calYear, calMonth), [calYear, calMonth]);
  const isToday = (d: number) => d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
  const isPast = (d: number) => {
    const dt = new Date(calYear, calMonth, d);
    dt.setHours(0,0,0,0);
    return dt < today;
  };
  const isSelected = (d: number) => dataSel === `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  
  const prevMonth = () => {
    if (calYear === today.getFullYear() && calMonth === today.getMonth()) return;
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };
  const atMinMonth = calYear === today.getFullYear() && calMonth === today.getMonth();

  const selectDay = (d: number) => {
    if (isPast(d)) return;
    setDataSel(`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
  };

  const isShortNotice = () => {
    if (!dataSel) return false;
    const parts = dataSel.split('-');
    const selDate = new Date(Number(parts[0]), Number(parts[1])-1, Number(parts[2]));
    selDate.setHours(0,0,0,0);
    const diffTime = selDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 5;
  };

  const toggleExtra = (id: string) =>
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  const calcTotal = () => {
    let base = 0;
    if (unidadeSel) base += cidade === 'bc' ? 3000 : 2500;
    if (tipoEvento === '15anos') base += 1500;
    if (tipoEvento === 'corporativo') base += 2000;
    
    extras.forEach(id => {
      const ex = EXTRAS.find(e => e.id === id);
      if (ex) base += ex.preco;
    });

    if (pacoteComida) {
      const pct = PACOTES_COMIDA.find(p => p.id === pacoteComida);
      if (pct) base += (pct.preco * convidados);
    }
    return base;
  };

  const TOTAL_STEPS = 8;

  const handleNext = () => {
    setStep(s => Math.min(s + 1, TOTAL_STEPS) as Step);
    setTimeout(() => document.querySelector('.sim-inner')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };
  const handlePrev = () => {
    setStep(s => Math.max(s - 1, 1) as Step);
    setTimeout(() => document.querySelector('.sim-inner')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const canProceed = () => {
    if (step === 1) return !!cidade && !!unidadeId;
    if (step === 2) return !!tipoEvento;
    if (step === 3) return !!dataSel;
    if (step === 4) return true;
    if (step === 5) return !!pacoteComida;
    if (step === 6) return !!formData.nomeAniversariante && !!formData.idade && !!formData.nomeResp && !!formData.docResp && !!formData.telResp && !!formData.cep && !!formData.numero;
    return true;
  };

  const getWhatsShortNoticeLink = () => {
    const dataFmt = dataSel ? dataSel.split('-').reverse().join('/') : 'Não definida';
    const msg = `Olá! Tenho interesse em uma reserva de última hora para a data ${dataFmt}. Podem me informar a disponibilidade?`;
    return `https://wa.me/5547999999999?text=${encodeURIComponent(msg)}`;
  };

  const dataFormatada = dataSel ? dataSel.split('-').reverse().join('/') : '';
  const dayOfWeek = dataSel ? WEEKDAYS[new Date(Number(dataSel.split('-')[0]), Number(dataSel.split('-')[1])-1, Number(dataSel.split('-')[2])).getDay()] : '';
  const monthName = dataSel ? MONTHS[Number(dataSel.split('-')[1])-1] : '';

  const STEPS_LABELS = ['Local', 'Experiência', 'Data', 'Serviços', 'Comida', 'Dados', 'Orçamento', 'Confirmação'];

  return (
    <div className="simulator-page light-brutalist">
      {/* Background Bubbles (Neo-Brutalist Light Theme) */}
      <div className="sim-bubbles">
        <div className="sim-bubble"></div>
        <div className="sim-bubble"></div>
        <div className="sim-bubble"></div>
        <div className="sim-bubble"></div>
        <div className="sim-bubble"></div>
        <div className="sim-bubble"></div>
        <div className="sim-bubble"></div>
      </div>
      
      <div className="sim-inner">
        {/* ── Top Header Progress ── */}
        <div className="sim-top-nav">
          <div className="sim-steps-row">
            {STEPS_LABELS.map((label, i) => (
              <div key={i} className={`sim-step-indicator ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'completed' : ''}`}>
                <div className="step-num">{step > i + 1 ? <CheckCircle2 size={14} strokeWidth={3}/> : i + 1}</div>
                <span className="step-name">{label}</span>
                {i < STEPS_LABELS.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Voltar (Topo) ── */}
        {step > 1 && step < 8 && (
          <div className="sim-back-nav">
            <button className="btn-back-discreet" onClick={handlePrev}>
              <ChevronLeft size={16} /> Voltar
            </button>
          </div>
        )}

        {/* ── Passo 1: Local ── */}
        {step === 1 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">1. ONDE SERÁ?</p>
            <h2 className="sim-title">Escolha o <span className="text-pink">Local</span></h2>
            
            <div className="sim-layout-two-cols">
              <div className="sim-main-col">
                <h3>Cidade</h3>
                <div className="sim-city-grid list-grid">
                  <div className={`sim-city-card brutal-card ${cidade === 'bc' ? 'selected' : ''}`} onClick={() => { setCidade('bc'); setUnidadeId(''); }}>
                    <span className="city-emoji">🏖️</span> <strong>Balneário Camboriú</strong>
                  </div>
                  <div className={`sim-city-card brutal-card ${cidade === 'camboriu' ? 'selected' : ''}`} onClick={() => { setCidade('camboriu'); setUnidadeId(''); }}>
                    <span className="city-emoji">🌴</span> <strong>Camboriú</strong>
                  </div>
                </div>

                {cidade && (
                  <div className="mt-8 animate-fade-in">
                    <h3>Unidade</h3>
                    <div className="sim-unit-list list-grid">
                      {unidadesDisponiveis.map(u => (
                        <div key={u.id} className={`sim-unit-card brutal-card ${unidadeId === u.id ? 'selected' : ''}`} onClick={() => setUnidadeId(u.id)}>
                          <div className="unit-info">
                            <strong>{u.nome}</strong>
                            <span>{u.endereco}</span>
                          </div>
                          {unidadeId === u.id && <CheckCircle2 className="sim-check-icon text-pink" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="sim-side-col">
                {unidadeSel ? (
                  <div className="brutal-card unit-preview-card animate-fade-in">
                    <div className="unit-preview-img-wrap">
                      <img src={unidadeSel.foto} alt={unidadeSel.nome} className="unit-preview-img" />
                    </div>
                    <div className="unit-preview-details">
                      <h3>{unidadeSel.nome}</h3>
                      <p><MapPin size={16}/> {unidadeSel.endereco}</p>
                      <p><Users size={16}/> Capacidade para até {unidadeSel.capacidade} pessoas</p>
                    </div>
                  </div>
                ) : (
                  <div className="brutal-card unit-preview-placeholder">
                    <span>🏠</span>
                    <p>Selecione uma unidade para ver os detalhes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Passo 2: Experiência ── */}
        {step === 2 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">2. TIPO DE EVENTO</p>
            <h2 className="sim-title">Defina sua <span className="text-pink">Experiência</span></h2>
            
            <div className="sim-experience-grid">
              {TIPOS_EVENTO.map(t => (
                <div 
                  key={t.id} 
                  className={`sim-exp-card brutal-card ${tipoEvento === t.id ? 'selected' : ''}`} 
                  onClick={() => setTipoEvento(t.id)}
                >
                  <div className="exp-img-wrap">
                    <img src={t.img} alt={t.label} className="exp-img" />
                    <span className="exp-emoji">{t.emoji}</span>
                  </div>
                  <div className="exp-info">
                    <h3>{t.label}</h3>
                  </div>
                  {tipoEvento === t.id && <CheckCircle2 className="sim-check-icon text-pink" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Passo 3: Data ── */}
        {step === 3 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">3. DATA E CONVIDADOS</p>
            <h2 className="sim-title">Quando vai ser a <span className="text-pink">FESTA?</span></h2>

            <div className="sim-layout-two-cols">
              <div className="sim-main-col">
                <div className="sim-calendar brutal-card">
                  <div className="cal-header">
                    <button className="cal-nav-btn" onClick={prevMonth} disabled={atMinMonth}>
                      <ChevronLeft size={20} />
                    </button>
                    <span className="cal-month-label">{MONTHS[calMonth]} {calYear}</span>
                    <button className="cal-nav-btn" onClick={nextMonth}>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="cal-weekdays">
                    {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className="cal-days">
                    {cells.map((d, i) => (
                      <button
                        key={i}
                        className={[
                          'cal-day',
                          d === null         ? 'empty'    : '',
                          d && isPast(d)     ? 'past'     : '',
                          d && isToday(d)    ? 'today'    : '',
                          d && isSelected(d) ? 'selected' : '',
                        ].join(' ')}
                        onClick={() => d && !isPast(d) && selectDay(d)}
                        disabled={!d || isPast(d)}
                      >
                        {d ?? ''}
                      </button>
                    ))}
                  </div>
                  <div className="cal-legend">
                    <span><span className="leg-dot dot-sel"/>Selecionado</span>
                    <span><span className="leg-dot dot-past"/>Bloqueado</span>
                  </div>
                </div>
              </div>

              <div className="sim-side-col">
                <div className="brutal-card guests-panel">
                  <span className="panel-label">CONVIDADOS</span>
                  <div className="guests-controls-hero">
                    <button className="brutal-btn-small" onClick={() => setConvidados(c => Math.max(10, c - 1))}>-</button>
                    <span className="guests-value text-pink">{convidados}</span>
                    <button className="brutal-btn-small" onClick={() => setConvidados(c => Math.min(maxConvidados, c + 1))}>+</button>
                  </div>
                  <input
                    type="range"
                    className="guests-slider-hero"
                    min={10}
                    max={maxConvidados}
                    step={1}
                    value={convidados}
                    onChange={e => setConvidados(Number(e.target.value))}
                  />
                  <div className="guests-range-labels">
                    <span>{convidados} de {maxConvidados}</span>
                  </div>
                </div>

                <div className="brutal-card date-resume-panel mt-4">
                  {dataSel ? (
                    <>
                      <h3 className="resume-date-title text-cyan">{dayOfWeek}, {dataSel.split('-')[2]} De {monthName}</h3>
                      <p className="resume-date-sub">Dia de Semana - <strike className="text-muted">R$ 3.290</strike> <strong>R$ 2.790</strong> <span className="promo-txt">Promo</span></p>
                    </>
                  ) : (
                    <h3 className="resume-date-title text-muted">Selecione uma data</h3>
                  )}
                </div>

                {/* ── Botão Continuar Específico para Desktop (Passo 3) ── */}
                <div className="step3-desktop-action hidden-mobile mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                  {isShortNotice() ? (
                    <a href={getWhatsShortNoticeLink()} target="_blank" rel="noopener noreferrer" className="brutal-btn-whatsapp-full" style={{ width: '100%' }}>
                      <WhatsAppIcon size={28} /> MENOS DE 5 DIAS ÚTEIS CONSULTE VIA WHATSAPP
                    </a>
                  ) : (
                    <button className="brutal-btn-primary btn-next-hero" onClick={handleNext} disabled={!canProceed()} style={{ width: '100%' }}>
                      CONTINUAR
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Passo 4: Serviços Adicionais ── */}
        {step === 4 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">4. EXTRAS E SERVIÇOS</p>
            <h2 className="sim-title">Deixe a festa mais <span className="text-pink">INCRÍVEL</span></h2>
            <div className="sim-extras-grid">
              {EXTRAS.map(ex => (
                <div
                  key={ex.id}
                  className={`sim-extra-card brutal-card ${extras.includes(ex.id) ? 'selected' : ''}`}
                  onClick={() => toggleExtra(ex.id)}
                >
                  <div className="sim-extra-img-wrap">
                    <img src={ex.img} alt={ex.label} />
                  </div>
                  <div className="sim-extra-info">
                    <strong>{ex.label}</strong>
                    <span className="text-yellow">+ R$ {ex.preco.toLocaleString('pt-BR')}</span>
                  </div>
                  {extras.includes(ex.id) && <CheckCircle2 className="sim-check-icon text-pink" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Passo 5: Comidas e Bebidas ── */}
        {step === 5 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">5. COMIDAS E BEBIDAS</p>
            <h2 className="sim-title">Escolha o <span className="text-pink">PACOTE</span></h2>
            <p className="sim-desc">Valores por pessoa. Escolha um pacote para continuar.</p>
            
            <div className="pacotes-grid">
              {PACOTES_COMIDA.map(pct => (
                <div 
                  key={pct.id} 
                  className={`pacote-card brutal-card ${pacoteComida === pct.id ? 'selected' : ''}`}
                  onClick={() => setPacoteComida(pct.id)}
                >
                  {pct.pop && <span className="pct-badge">Mais Pedido</span>}
                  
                  <div className="pct-banner">
                    <img src={pct.img} alt={pct.titulo} />
                  </div>
                  
                  <div className="pct-info">
                    <h3>{pct.titulo}</h3>
                    <p>{pct.desc}</p>
                    <div className="pct-price">
                      <span>R${pct.preco}/pessoa</span>
                      <strong>R$ {(pct.preco * convidados).toLocaleString('pt-BR')}</strong>
                    </div>
                  </div>

                  {pacoteComida === pct.id && <div className="pct-selected-overlay"><CheckCircle2 className="sim-check-icon text-pink" size={32}/></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Passo 6: Dados ── */}
        {step === 6 && (
          <div className="sim-step animate-fade-in form-step">
            <p className="sim-subtitle">6. DADOS DO EVENTO</p>
            <h2 className="sim-title">De quem será a <span className="text-pink">FESTA?</span></h2>
            
            <div className="form-container brutal-card">
              <div className="form-subsection">
                <div className="form-subsection-header text-cyan">
                  <User size={28} />
                  <h3>Aniversariante / Homenageado</h3>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>Nome Completo</label>
                    <div className="brutal-input-wrap has-icon">
                      <User size={20} className="input-icon" />
                      <input type="text" name="nomeAniversariante" value={formData.nomeAniversariante} onChange={handleFormChange} placeholder="Ex: João da Silva"/>
                    </div>
                  </div>
                  <div className="input-group short">
                    <label>Idade a completar</label>
                    <div className="brutal-input-wrap has-icon">
                      <Hash size={20} className="input-icon" />
                      <input type="number" name="idade" value={formData.idade} onChange={handleFormChange} placeholder="Ex: 5" min="1"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-subsection">
                <div className="form-subsection-header text-yellow">
                  <CreditCard size={28} />
                  <h3>Responsável pela Reserva</h3>
                </div>
                <div className="pessoa-toggle-wrapper">
                  <div className="pessoa-toggle-track" data-active={tipoPessoa}>
                    <div className="toggle-slider"></div>
                    <button className={`toggle-pill ${tipoPessoa === 'fisica' ? 'active' : ''}`} onClick={() => setTipoPessoa('fisica')}>
                      <User size={16}/> Pessoa Física
                    </button>
                    <button className={`toggle-pill ${tipoPessoa === 'juridica' ? 'active' : ''}`} onClick={() => setTipoPessoa('juridica')}>
                      <Building2 size={16}/> Pessoa Jurídica
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>{tipoPessoa === 'fisica' ? 'Nome Completo' : 'Razão Social'}</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="nomeResp" value={formData.nomeResp} onChange={handleFormChange} placeholder={tipoPessoa === 'fisica' ? 'Seu nome' : 'Nome da empresa'}/>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>{tipoPessoa === 'fisica' ? 'CPF' : 'CNPJ'}</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="docResp" value={formData.docResp} onChange={handleFormChange} placeholder={tipoPessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0001-00'} />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>E-mail</label>
                    <div className="brutal-input-wrap has-icon">
                      <Mail size={20} className="input-icon" />
                      <input type="email" name="emailResp" value={formData.emailResp} onChange={handleFormChange} placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>WhatsApp</label>
                    <div className="brutal-input-wrap has-icon">
                      <Phone size={20} className="input-icon" />
                      <input type="text" name="telResp" value={formData.telResp} onChange={handleFormChange} placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-subsection">
                <div className="form-subsection-header text-pink">
                  <Map size={28} />
                  <h3>Endereço</h3>
                </div>
                <div className="form-row">
                  <div className="input-group short">
                    <label>CEP</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="cep" value={formData.cep} onChange={handleFormChange} placeholder="00000-000"/>
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Rua</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="rua" value={formData.rua} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="input-group short">
                    <label>Número</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="numero" value={formData.numero} onChange={handleFormChange} />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>Complemento <small className="text-muted">(opcional)</small></label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="complemento" value={formData.complemento} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Bairro</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="bairro" value={formData.bairro} onChange={handleFormChange} />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="input-group">
                    <label>Cidade</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="cidade" value={formData.cidade} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="input-group short">
                    <label>UF</label>
                    <div className="brutal-input-wrap">
                      <input type="text" name="uf" value={formData.uf} onChange={handleFormChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Passo 7: Orçamento ── */}
        {step === 7 && (
          <div className="sim-step animate-fade-in">
            <h2 className="sim-title text-center">Aqui está o seu <span className="text-pink">Ticket de Reserva</span> 🎟️</h2>
            <div className="sim-result">
              <div className="brutal-ticket">
                <div className="ticket-main">
                  <div className="ticket-header">
                    <h3>CASA DE MADRINHA</h3>
                    <span>#{Math.floor(Math.random() * 90000) + 10000}</span>
                  </div>
                  
                  <div className="ticket-body">
                    <div className="ticket-info-grid">
                      <div className="t-info">
                        <span>Aniversariante</span>
                        <strong>{formData.nomeAniversariante} ({formData.idade} anos)</strong>
                      </div>
                      <div className="t-info">
                        <span>Responsável</span>
                        <strong>{formData.nomeResp}</strong>
                      </div>
                      <div className="t-info">
                        <span>Local</span>
                        <strong>{unidadeSel?.nome}</strong>
                      </div>
                      <div className="t-info">
                        <span>Data do Evento</span>
                        <strong>{dataFormatada}</strong>
                      </div>
                      <div className="t-info">
                        <span>Experiência</span>
                        <strong>{TIPOS_EVENTO.find(t=>t.id===tipoEvento)?.label}</strong>
                      </div>
                      <div className="t-info">
                        <span>Pacote e Convidados</span>
                        <strong>{PACOTES_COMIDA.find(p => p.id === pacoteComida)?.titulo} • {convidados} pessoas</strong>
                      </div>
                    </div>

                    {extras.length > 0 && (
                      <div className="ticket-extras">
                        <span>Serviços Adicionais:</span>
                        <div className="t-tags">
                          {extras.map(id => {
                            const ex = EXTRAS.find(e => e.id === id);
                            return <span key={id} className="t-tag">{ex?.emoji} {ex?.label}</span>
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ticket-divider"></div>
                
                <div className="ticket-stub">
                  <span className="stub-label">Valor Estimado</span>
                  <div className="stub-price">
                    <small>R$</small>
                    <span>{calcTotal().toLocaleString('pt-BR')}</span>
                  </div>
                  <span className="stub-disclaimer">*Faremos uma verificação da data e dos detalhes finais com você.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Passo 8: Confirmação ── */}
        {step === 8 && (
          <div className="sim-step animate-fade-in text-center confirm-step brutal-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={100} className="text-pink" />
            </div>
            <h2 className="sim-title">Reserva Confirmada!</h2>
            <p className="sim-desc text-muted">Sua solicitação foi registrada com sucesso no nosso sistema.<br/>Entraremos em contato via WhatsApp nas próximas 2 horas para fechar os detalhes!</p>
            <div className="sim-result-actions mt-8">
              <button className="brutal-btn-primary" onClick={() => window.location.reload()}>
                Realizar Nova Reserva
              </button>
            </div>
          </div>
        )}

        {/* ── Ações (Footer Buttons) ── */}
        {step < 8 && (
          <div className={`sim-actions hero-actions single-action ${step === 3 ? 'hidden-desktop' : ''}`}>
            <div className="hero-action-center" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {(step === 3 && isShortNotice()) ? (
                <a href={getWhatsShortNoticeLink()} target="_blank" rel="noopener noreferrer" className="brutal-btn-whatsapp-full">
                  <WhatsAppIcon size={28} /> MENOS DE 5 DIAS ÚTEIS CONSULTE VIA WHATSAPP
                </a>
              ) : (
                <button className="brutal-btn-primary btn-next-hero" onClick={handleNext} disabled={!canProceed()} style={{ width: '100%', maxWidth: '400px' }}>
                  {step === 7 ? 'CONFIRMAR RESERVA' : 'CONTINUAR'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reserva;
