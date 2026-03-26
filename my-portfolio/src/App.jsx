import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { name: "TypeScript", color: "#3178C6", icon: "typescript" },
  { name: "JavaScript", color: "#F7DF1E", img: "/images/js-logo.png" },
  { name: "Python", color: "#3776AB", img: "/images/python-logo.png" },
  { name: "Go", color: "#00ADD8", icon: "go" },
  { name: "React", color: "#61DAFB", icon: "react" },
  { name: "Next.js", color: "#ffffff", icon: "nextdotjs" },
  { name: "Firebase", color: "#FFCA28", icon: "firebase" },
  { name: "Tailwind", color: "#06B6D4", icon: "tailwindcss" },
  { name: "HTML/CSS", color: "#E34F26", img: "/images/html-logo.webp" },
  { name: "Java", color: "#ED8B00", img: "/images/java-logo.png" },
  { name: "Kotlin", color: "#7F52FF", img: "/images/kotlin-logo.png" },
  { name: "Git", color: "#F05032", icon: "git" },
  { name: "GCP", color: "#4285F4", icon: "googlecloud" },
  { name: "Stripe", color: "#635BFF", icon: "stripe" },
];

const TECH_EXP = [
  {
    role: "Software Engineer Intern",
    company: "Sport Sitters",
    period: "May - Aug 2025",
    location: "Tempe, AZ",
    bullets: [
      "Built and maintained a production-grade admin dashboard for a 2-sided marketplace using Next.js, TypeScript, and Firebase.",
      "Engineered an analytics module with revenue KPIs, geographic heatmaps, and CSV export used by the founding team daily.",
      "Integrated Stripe for payments, refunds, and payouts and implemented Firebase Auth for secure, role-based access.",
      "Shipped a real-time notification system and review feature using Firestore listeners and custom React hooks.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Stripe", "Leaflet.js"],
  },
  {
    role: "Software Engineer Intern",
    company: "Circle.ooo",
    period: "Sep 2024 - May 2025",
    location: "Tempe, AZ",
    bullets: [
      "Developed a real-time event host dashboard with event selection, live metrics, and profile views deployed on GCP.",
      "Consumed and integrated Go-based REST APIs and built context-based state management with custom hooks.",
      "Led sprint planning and stakeholder communication as Scrum Master across a 5-person team.",
      "Ensured WCAG accessibility and full mobile responsiveness across all components.",
    ],
    tags: ["Next.js", "React", "Go APIs", "GCP", "Firebase"],
  },
  {
    role: "IT Intern",
    company: "MDS TS",
    period: "May - Aug 2024",
    location: "Abu Dhabi & Dubai, UAE",
    bullets: [
      "Reduced ticket resolution time by triaging and routing system issues to the correct vendor teams.",
      "Improved overall system uptime by 15% through proactive hardware and software troubleshooting.",
      "Supported network administration by configuring hardware, maintaining connectivity, and documenting procedures.",
    ],
    tags: ["IT Support", "Networking", "Troubleshooting"],
  },
];

const LEADERSHIP_EXP = [
  {
    role: "Treasurer",
    company: "International Sun Devils (ISD)",
    period: "Jan - Nov 2025",
    location: "ASU",
    bullets: [
      "Managed all club financial operations including budgeting, reimbursements, and transaction processing.",
      "Ensured compliance with ASU financial policies and coordinated with university administrative offices.",
    ],
    tags: ["Finance", "Operations"],
  },
  {
    role: "Secretary",
    company: "IEEE Eta Kappa Nu (HKN)",
    period: "May 2024 - May 2025",
    location: "ASU",
    bullets: [
      "Maintained full records of all general and officer meetings.",
      "Managed newsletters and event notifications for a 100+ member chapter via email and Slack.",
    ],
    tags: ["Communication", "Organization"],
  },
  {
    role: "Industry Relations Officer",
    company: "IEEE Eta Kappa Nu (HKN)",
    period: "Sep 2023 - Apr 2024",
    location: "ASU",
    bullets: [
      "Planned and managed events with companies, speakers, and ASU organizations.",
      "Served as liaison connecting students with industry representatives and maintained the chapter resume book.",
    ],
    tags: ["Networking", "Event Planning"],
  },
  {
    role: "Gold Guide",
    company: "New Student Programs, ASU",
    period: "Jan - Oct 2023",
    location: "ASU",
    bullets: [
      "Guided incoming students through orientation, welcome events, and academic transition.",
      "Served as a university ambassador and reached out via email and SMS to help new students stay on track.",
    ],
    tags: ["Leadership", "Student Services"],
  },
];

const PROJECTS = [
  {
    title: "Roomana",
    year: "2025",
    tech: "Next.js · TypeScript · Firebase · Tailwind",
    description:
      "ASU-focused roommate platform with lifestyle-first matching, verified student onboarding, property discovery, and built-in housing reviews so finding a compatible roommate feels less random.",
    link: "https://roomana-app.vercel.app/",
    highlights: ["Lifestyle-first matching", "Verified ASU sign-in", "Housing reviews", "Serverless backend"],
    img: "/images/roomana.jpg",
    featured: true,
  },
  {
    title: "RunCycler",
    year: "2024",
    tech: "HTML · CSS · JavaScript",
    description:
      "Web app that tracks run and cycle routes in real time using the Geolocation API and an interactive Leaflet map.",
    link: "https://github.com/TathagatPanwar/RunCycler",
    highlights: ["Geolocation API", "Leaflet maps"],
    img: "/images/runcycler.jpg",
  },
  {
    title: "Record Keeper",
    year: "2023",
    tech: "Kotlin · Java",
    description:
      "Android app to log and review personal running and cycling records, with file-based persistence and an interactive history UI.",
    link: "https://github.com/TathagatPanwar/RecordKeeperApp",
    highlights: ["Android", "File persistence"],
    img: "/images/record_keeper.jpg",
  },
];

function useInView(threshold = 0.14) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SkillIcon({ icon, img, color, name }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = img ? img : `https://cdn.simpleicons.org/${icon}/${color.replace("#", "")}`;

  if (failed) {
    return <div className="skill-fallback" style={{ color }}>{name.slice(0, 2).toUpperCase()}</div>;
  }

  return (
    <div className="skill-icon-wrap">
      {!loaded && <div className="skill-skeleton" />}
      <img
        src={src}
        alt={name}
        className="skill-icon"
        style={{ display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expTab, setExpTab] = useState("tech");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ["about", "experience", "skills", "projects", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("access_key", "1072c49b-930a-45ce-814d-96b267aea9ca");
    await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
    setSubmitted(true);
  };

  const experiences = expTab === "tech" ? TECH_EXP : LEADERSHIP_EXP;

  return (
    <div id="top" className="page-shell">
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            TP
          </button>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                className={`nav-link${activeSection === link.href.slice(1) ? " active" : ""}`}
                onClick={() => goto(link.href)}
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            className={`ham${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="ham-stack">
              <span className="ham-bar" />
              <span className="ham-bar" />
              <span className="ham-bar" />
            </span>
          </button>
        </div>
      </nav>

      <div className={`mob-overlay${menuOpen ? " is-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link.href} className="mob-link" onClick={() => goto(link.href)}>
            {link.label}
          </button>
        ))}
      </div>

      <section id="about" className="hero">
        <div className="hero-inner">
          <Reveal>
            <div className="hero-copy">
              <div className="badge">
                <span className="badge-dot" />
                Open to full-time roles · May 2026
              </div>
              <div className="hero-kicker">Software engineer</div>
              <h1 className="hero-name">
                Tathagat
                <br />
                <em>Panwar.</em>
              </h1>
              <p className="hero-sub">
                I build polished, production-ready products with <strong>Next.js, TypeScript, Firebase, and strong product thinking</strong>.
                I enjoy turning messy ideas into clean, intuitive experiences that people actually want to use.
                A lot of my work sits at the intersection of engineering, design, and user experience, so I care just as much about clarity and usability as I do about the code underneath.
                Right now, I am especially interested in software engineering roles where I can ship thoughtful products, learn quickly, and have real ownership.
              </p>
              <div className="hero-btns">
                <a href="#projects" className="btn-p" onClick={(e) => { e.preventDefault(); goto("#projects"); }}>
                  See my work
                </a>
                <a href="https://github.com/Tathagat2112" target="_blank" rel="noopener noreferrer" className="btn-g">GitHub</a>
                <a href="https://linkedin.com/in/tathagatpanwar/" target="_blank" rel="noopener noreferrer" className="btn-g">LinkedIn</a>
              </div>
              <div className="stats">
                <div className="stat"><div className="stat-v">4.0</div><div className="stat-l">GPA · Summa Cum Laude</div></div>
                <div className="stat"><div className="stat-v">2</div><div className="stat-l">SWE internships</div></div>
                <a href="https://roomana.app" target="_blank" rel="noopener noreferrer" className="stat stat-link">
                  <div className="stat-link-arrow" aria-hidden="true">↗</div>
                  <div className="stat-v">300+</div>
                  <div className="stat-l">Visitors on Roomana</div>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="hero-visual">
              <div className="profile-card">
                <div className="profile-photo">
                  <img src="/images/headshot.jpeg" alt="Tathagat Panwar portrait" />
                </div>
                <div className="profile-meta">
                  <div className="profile-meta-copy">
                    <strong>Tathagat Panwar</strong>
                    <span>M.S. Computer Science · Arizona State University</span>
                  </div>
                  <div className="profile-badge">Ship fast</div>
                </div>
              </div>
              <div className="float-card one">
                <strong>Product-minded engineer</strong>
                <span>Designing useful things with polish</span>
              </div>
              <div className="float-card two">
                <strong>Open to SWE roles</strong>
                <span>Graduating in May 2026</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divr" />

      <section id="experience" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Experience</p>
            <h2 className="heading">Where I have built, led, and learned</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="exp-tabs">
              <button className={`exp-tab${expTab === "tech" ? " on" : ""}`} onClick={() => setExpTab("tech")}>
                Technical
              </button>
              <button className={`exp-tab${expTab === "leadership" ? " on" : ""}`} onClick={() => setExpTab("leadership")}>
                Leadership
              </button>
            </div>
          </Reveal>
          {experiences.map((exp, index) => (
            <Reveal key={`${expTab}-${exp.role}-${index}`} delay={index * 0.06}>
              <div className="exp-card">
                <div className="exp-top">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-co">{exp.company}</div>
                  </div>
                  <div>
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-loc">{exp.location}</div>
                  </div>
                </div>
                <ul className="exp-bul">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="etags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="etag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="divr" />

      <section id="skills" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Skills</p>
            <h2 className="heading">Tools I enjoy building with</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="sk-grid">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="sk-cell">
                  <SkillIcon icon={skill.icon} img={skill.img} color={skill.color} name={skill.name} />
                  <span className="sk-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divr" />

      <section id="projects" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Projects</p>
            <h2 className="heading">Selected work with real users and clear outcomes</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="proj-list">
              {PROJECTS.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-row"
                >
                  <div className="proj-thumb">
                    <img src={project.img} alt={project.title} />
                  </div>
                  <div className="proj-l">
                    <div className="proj-yr">{project.year}</div>
                    <div className="proj-title">
                      {project.title}
                      {project.featured && <span className="fbadge">Featured</span>}
                    </div>
                    <div className="proj-tech">{project.tech}</div>
                  </div>
                  <div className="proj-r">
                    <div className="proj-desc">{project.description}</div>
                    <div className="proj-hl">
                      {project.highlights.map((highlight) => (
                        <span key={highlight} className="phl">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="proj-arrow">↗</div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divr" />

      <section id="contact" className="sec">
        <div className="sec-inner">
          <div className="ct-grid">
            <Reveal>
              <p className="label">Contact</p>
              <h2 className="heading" style={{ marginBottom: 18 }}>
                Let&apos;s build something useful
              </h2>
              <p className="ct-blurb">
                I am graduating in May 2026 and actively looking for full-time software engineering roles. If you have an opportunity,
                a product idea, or just want to connect, I would love to hear from you.
              </p>
              <a href="mailto:panwartathagat@gmail.com" className="clink">
                <div className="clink-icon">✉</div>
                <div>
                  <div className="clink-lbl">panwartathagat@gmail.com</div>
                  <div className="clink-sub">Email</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/tathagatpanwar/" target="_blank" rel="noopener noreferrer" className="clink">
                <div className="clink-icon">in</div>
                <div>
                  <div className="clink-lbl">linkedin.com/in/tathagatpanwar</div>
                  <div className="clink-sub">LinkedIn</div>
                </div>
              </a>
              <a href="https://github.com/Tathagat2112" target="_blank" rel="noopener noreferrer" className="clink">
                <div className="clink-icon">{"</>"}</div>
                <div>
                  <div className="clink-lbl">github.com/Tathagat2112</div>
                  <div className="clink-sub">GitHub</div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              {submitted ? (
                <div className="ok-msg">
                  <div className="ok-icon">✓</div>
                  <div className="ok-title">Sent!</div>
                  <div className="ok-sub">I&apos;ll get back to you shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className="flabel">Name</label>
                  <input name="name" className="finput" placeholder="Your name" required />
                  <label className="flabel">Email</label>
                  <input name="email" type="email" className="finput" placeholder="you@example.com" required />
                  <label className="flabel">Message</label>
                  <textarea name="message" className="finput" placeholder="Tell me what you are building" required />
                  <input type="hidden" name="access_key" value="1072c49b-930a-45ce-814d-96b267aea9ca" />
                  <button type="submit" className="fsub">Send message →</button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <footer>
        Built by <span style={{ color: "#8fe7cf" }}>Tathagat Panwar</span> · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
