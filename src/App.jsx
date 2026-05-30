import { useState, useEffect, useRef } from "react";
import { content } from "./content.js";

// ── THEME ────────────────────────────────────────────────────────────────────
const theme = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:           #EEF3FA;
    --bg2:          #F6F9FE;
    --surface:      #FFFFFF;
    --ink:          #1C2533;
    --ink-muted:    #6B7A94;
    --accent:       #4A7FBF;
    --accent-light: #C5D9F0;
    --accent-pale:  #E4EDF8;
    --line:         #D3E0F0;
    --dark:         #1C2E47;
    --dark-muted:   rgba(255,255,255,0.55);
    --serif:        'Playfair Display', Georgia, serif;
    --sans:         'Outfit', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--sans);
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  a { text-decoration: none; color: inherit; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

// ── HOOK: INTERSECTION OBSERVER ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang, page, setPage, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { key: "about", href: "#about" },
    { key: "experience", href: "#experience" },
    { key: "skills", href: "#skills" },
    { key: "projects", href: "#projects" },
    { key: "education", href: "#education" },
    { key: "contact", href: "#contatti" },
  ];

  const handleLogoClick = () => { setPage("home"); window.scrollTo(0, 0); };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem 4rem",
      background: scrolled ? "rgba(238,243,250,0.92)" : "rgba(238,243,250,0.7)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <button onClick={handleLogoClick} style={{
        fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 400,
        letterSpacing: "0.04em", color: "var(--ink)", background: "none", border: "none", cursor: "pointer",
      }}>
        Mario Rossi
      </button>

      {page === "home" && (
        <ul style={{ display: "flex", gap: "2.2rem", listStyle: "none", alignItems: "center" }}>
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <a href={href} style={{
                fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--ink-muted)", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"}
                onMouseLeave={e => e.target.style.color = "var(--ink-muted)"}
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: "flex", gap: "0.4rem" }}>
        {["en", "de", "it"].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            padding: "0.3rem 0.65rem",
            border: `1px solid ${lang === l ? "var(--accent)" : "var(--line)"}`,
            background: lang === l ? "var(--accent)" : "transparent",
            color: lang === l ? "#fff" : "var(--ink-muted)",
            fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            fontFamily: "var(--sans)",
          }}>
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ t }) {
  const h = t.hero;
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "grid",
      gridTemplateColumns: "1fr 1fr", alignItems: "center",
      padding: "8rem 4rem 4rem", gap: "4rem",
      background: "linear-gradient(135deg, var(--bg) 60%, var(--accent-pale) 100%)",
    }}>
      <div style={{ animation: "fadeUp 1s ease both" }}>
        <div style={{
          fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--accent)", marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: "0.75rem",
        }}>
          <span style={{ display: "block", width: "2.5rem", height: "1px", background: "var(--accent)" }} />
          {h.label}
        </div>
        <h1 style={{
          fontFamily: "var(--serif)", fontSize: "clamp(3.2rem,5.5vw,5rem)",
          fontWeight: 300, lineHeight: 1.08, marginBottom: "1.4rem",
        }}>
          {h.name}<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>{h.surname}</em>
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--ink-muted)", marginBottom: "2.5rem" }}>{h.role}</p>
        <a href="#contatti" style={{
          display: "inline-flex", alignItems: "center", gap: "0.75rem",
          padding: "0.85rem 2rem", background: "var(--dark)",
          color: "var(--bg)", fontSize: "0.75rem", letterSpacing: "0.1em",
          textTransform: "uppercase", transition: "background 0.3s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--dark)"}
        >
          {h.cta}
          <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>

      <div style={{ animation: "fadeUp 1s 0.2s ease both" }}>
        <div style={{
          background: "var(--surface)", border: "1px solid var(--line)",
          padding: "2.5rem", position: "relative",
          boxShadow: "0 8px 40px rgba(74,127,191,0.1)",
        }}>
          <div style={{
            position: "absolute", top: "-8px", left: "-8px",
            width: "100%", height: "100%",
            border: "1px solid var(--accent-light)", zIndex: -1,
          }} />
          <div style={{ marginBottom: "1.8rem" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "2.8rem", fontWeight: 300, color: "var(--accent)", lineHeight: 1 }}>{h.stats.years.num}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>{h.stats.years.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "2.8rem", fontWeight: 300, color: "var(--accent)", lineHeight: 1 }}>{h.stats.projects.num}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>{h.stats.projects.label}</span>
            </div>
          </div>
          <div style={{ height: "1px", background: "var(--line)", margin: "1.5rem 0" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {h.tags.map(tag => (
              <span key={tag} style={{
                padding: "0.28rem 0.8rem", border: "1px solid var(--line)",
                fontSize: "0.72rem", letterSpacing: "0.05em", color: "var(--ink-muted)",
                background: "var(--bg)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ num, title, dark }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3.5rem",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
      transition: "all 0.7s ease",
    }}>
      <span style={{ fontFamily: "var(--serif)", fontSize: "0.9rem", color: "var(--accent)", fontStyle: "italic" }}>{num}</span>
      <h2 style={{
        fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,3vw,2.5rem)",
        fontWeight: 300, color: dark ? "var(--bg2)" : "var(--ink)",
      }}>{title}</h2>
      <div style={{ flex: 1, height: "1px", background: dark ? "linear-gradient(to right, rgba(255,255,255,0.2), transparent)" : "linear-gradient(to right, var(--line), transparent)" }} />
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About({ t }) {
  const a = t.about;
  const [ref1, v1] = useReveal();
  const [ref2, v2] = useReveal();
  return (
    <section id="about" style={{ padding: "6rem 4rem", background: "var(--surface)" }}>
      <SectionHeader num={a.sectionNum} title={a.sectionTitle} />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div ref={ref1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
          {a.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: "1rem", color: "var(--ink-muted)", marginBottom: "1.2rem", lineHeight: 1.85 }}
              dangerouslySetInnerHTML={{ __html: p.replace(/<strong>/g, '<strong style="color:var(--ink);font-weight:500">') }}
            />
          ))}
        </div>
        <div ref={ref2} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", opacity: v2 ? 1 : 0, transform: v2 ? "none" : "translateY(20px)", transition: "all 0.7s 0.15s ease" }}>
          {a.facts.map((f, i) => (
            <div key={i} style={{ padding: "1.3rem 1.5rem", borderLeft: "2px solid var(--accent-light)", background: "var(--bg)" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.25rem" }}>{f.label}</div>
              <div style={{ fontSize: "0.88rem", color: "var(--ink)" }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience({ t }) {
  const e = t.experience;
  return (
    <section id="experience" style={{ padding: "6rem 4rem", background: "var(--bg)" }}>
      <SectionHeader num={e.sectionNum} title={e.sectionTitle} />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: "var(--line)" }} />
        {e.items.map((item, i) => {
          const [ref, visible] = useReveal();
          return (
            <div key={i} ref={ref} style={{
              padding: "0 0 2.8rem 3rem", position: "relative",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
              transition: `all 0.6s ${i * 0.1}s ease`,
            }}>
              <div style={{
                position: "absolute", left: "-5px", top: "6px",
                width: "11px", height: "11px", borderRadius: "50%",
                border: "2px solid var(--accent)", background: "var(--bg)",
              }} />
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.35rem" }}>{item.period}</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 400, marginBottom: "0.2rem" }}>{item.role}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: "0.8rem" }}>{item.company}</div>
              <div style={{ fontSize: "0.86rem", color: "var(--ink-muted)", lineHeight: 1.8, maxWidth: "60ch" }}>{item.desc}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── SKILLS ───────────────────────────────────────────────────────────────────
function SkillBar({ name, pct, visible }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.35rem" }}>
        <span style={{ color: "var(--ink)" }}>{name}</span>
        <span style={{ color: "var(--accent)", fontWeight: 500 }}>{pct}%</span>
      </div>
      <div style={{ height: "2px", background: "var(--line)", borderRadius: "1px", overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "linear-gradient(to right, var(--accent-light), var(--accent))",
          borderRadius: "1px", width: visible ? `${pct}%` : "0",
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

function Skills({ t }) {
  const s = t.skills;
  return (
    <section id="skills" style={{ padding: "6rem 4rem", background: "var(--surface)" }}>
      <SectionHeader num={s.sectionNum} title={s.sectionTitle} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.8rem" }}>
        {s.groups.map((group, gi) => {
          const [ref, visible] = useReveal();
          return (
            <div key={gi} ref={ref} style={{
              padding: "2rem", border: "1px solid var(--line)", background: "var(--bg)",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
              transition: `all 0.6s ${gi * 0.12}s ease`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = visible ? "none" : "translateY(20px)"; }}
            >
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontStyle: "italic", marginBottom: "1.5rem" }}>{group.title}</div>
              {group.items.map((item, ii) => <SkillBar key={ii} name={item.name} pct={item.pct} visible={visible} />)}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, cta, onOpen, index }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onClick={() => onOpen(project)} style={{
      border: `1px solid ${hovered ? "var(--accent)" : "var(--line)"}`,
      background: "var(--bg)", cursor: "pointer",
      transform: visible ? (hovered ? "translateY(-6px)" : "none") : "translateY(20px)",
      opacity: visible ? 1 : 0,
      transition: `all 0.5s ${index * 0.1}s ease`,
      overflow: "hidden",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        height: "160px", background: hovered ? "var(--accent-light)" : "var(--accent-pale)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        transition: "background 0.3s",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(74,127,191,0.06) 20px,rgba(74,127,191,0.06) 21px)",
        }} />
        <span style={{ fontFamily: "var(--serif)", fontSize: "3rem", fontStyle: "italic", color: "var(--accent)", opacity: 0.65 }}>
          {project.symbol}
        </span>
      </div>
      <div style={{ padding: "1.6rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.9rem" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--accent)", border: "1px solid var(--accent-light)", padding: "0.18rem 0.55rem",
            }}>{tag}</span>
          ))}
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>{project.title}</div>
        <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", lineHeight: 1.75, marginBottom: "1rem" }}>{project.desc}</div>
        <div style={{ fontSize: "0.73rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {cta}
          <svg width="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS SECTION ─────────────────────────────────────────────────────────
function Projects({ t, setPage, setCurrentProject }) {
  const p = t.projects;
  const handleOpen = (project) => {
    setCurrentProject(project);
    setPage("project");
    window.scrollTo(0, 0);
  };
  return (
    <section id="projects" style={{ padding: "6rem 4rem", background: "var(--bg)" }}>
      <SectionHeader num={p.sectionNum} title={p.sectionTitle} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.8rem" }}>
        {p.items.map((proj, i) => (
          <ProjectCard key={proj.id} project={proj} cta={p.cta} onOpen={handleOpen} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── PROJECT PAGE ─────────────────────────────────────────────────────────────
function ProjectPage({ project, t, setPage }) {
  useEffect(() => { window.scrollTo(0, 0); }, [project]);
  if (!project) return null;
  return (
    <div style={{ minHeight: "100vh", paddingTop: "6rem", background: "var(--bg)" }}>
      {/* Back */}
      <div style={{ padding: "2rem 4rem 0" }}>
        <button onClick={() => { setPage("home"); }} style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--accent)", background: "none", border: "none", cursor: "pointer",
          fontFamily: "var(--sans)",
        }}>
          {t.backToProjects}
        </button>
      </div>

      {/* Hero banner */}
      <div style={{
        margin: "2rem 4rem",
        background: "linear-gradient(135deg, var(--accent-pale), var(--accent-light))",
        border: "1px solid var(--line)",
        padding: "4rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "2rem",
      }}>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--accent)", border: "1px solid var(--accent)", padding: "0.2rem 0.6rem",
                background: "rgba(255,255,255,0.6)",
              }}>{tag}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "0.5rem" }}>
            {project.title}
          </h1>
        </div>
        <span style={{ fontFamily: "var(--serif)", fontSize: "6rem", fontStyle: "italic", color: "var(--accent)", opacity: 0.3, flexShrink: 0 }}>
          {project.symbol}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "0 4rem 6rem", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "4rem", alignItems: "start" }}>
        {/* Left */}
        <div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: "1.2rem", color: "var(--ink)" }}>
            Overview
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--ink-muted)", lineHeight: 1.9, marginBottom: "2.5rem" }}>{project.fullDesc}</p>

          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, marginBottom: "1.2rem", color: "var(--ink)" }}>
            Highlights
          </h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", fontSize: "0.9rem", color: "var(--ink-muted)" }}>
                <span style={{ color: "var(--accent)", fontSize: "1.2rem", lineHeight: 1.2, flexShrink: 0 }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ padding: "2rem", border: "1px solid var(--line)", background: "var(--surface)" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>
              Stack tecnologico
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tech.map(tech => (
                <span key={tech} style={{
                  padding: "0.35rem 0.9rem", border: "1px solid var(--line)",
                  fontSize: "0.78rem", color: "var(--ink-muted)", background: "var(--bg)",
                }}>{tech}</span>
              ))}
            </div>
          </div>

          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              padding: "1rem 2rem", background: "var(--dark)", color: "var(--bg)",
              fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--dark)"}
            >
              <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              Vedi su GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── EDUCATION ────────────────────────────────────────────────────────────────
function Education({ t }) {
  const e = t.education;
  return (
    <section id="education" style={{ padding: "6rem 4rem", background: "var(--surface)" }}>
      <SectionHeader num={e.sectionNum} title={e.sectionTitle} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.8rem" }}>
        {e.items.map((item, i) => {
          const [ref, visible] = useReveal();
          return (
            <div key={i} ref={ref} style={{
              padding: "2rem", border: "1px solid var(--line)", background: "var(--bg)",
              position: "relative", overflow: "hidden",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
              transition: `all 0.6s ${i * 0.1}s ease`,
            }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(to right, var(--accent), transparent)" }} />
              <div style={{ fontSize: "0.67rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.45rem" }}>{item.year}</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", marginBottom: "0.25rem" }}>{item.degree}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: "0.7rem" }}>{item.school}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontStyle: "italic" }}>{item.note}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
const contactIcons = {
  email: <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" /></svg>,
  linkedin: <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  phone: <svg width="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
};

function Contact({ t }) {
  const c = t.contact;
  const [ref1, v1] = useReveal();
  const [ref2, v2] = useReveal();
  return (
    <section id="contatti" style={{ padding: "6rem 4rem", background: "var(--dark)" }}>
      <SectionHeader num={c.sectionNum} title={c.sectionTitle} dark />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div ref={ref1} style={{ opacity: v1 ? 1 : 0, transform: v1 ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "var(--bg2)", lineHeight: 1.25 }}>
            {c.headline[0]}<br />
            {c.headline[1]}{c.headline[2] && <em style={{ fontStyle: "italic", color: "var(--accent)" }}>{c.headline[2]}</em>}<br />
            {c.headline[3]}
          </p>
        </div>
        <div ref={ref2} style={{ display: "flex", flexDirection: "column", gap: "0.9rem", opacity: v2 ? 1 : 0, transform: v2 ? "none" : "translateY(20px)", transition: "all 0.7s 0.15s ease" }}>
          {c.links.map((link, i) => (
            <a key={i} href={link.href} target={link.type === "linkedin" ? "_blank" : undefined} rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "1rem", padding: "1.1rem 1.4rem",
              border: "1px solid rgba(255,255,255,0.1)", color: "var(--dark-muted)",
              fontSize: "0.86rem", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--bg2)"; e.currentTarget.style.background = "rgba(74,127,191,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--dark-muted)"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ opacity: 0.6 }}>{contactIcons[link.type]}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{
      background: "var(--dark)", borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "1.8rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontSize: "0.72rem", color: "rgba(247,245,240,0.3)", letterSpacing: "0.06em" }}>{t.footer.left}</span>
      <span style={{ fontSize: "0.72rem", color: "rgba(247,245,240,0.3)", letterSpacing: "0.06em" }}>{t.footer.right}</span>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const [currentProject, setCurrentProject] = useState(null);
  const t = content[lang];

  return (
    <>
      <style>{theme}</style>
      <Nav lang={lang} setLang={setLang} page={page} setPage={setPage} t={t} />
      {page === "home" ? (
        <>
          <Hero t={t} />
          <About t={t} />
          <Experience t={t} />
          <Skills t={t} />
          <Projects t={t} setPage={setPage} setCurrentProject={setCurrentProject} />
          <Education t={t} />
          <Contact t={t} />
          <Footer t={t} />
        </>
      ) : (
        <>
          <ProjectPage project={currentProject} t={t} setPage={setPage} />
          <Footer t={t} />
        </>
      )}
    </>
  );
}
