import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight, Users, Minus, Plus } from 'lucide-react';
import './Simulator.css';

// ─── tipos ────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3 | 4 | 5;

interface Unidade {
  id: string;
  nome: string;
  endereco: string;
  capacidade: number;
}

const UNIDADES: Record<string, Unidade[]> = {
  bc: [
    { id: 'bc1', nome: 'Casa de Madrinha Centro', endereco: 'R. das Flores, 120 – Centro, BC', capacidade: 120 },
    { id: 'bc2', nome: 'Casa de Madrinha Beira-Mar', endereco: 'Av. Atlântica, 840 – BC', capacidade: 150 },
  ],
  camboriu: [
    { id: 'cam1', nome: 'Casa de Madrinha Camboriú', endereco: 'R. Principal, 55 – Camboriú', capacidade: 200 },
  ],
};

const TIPOS_EVENTO = [
  { id: 'infantil',    label: 'Festa Infantil',   emoji: '🎂', cor: 'var(--color-pink)' },
  { id: '15anos',      label: '15 Anos',           emoji: '👑', cor: 'var(--color-purple)' },
  { id: 'corporativo', label: 'Corporativo',       emoji: '💼', cor: '#2196F3' },
  { id: 'outros',      label: 'Outros',            emoji: '🎉', cor: '#FF9800' },
];

const EXTRAS = [
  { id: 'decoracao',   label: 'Decoração Premium',   emoji: '🌸', cor: 'var(--color-pink)',   preco: 800 },
  { id: 'fotografia',  label: 'Foto & Vídeo',        emoji: '📸', cor: 'var(--color-purple)', preco: 1200 },
  { id: 'dj',          label: 'DJ & Iluminação',     emoji: '🎵', cor: '#2196F3',             preco: 900 },
  { id: 'bartender',   label: 'Bartender / Drinks',  emoji: '🍹', cor: '#FF9800',             preco: 700 },
  { id: 'brinquedos',  label: 'Brinquedos',          emoji: '🎠', cor: '#4CAF50',             preco: 600 },
  { id: 'convite',     label: 'Convite Digital',     emoji: '✉️',  cor: '#9C27B0',             preco: 200 },
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

// ─── componente principal ─────────────────────────────────────────────────────
const Simulator = () => {
  const today = new Date();
  const [step, setStep] = useState<Step>(1);
  const [cidade, setCidade] = useState('');
  const [unidadeId, setUnidadeId] = useState('');
  const [tipoEvento, setTipoEvento] = useState('');
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [dataSel,  setDataSel]  = useState<string>('');
  const [convidados, setConvidados] = useState(50);
  const [extras, setExtras] = useState<string[]>([]);

  // unidades disponíveis
  const unidadesDisponiveis = cidade ? UNIDADES[cidade] : [];
  const unidadeSel = unidadesDisponiveis.find(u => u.id === unidadeId);
  const maxConvidados = unidadeSel?.capacidade ?? 200;

  // calendário
  const cells = useMemo(() => buildCalendar(calYear, calMonth), [calYear, calMonth]);
  const isToday = (d: number) => d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
  const isPast = (d: number) => {
    const dt = new Date(calYear, calMonth, d);
    dt.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return dt < t;
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

  // extras toggle
  const toggleExtra = (id: string) =>
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  // orçamento
  const calcTotal = () => {
    let base = cidade === 'bc' ? 3000 : 2500;
    if (tipoEvento === '15anos') base += 1500;
    if (tipoEvento === 'corporativo') base += 2000;
    base += Math.max(0, convidados - 50) * 80;
    extras.forEach(id => {
      const ex = EXTRAS.find(e => e.id === id);
      if (ex) base += ex.preco;
    });
    return base;
  };

  // progresso: 5 passos
  const TOTAL_STEPS = 5;

  // avançar automaticamente ao selecionar (passos 1, 2, 3)
  const autoNext = () => setTimeout(() => setStep(s => Math.min(s + 1, TOTAL_STEPS) as Step), 320);

  const handleNext = () => setStep(s => Math.min(s + 1, TOTAL_STEPS) as Step);
  const handlePrev = () => setStep(s => Math.max(s - 1, 1) as Step);

  const canProceed = () => {
    if (step === 1) return !!cidade;
    if (step === 2) return !!unidadeId;
    if (step === 3) return !!tipoEvento;
    if (step === 4) return !!dataSel;
    return true;
  };

  // whatsapp
  const getWhatsLink = () => {
    const total = calcTotal().toLocaleString('pt-BR');
    const cidadeNome = cidade === 'bc' ? 'Balneário Camboriú' : 'Camboriú';
    const dataFmt = dataSel ? dataSel.split('-').reverse().join('/') : 'Não definida';
    const extrasNomes = extras.map(id => EXTRAS.find(e => e.id === id)?.label).filter(Boolean).join(', ') || 'Nenhum';
    const msg = `Olá! Simulei meu orçamento na Casa de Madrinha:\n\n📍 Cidade: ${cidadeNome}\n🏠 Unidade: ${unidadeSel?.nome}\n🎉 Evento: ${TIPOS_EVENTO.find(t=>t.id===tipoEvento)?.label}\n📅 Data: ${dataFmt}\n👥 Convidados: ${convidados}\n✨ Extras: ${extrasNomes}\n💰 Estimativa: R$ ${total}\n\nGostaria de confirmar a disponibilidade!`;
    return `https://wa.me/5547999999999?text=${encodeURIComponent(msg)}`;
  };

  const dataFormatada = dataSel ? dataSel.split('-').reverse().join('/') : '';

  return (
    <div className="simulator-page">
      <div className="sim-inner">

        {/* ── Header ── */}
        <div className="sim-top-label">
          <span className="sim-step-badge">Passo {step} de {TOTAL_STEPS}</span>
          <div className="sim-progress-track">
            <div className="sim-progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
        </div>

        {/* ── Passo 1: Cidade ── */}
        {step === 1 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">AONDE SERÁ A FESTA?</p>
            <h2 className="sim-title">Escolha a <span className="text-pink">cidade</span></h2>
            <div className="sim-city-grid">
              <div
                className={`sim-city-card ${cidade === 'bc' ? 'selected' : ''}`}
                onClick={() => { setCidade('bc'); setUnidadeId(''); autoNext(); }}
              >
                <div className="sim-city-art sim-city-art-bc">
                  <span className="sim-city-emoji">🏖️</span>
                </div>
                <div className="sim-city-info">
                  <h3>Balneário Camboriú</h3>
                  <p>{UNIDADES.bc.length} unidades disponíveis</p>
                </div>
                {cidade === 'bc' && <CheckCircle2 className="sim-check-icon" />}
              </div>
              <div
                className={`sim-city-card ${cidade === 'camboriu' ? 'selected' : ''}`}
                onClick={() => { setCidade('camboriu'); setUnidadeId(''); autoNext(); }}
              >
                <div className="sim-city-art sim-city-art-cam">
                  <span className="sim-city-emoji">🌴</span>
                </div>
                <div className="sim-city-info">
                  <h3>Camboriú</h3>
                  <p>{UNIDADES.camboriu.length} unidade disponível</p>
                </div>
                {cidade === 'camboriu' && <CheckCircle2 className="sim-check-icon" />}
              </div>
            </div>
          </div>
        )}

        {/* ── Passo 2: Unidade ── */}
        {step === 2 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">QUAL DAS CASAS?</p>
            <h2 className="sim-title">Escolha a <span className="text-pink">unidade</span></h2>
            <div className="sim-unit-list">
              {unidadesDisponiveis.map(u => (
                <div
                  key={u.id}
                  className={`sim-unit-card ${unidadeId === u.id ? 'selected' : ''}`}
                  onClick={() => { setUnidadeId(u.id); autoNext(); }}
                >
                  <div className="sim-unit-icon">🏠</div>
                  <div className="sim-unit-text">
                    <strong>{u.nome}</strong>
                    <span>{u.endereco}</span>
                    <em>Capacidade: até {u.capacidade} pessoas</em>
                  </div>
                  {unidadeId === u.id && <CheckCircle2 className="sim-check-icon" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Passo 3: Tipo de evento ── */}
        {step === 3 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">QUAL O TIPO?</p>
            <h2 className="sim-title">Tipo de <span className="text-pink">evento</span></h2>
            <div className="sim-tipo-grid">
              {TIPOS_EVENTO.map(t => (
                <div
                  key={t.id}
                  className={`sim-tipo-card ${tipoEvento === t.id ? 'selected' : ''}`}
                  style={{ '--card-color': t.cor } as React.CSSProperties}
                  onClick={() => { setTipoEvento(t.id); autoNext(); }}
                >
                  <span className="sim-tipo-emoji">{t.emoji}</span>
                  <span className="sim-tipo-label">{t.label}</span>
                  {tipoEvento === t.id && <CheckCircle2 className="sim-check-icon" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Passo 4: Calendário + Convidados + Extras ── */}
        {step === 4 && (
          <div className="sim-step animate-fade-in">
            <p className="sim-subtitle">DATA E CONVIDADOS</p>
            <h2 className="sim-title">Quando vai ser a <span className="text-pink">festa?</span></h2>

            {/* Layout lado a lado: calendário + painel direito */}
            <div className="sim-date-guests-layout">

              {/* Calendário */}
              <div className="sim-calendar">
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
                  <span><span className="leg-dot dot-today"/>Hoje</span>
                  <span><span className="leg-dot dot-sel"/>Selecionado</span>
                  <span><span className="leg-dot dot-past"/>Indisponível</span>
                </div>
              </div>

              {/* Painel direito: data selecionada + convidados */}
              <div className="sim-side-panel">
                {dataSel ? (
                  <div className="cal-selected-info">
                    <span>📅</span>
                    <strong>{dataFormatada}</strong>
                  </div>
                ) : (
                  <div className="cal-hint-box">
                    <span>📅</span>
                    <p>Selecione uma data no calendário</p>
                  </div>
                )}

                <div className="sim-guests-card">
                  <div className="guests-label">
                    <Users size={18} />
                    <span>Convidados</span>
                  </div>
                  <div className="guests-controls">
                    <button className="guests-btn" onClick={() => setConvidados(c => Math.max(10, c - 10))}>
                      <Minus size={18} />
                    </button>
                    <span className="guests-value">{convidados}</span>
                    <button className="guests-btn" onClick={() => setConvidados(c => Math.min(maxConvidados, c + 10))}>
                      <Plus size={18} />
                    </button>
                  </div>
                  <input
                    type="range"
                    className="guests-slider"
                    min={10}
                    max={maxConvidados}
                    step={5}
                    value={convidados}
                    onChange={e => setConvidados(Number(e.target.value))}
                  />
                  <div className="guests-range-labels">
                    <span>10</span>
                    <span>{maxConvidados}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Extras abaixo */}
            <p className="sim-extras-title">Serviços adicionais <em>(opcionais)</em></p>
            <div className="sim-extras-grid">
              {EXTRAS.map(ex => (
                <div
                  key={ex.id}
                  className={`sim-extra-card ${extras.includes(ex.id) ? 'selected' : ''}`}
                  style={{ '--ex-color': ex.cor } as React.CSSProperties}
                  onClick={() => toggleExtra(ex.id)}
                >
                  <div className="sim-extra-emoji-wrap">
                    <span className="sim-extra-emoji">{ex.emoji}</span>
                  </div>
                  <div className="sim-extra-info">
                    <strong>{ex.label}</strong>
                    <span>+ R$ {ex.preco.toLocaleString('pt-BR')}</span>
                  </div>
                  {extras.includes(ex.id) && <CheckCircle2 className="sim-check-icon" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Passo 5: Resultado ── */}
        {step === 5 && (
          <div className="sim-step animate-fade-in">
            <div className="sim-result">
              <div className="sim-result-badge">🎉 Orçamento pronto!</div>
              <div className="sim-result-price">
                <span className="sim-result-currency">R$</span>
                <span className="sim-result-amount">{calcTotal().toLocaleString('pt-BR')}</span>
              </div>
              <p className="sim-result-disclaimer">* Estimativa. Valor final confirmado pela nossa equipe.</p>

              <div className="sim-result-summary">
                <div className="sim-sum-row">
                  <span>📍 Unidade</span>
                  <strong>{unidadeSel?.nome}</strong>
                </div>
                <div className="sim-sum-row">
                  <span>🎉 Evento</span>
                  <strong>{TIPOS_EVENTO.find(t => t.id === tipoEvento)?.label}</strong>
                </div>
                <div className="sim-sum-row">
                  <span>📅 Data</span>
                  <strong>{dataFormatada}</strong>
                </div>
                <div className="sim-sum-row">
                  <span>👥 Convidados</span>
                  <strong>{convidados} pessoas</strong>
                </div>
                {extras.length > 0 && (
                  <div className="sim-sum-row">
                    <span>✨ Extras</span>
                    <strong>{extras.map(id => EXTRAS.find(e => e.id === id)?.emoji).join(' ')}</strong>
                  </div>
                )}
              </div>

              <a href={getWhatsLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageCircle size={20} />
                Confirmar pelo WhatsApp
              </a>
              <button className="sim-restart-btn" onClick={() => { setStep(1); setCidade(''); setUnidadeId(''); setTipoEvento(''); setDataSel(''); setConvidados(50); setExtras([]); }}>
                Refazer simulação
              </button>
            </div>
          </div>
        )}

        {/* ── Ações ── */}
        {step < 5 && (
          <div className="sim-actions">
            {step > 1 && (
              <button className="sim-btn-back" onClick={handlePrev}>
                <ArrowLeft size={18} /> Voltar
              </button>
            )}
            <button
              className="sim-btn-next"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === 4 ? 'Ver Orçamento' : 'Próximo'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulator;
