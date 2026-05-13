import React, { useState } from 'react'
import Footer from '../components/Footer'
import { FaTasks, FaBrain, FaBook, FaCogs } from 'react-icons/fa'

const industries = [
  'STARTUPS', 'ENTERPRISES', 'AGENCIES',
  'PRODUCT TEAMS', 'OPERATIONS', 'MARKETING',
]

const tickerStats = [
  { label: 'Features', value: '100+' },
  { label: 'Integrations', value: '1,000+' },
  { label: 'Views', value: '15+' },
  { label: 'Users worldwide', value: '3M+' },
  { label: 'Uptime SLA', value: '99.9%' },
  { label: 'Support', value: '24/7' },
]

const clickupFeatures = [
  {
    icon: <FaTasks />,
    title: 'Project & task management',
    desc: 'Plan, track, and manage any type of work with tasks, subtasks, milestones, sprints, and Gantt charts — all in one place.',
  },
  {
    icon: <FaBrain />,
    title: 'AI-powered brain',
    desc: 'ClickUp Brain acts as a 24/7 intelligent assistant — answering questions, drafting content, assigning tasks, and surfacing insights automatically.',
  },
  {
    icon: <FaBook />,
    title: 'Docs & knowledge base',
    desc: 'Create rich documents, wikis, and SOPs connected directly to your work — no more hunting through Google Drive or Notion separately.',
  },
  {
    icon: <FaCogs />,
    title: 'Automations & workflows',
    desc: 'Automate repetitive work with 100+ built-in automations or build custom triggers — so your team focuses on what actually matters.',
  },
]

const services = [
  {
    num: '01', title: 'ClickUp licensing & sales',
    desc: 'Authorised reseller in India. Get official ClickUp licences at best pricing, with INR billing and local invoicing support.',
  },
  {
    num: '02', title: 'Workspace setup & implementation',
    desc: 'We design and configure your ClickUp workspace from scratch — Hierarchy, spaces, folders, views, and custom fields tailored to your workflow.',
  },
  {
    num: '03', title: 'Team training & onboarding',
    desc: 'Live training sessions for teams of any size — from basics to advanced automation. We ensure adoption, not just installation.',
  },
  {
    num: '04', title: 'Migration from other tools',
    desc: 'Seamless migration from Asana, Jira, Monday.com, Trello, or any spreadsheet-based system — without losing data or history.',
  },
  {
    num: '05', title: 'Automation & integration builds',
    desc: 'Custom automations, Zapier/Make integrations, API connections, and workflow architecture to supercharge your productivity stack.',
  },
  {
    num: '06', title: 'Ongoing support & consulting',
    desc: 'Dedicated account management, quarterly audits, and continuous optimisation to keep your ClickUp workspace performing at its best.',
  },
]

const whyClickup = [
  {
    num: '01', title: 'Replace every tool you use',
    desc: 'Replace Jira, Notion, Slack, Monday, and Asana with a single platform. Less context switching, fewer tools, better outcomes.',
  },
  {
    num: '02', title: 'Built for how you work',
    desc: 'Custom fields, statuses, views, permissions, and workflows. ClickUp adapts to how your team works — not the other way around.',
  },
  {
    num: '03', title: 'AI across everything',
    desc: "ClickUp Brain is embedded across the platform — not a bolt-on. It understands your tasks, writes, summarises, and acts on your behalf.",
  },
  {
    num: '04', title: 'Scales with your growth',
    desc: "From a 3-person startup to a 1,000-person enterprise — ClickUp's permission model, SSO, and enterprise controls grow with you.",
  },
  {
    num: '05', title: 'Best value in the market',
    desc: 'Compared feature-for-features, ClickUp consistently delivers 60–80% more at the same or lower price than its competitors.',
  },
  {
    num: '06', title: 'Real-time collaboration',
    desc: 'Whiteboards, docs, chat, and task comments all update live. Your entire team stays in sync without ever leaving the workspace.',
  },
]

const partnerBullets = [
  'Authorised reseller with official partner status in India',
  'INR pricing, GST invoicing, and local payment support',
  "Direct access to ClickUp's enterprise team for escalations",
  'Exclusive training and early access to new features',
  'Post-sale support and workspace management included',
  'Trusted by teams across India from Day 1',
]

const partnerStats = [
  { value: '98%', label: 'Retention rate' },
  { value: '4.9★', label: 'Client satisfaction' },
  { value: '3 days', label: 'Avg. onboarding time' },
  { value: 'INR', label: 'Localisation' },
]

/* ─── gradient token ─── */
const GRAD = 'linear-gradient(135deg, #FF02F0 0%, #FC6D2D 25%, #6647F0 60%, #0091FF 100%)'
const gradText = {
  background: GRAD, WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent', backgroundClip: 'text',
}

/* ─── shared style atoms ─── */
const sectionLabel = {
  fontSize: '0.68rem', letterSpacing: '0.13em',
  background: GRAD, WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700,
  display: 'inline-block',
}
const sectionH2 = {
  fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900,
  lineHeight: 1.15, marginBottom: '1rem',
}
const sectionSub = {
  color: '#999', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '3rem',
}
const card = {
  background: '#ffffffc9', border: '1px solid #9d9d9d',
  borderRadius: 12, padding: '1.5rem',
}

export const Clickup = () => {
  const [activeIndustry, setActiveIndustry] = useState(0)

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#000', overflowX: 'clip' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { font-family: 'Inter', sans-serif !important; }
        .cu-ticker-wrap { overflow: hidden; }
        .cu-ticker-track {
          display: flex; width: max-content;
          animation: cu-scroll 22s linear infinite;
        }
        @keyframes cu-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cu-ind-btn {
          background: none; border: none; cursor: pointer;
          padding: 4px 0; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.08em; transition: color 0.2s;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '10vw', height: '60vw', maxWidth: '100vw', maxHeight: '100vh', borderRadius: '50%', background: 'radial-gradient(circle, #FF02F0 0%, #FC6D2D 50%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '-10%', right: '10%', width: '10vw', height: '60vw', maxWidth: '100vw', maxHeight: '100vh', borderRadius: '80%', background: 'radial-gradient(circle, #6647F0 0%, #0091FF 45%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
        <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">
        <img
            className="h-10"
            src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Subtitle_1_ux5e4d.png"
            alt="Partner Logo"
            style={{ display: 'block', margin: '0 auto 1.5rem' }}
        />
        </a>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid transparent',
          background: `linear-gradient(#fff, #ffffff) padding-box, ${GRAD} border-box`,
          borderRadius: 999, padding: '4px 16px', marginBottom: '2rem',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: GRAD, flexShrink: 0, display: 'inline-block' }} />
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.1em', ...gradText, fontWeight: 700, textTransform: 'uppercase' }}>
            Official <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> Partner — India
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 7vw, 4rem)', fontWeight: 900, lineHeight: 1.1, maxWidth: 700, margin: '0 auto 1.5rem' }}>
          One platform to replace<br />
          <span style={{ ...gradText }}>every tool you use</span>
        </h1>

        <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 2.5rem' }}>
          We are India's authorised <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> partner, helping teams work smarter,
          automate deeper, and scale faster with the world's most powerful productivity platform.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <a href="https://app.clickup.com/login?_gl=1*168xxy9*_gcl_aw*R0NMLjE3NzY0MzE2NjguQ2p3S0NBand0SWZQQmhBekVpd0F2OVJUSnZ0cFQycVhEUWhHQTFQeG5MbWJHNUN4YzJhTnI0RXdHem1QNGlQanBUM1U0bTBiQzVlOGJob0NRRklRQXZEX0J3RQ..*_gcl_au*NDYyMDc0NTkyLjE3NzE5MDc2NzM.">
          <button style={{ background: GRAD, color: '#fff', border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
            Get ClickUp for your team
          </button>
          </a>
         <a href='/contact'>
                   <button style={{ background: 'transparent', color: '#000', border: '1.5px solid #000', borderRadius: 6, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
            Talk to our experts
          </button>
          </a>
        </div>

        <p style={{ fontSize: '0.68rem', letterSpacing: '0.13em', color: '#666', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
          Trusted Across Industries
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {industries.map((ind, i) => (
            <button
              key={ind} className="cu-ind-btn"
              onClick={() => setActiveIndustry(i)}
              style={{
                color: '#555',
                borderBottom: activeIndustry === i ? '2px solid #FF02F0' : '2px solid transparent',
              }}
            >
              {ind}
            </button>
          ))}
        </div>
        </div>{/* end z-index wrapper */}
      </section>

      {/* ── WHAT IS CLICKUP ──────────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={sectionLabel}>What is <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a></p>
          <h2 style={{ ...sectionH2, maxWidth: 440 }}>
            Software to replace<br />all software
          </h2>
          <p style={{ ...sectionSub, maxWidth: 560 }}>
            <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> is an all-in-one productivity platform that brings your tasks, docs, chat,
            goals, and AI into a single workspace — eliminating the chaos of juggling 10+ apps.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {clickupFeatures.map((feat, i) => (
              <div key={i} style={card}>
                <div style={{ color: '#FF02F0', fontSize: '1.3rem', marginBottom: '0.75rem' }}>{feat.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{feat.title}</h3>
                <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.65 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS TICKER ─────────────────────────────────────── */}
      <div className="cu-ticker-wrap" style={{ background: '#f5f5f5', borderTop: '1px solid #ececec', borderBottom: '1px solid #ececec', padding: '0.85rem 0' }}>
        <div className="cu-ticker-track">
          {[...tickerStats, ...tickerStats].map((s, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 2.5rem', whiteSpace: 'nowrap', fontSize: '0.85rem', color: '#666' }}>
              <span style={{ fontWeight: 800, color: '#111', fontSize: '1rem' }}>{s.value}</span>
              <span>{s.label}</span>
              <span style={{ color: '#ddd', marginLeft: '1rem' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── OUR SERVICES ─────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={sectionLabel}>Our Services</p>
          <h2 style={{ ...sectionH2, maxWidth: 560 }}>
            Everything you need<br />to get started &amp; succeed
          </h2>
          <p style={{ ...sectionSub, maxWidth: 540 }}>
            As official <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> partners in India, we provide end-to-end support —
            from licensing and onboarding to custom implementation and training.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {services.map((svc, i) => (
              <div key={i} style={card}>
                <p style={{ ...gradText, fontWeight: 800, fontSize: '1rem', marginBottom: '0.6rem', display: 'inline-block' }}>{svc.num}</p>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{svc.title}</h3>
                <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.65 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CLICKUP ──────────────────────────────────────── */}
      <section style={{ background: '#f9f9f9', padding: '5rem 1.25rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={sectionLabel}>Why <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a></p>
          <h2 style={sectionH2}>
            The advantages that<br />our clients love
          </h2>
          <p style={{ ...sectionSub, maxWidth: 500 }}>
            We've used <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> ourselves before selling it. Here's what genuinely
            sets it apart from every other tool we've tried.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {whyClickup.map((item, i) => (
              <div key={i} style={card}>
                <p style={{ ...gradText, fontWeight: 800, fontSize: '1rem', marginBottom: '0.6rem', display: 'inline-block' }}>{item.num}</p>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP ──────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '5rem 1.25rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <p style={sectionLabel}>Our Partnership</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.2rem' }}>
              India's official<br /><a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> partner
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.8rem' }}>
              We became power users of <a href="https://clickup.com" target="_blank" rel="noopener noreferrer">ClickUp</a> long before becoming its partner. After
              transforming our own operations, we knew it was the tool every Indian business
              needed — so we made it our mission to bring it to them.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {partnerBullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#444', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  <span style={{ ...gradText, marginTop: 4, flexShrink: 0, fontSize: '0.5rem' }}>●</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — stats card */}
          <div style={{ background: '#fff', border: '1px solid #e6e6e6', borderRadius: 16, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.13em', color: '#555', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Partnership Status
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ color: '#000', fontWeight: 700, fontSize: '0.9rem' }}>Official Partner</span>
                <span style={{ background: 'rgba(255,77,109,0.12)', color: '#FF02F0', borderRadius: 999, padding: '2px 10px', fontSize: '0.7rem', fontWeight: 700 }}>
                  Active 2025
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e6e6e6', paddingTop: '1.25rem' }}>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.13em', color: '#555', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Clients Onboarded in India
              </p>
              <p style={{ fontSize: '2.6rem', fontWeight: 900, lineHeight: 1, color: '#111' }}>150+</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #ececec', paddingTop: '1.25rem' }}>
              {partnerStats.map((s, i) => (
                <div key={i}>
                  <p style={{ fontWeight: 800, fontSize: '1.35rem', color: '#111' }}>{s.value}</p>
                  <p style={{ color: '#666', fontSize: '0.78rem' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section style={{ background: GRAD, padding: '4.5rem 1.25rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
          Ready to transform how your team works?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 2rem' }}>
          Get <a href="https://clickup.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>ClickUp</a> through India's only official partner. Local support, INR pricing,
          and hands-on implementation — all included.
        </p>
         <a href="https://app.clickup.com/login?_gl=1*168xxy9*_gcl_aw*R0NMLjE3NzY0MzE2NjguQ2p3S0NBand0SWZQQmhBekVpd0F2OVJUSnZ0cFQycVhEUWhHQTFQeG5MbWJHNUN4YzJhTnI0RXdHem1QNGlQanBUM1U0bTBiQzVlOGJob0NRRklRQXZEX0J3RQ..*_gcl_au*NDYyMDc0NTkyLjE3NzE5MDc2NzM.">
        <button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: 6, padding: '0.8rem 2rem', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
          Book a free demo
        </button>
        </a>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', marginTop: '2.5rem', letterSpacing: '0.06em' }}>
          Official <a href="https://clickup.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>ClickUp</a> Partner &nbsp;·&nbsp; 🇮🇳 India Region &nbsp;·&nbsp; Authorised Reseller
        </p>
      </section>
       <p
  style={{
    fontSize: '0.75rem',
    marginTop: '1rem',
    paddingBottom: '1rem',
    letterSpacing: '0.06em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // ⭐ centers horizontally
    gap: '6px',
    textAlign: 'center'
  }}
><a href="https://socialbureau.in" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none' }}>
  <img 
    className="h-3"
    src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Subtitle_2_n7fktm.png"
    alt="SocialBureau"
  /></a>
  — A Venture of <a href="https://trillionedition.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none' }}>
  <img
    className="h-5"
    src="https://pub-dbc24446d37a40aeb1dfdd10992cd2d9.r2.dev/Subtitle_3_tzbpmq.png"
    alt="TrillionEdition"
  />
  </a>
</p>
    </div>
  )
}

