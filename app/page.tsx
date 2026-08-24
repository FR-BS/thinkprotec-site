'use client';

import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Camera,
  DoorOpen,
  Network,
  ScanFace,
  ShieldCheck,
  Siren,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
};

type Faq = { question: string; answer: string };

const whatsappUrl =
  'https://wa.me/5521959368429?text=Olá%20Felipe!%20Vi%20o%20seu%20site%20e%20gostaria%20de%20um%20orçamento.';

const services: Service[] = [
  { title: 'Câmeras & CFTV', description: 'Projetos com câmeras IP ou analógicas, gravação em nuvem ou local e acesso seguro pelo celular.', tag: 'Instalação + manutenção', icon: Camera },
  { title: 'Controle de acesso', description: 'Biometria, reconhecimento facial e cartões RFID com histórico completo de entradas e saídas.', tag: 'Instalação + suporte', icon: ScanFace },
  { title: 'Alarmes', description: 'Sensores perimetrais, controle pelo aplicativo e sirene de alta potência para proteção ativa 24 horas.', tag: 'Instalação + plano mensal', icon: Siren },
  { title: 'Cerca elétrica', description: 'Proteção perimetral discreta e eficaz, dimensionada para residências, empresas e condomínios.', tag: 'Instalação + manutenção', icon: Zap },
  { title: 'Portões automáticos', description: 'Instalação e reparo de motores, placas e sistemas de abertura com atendimento ágil.', tag: 'Instalação + manutenção', icon: DoorOpen },
  { title: 'Redes & infraestrutura', description: 'Cabeamento estruturado, Wi-Fi corporativo, racks, switches e organização técnica completa.', tag: 'Projeto + execução', icon: Network },
];

const faqs: Faq[] = [
  { question: 'Como posso confiar antes de contratar?', answer: 'Você fala diretamente comigo, Felipe, desde a visita até a entrega. A ThinkProtec tem CNPJ ativo, emite nota fiscal e já concluiu mais de 100 instalações no Rio de Janeiro.' },
  { question: 'A visita técnica tem custo?', answer: 'A visita para entender o projeto e preparar o orçamento é sem compromisso. Antes de iniciar, você recebe escopo, prazo e investimento de forma clara.' },
  { question: 'Vocês fazem manutenção em sistemas existentes?', answer: 'Sim. Avalio instalações de qualquer marca, identifico falhas e proponho correções ou um plano preventivo adequado aos equipamentos existentes.' },
  { question: 'Os equipamentos têm garantia?', answer: 'Sim. Os equipamentos contam com a garantia do fabricante e a instalação possui garantia técnica da mão de obra.' },
  { question: 'Quanto tempo leva uma instalação?', answer: 'Projetos menores podem ser concluídos em um dia. Sistemas maiores levam alguns dias, e o prazo é informado antes do início do serviço.' },
];

function BrandIdentity() {
  return (
    <>
      <span className="brand-emblem" aria-hidden="true">
        <span className="brand-orbit" />
        <ShieldCheck size={25} strokeWidth={1.8} />
      </span>
      <span className="brand-name">Think<strong>Protec</strong><small>SEGURANÇA INTELIGENTE</small></span>
    </>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const root = document.documentElement;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -45px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('_subject', 'Novo orçamento pelo site — ThinkProtec');
    formData.append('_captcha', 'false');

    setSending(true);
    setFormStatus('idle');

    try {
      const response = await fetch('https://formsubmit.co/ajax/thinkprotec@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      if (!response.ok) throw new Error('Não foi possível enviar o formulário.');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    } finally {
      setSending(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="ThinkProtec — início" onClick={closeMenu}>
          <BrandIdentity />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#diferenciais">Diferenciais</a>
          <a href="#faq">FAQ</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Pedir orçamento</a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#diferenciais" onClick={closeMenu}>Diferenciais</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow"><i /> Segurança eletrônica no Rio de Janeiro</span>
          <h1>Proteção pensada por quem vai <em>instalar e cuidar.</em></h1>
          <p>Atendimento direto com Felipe, técnico responsável por cada etapa — do diagnóstico à manutenção do seu sistema de segurança.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com o especialista <span>↗</span></a>
            <a className="button button-secondary" href="#servicos">Conhecer serviços</a>
          </div>
          <div className="hero-proof" aria-label="Indicadores da ThinkProtec">
            <div><strong>+100</strong><span>projetos entregues</span></div>
            <div><strong>2 anos</strong><span>protegendo o Rio</span></div>
            <div><strong>CNPJ</strong><span>e nota fiscal</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Painel ilustrativo de segurança conectada">
          <div className="visual-grid" /><div className="security-orbit orbit-one" /><div className="security-orbit orbit-two" />
          <div className="shield-core"><ShieldCheck size={76} strokeWidth={1.25} /><small>SISTEMA ATIVO</small></div>
          <div className="status-card status-top"><i /> Monitoramento conectado</div>
          <div className="status-card status-bottom"><strong>24h</strong><span>proteção inteligente</span></div>
        </div>
      </section>

      <aside className="trust-strip" aria-label="Marcas com as quais trabalhamos">
        <span>Intelbras</span><span>Hikvision</span><span>Control iD</span><span>Garen</span><span>TP-Link</span>
      </aside>

      <section className="section services-section" id="servicos">
        <div className="section-heading" data-reveal>
          <div><span className="section-index">01 / Serviços</span><h2>Uma estrutura de segurança que <em>funciona junto.</em></h2></div>
          <p>Do primeiro cabo ao acesso pelo celular, cada solução é planejada para o seu espaço e entregue pronta para usar.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
            <article className="service-card" key={service.title} data-reveal style={{ '--reveal-order': index } as CSSProperties}>
              <div className="service-visual" aria-hidden="true">
                <span className="icon-orbit icon-orbit-outer" />
                <span className="icon-orbit icon-orbit-inner" />
                <Icon size={92} strokeWidth={1.15} />
                <i className="icon-scan" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <small>{service.tag}</small>
            </article>
          )})}
        </div>
      </section>

      <section className="process-section">
        <div className="process-copy" data-reveal>
          <span className="section-index">02 / Processo</span>
          <h2>Do diagnóstico ao pós-venda, <em>sem intermediários.</em></h2>
          <p>Você sabe quem entra no seu espaço, quem executa o serviço e com quem falar depois da entrega.</p>
          <a className="text-link" href="#contato">Agendar uma visita <span>→</span></a>
        </div>
        <ol className="process-list">
          <li data-reveal><span>01</span><div><strong>Visita técnica</strong><p>Entendo o ambiente, os riscos e o que realmente precisa ser protegido.</p></div></li>
          <li data-reveal><span>02</span><div><strong>Projeto claro</strong><p>Você recebe solução, prazo e investimento antes de qualquer instalação.</p></div></li>
          <li data-reveal><span>03</span><div><strong>Execução limpa</strong><p>Instalação organizada, configuração completa e orientação de uso.</p></div></li>
          <li data-reveal><span>04</span><div><strong>Suporte contínuo</strong><p>Continuo disponível para ajustes, manutenção e expansão do sistema.</p></div></li>
        </ol>
      </section>

      <section className="section differentiators" id="diferenciais">
        <div className="section-heading compact" data-reveal>
          <div><span className="section-index">03 / Diferenciais</span><h2>Técnica, transparência e <em>responsabilidade.</em></h2></div>
        </div>
        <div className="difference-grid">
          <article data-reveal><h3>Falo com você</h3><p>O mesmo profissional que avalia é quem acompanha a execução e responde no pós-venda.</p></article>
          <article data-reveal><h3>Escopo sem surpresa</h3><p>Equipamentos, etapas, prazo e valores combinados antes de começar.</p></article>
          <article data-reveal><h3>Instalação documentada</h3><p>Configurações organizadas e orientação para você usar tudo com segurança.</p></article>
          <article data-reveal><h3>Empresa formalizada</h3><p>CNPJ ativo, nota fiscal e garantia técnica em todos os serviços.</p></article>
        </div>
      </section>

      <section className="maintenance-callout">
        <div className="callout-rings" aria-hidden="true"><span /><span /><span /></div>
        <div data-reveal><span className="section-index">Proteção contínua</span><h2>Seu sistema também precisa de <em>manutenção.</em></h2><p>Planos preventivos para câmeras, alarmes, controles de acesso, redes e portões.</p></div>
        <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Conhecer os planos <span>↗</span></a>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-intro" data-reveal><span className="section-index">04 / Perguntas frequentes</span><h2>Informação clara antes de <em>decidir.</em></h2><p>Ainda tem alguma dúvida? Fale comigo diretamente pelo WhatsApp.</p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => <details key={faq.question} data-reveal><summary><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}<i>+</i></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-copy" data-reveal>
          <span className="section-index">05 / Orçamento</span>
          <h2>Vamos proteger o que <em>importa?</em></h2>
          <p>Conte brevemente o que você precisa. Respondo em até duas horas durante o horário comercial.</p>
          <div className="contact-details"><div><small>WhatsApp</small><a href={whatsappUrl} target="_blank" rel="noreferrer">(21) 95936-8429</a></div><div><small>Instagram</small><a href="https://instagram.com/thinkprotec" target="_blank" rel="noreferrer">@thinkprotec</a></div><div><small>Área de atendimento</small><strong>Rio de Janeiro, RJ</strong></div></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <label><span>Seu nome</span><input type="text" name="Nome" required placeholder="Como posso chamar você?" autoComplete="name" /></label>
          <div className="form-row"><label><span>WhatsApp</span><input type="tel" name="Telefone" required placeholder="(21) 99999-9999" autoComplete="tel" /></label><label><span>Tipo de local</span><select name="Local" required defaultValue=""><option value="" disabled>Selecione</option><option>Residência</option><option>Condomínio</option><option>Empresa / Comércio</option><option>Outro</option></select></label></div>
          <label><span>Serviço desejado</span><select name="Serviço" required defaultValue=""><option value="" disabled>Selecione uma solução</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
          <label><span>Conte um pouco mais</span><textarea name="Mensagem" rows={4} placeholder="Bairro, equipamentos atuais ou o que você quer proteger..." /></label>
          <button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Enviando...' : 'Solicitar orçamento'} <span>→</span></button>
          {formStatus === 'success' && <p className="form-message success">Pedido enviado. Retornarei em breve.</p>}
          {formStatus === 'error' && <p className="form-message error">Não foi possível enviar. Fale comigo pelo WhatsApp.</p>}
        </form>
      </section>

      <footer>
        <div className="footer-main"><a className="brand" href="#inicio"><BrandIdentity /></a><p>Segurança eletrônica com atendimento direto do técnico responsável.</p><a className="footer-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ThinkProtec · CNPJ 64.184.374/0001-97</span><span>Rio de Janeiro, RJ</span><span>React + TypeScript</span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><span>WA</span><small>Falar agora</small></a>
    </main>
  );
}
