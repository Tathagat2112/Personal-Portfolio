import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// img = local file from /public/images/ (takes priority)
// icon = simple-icons CDN slug (fallback)
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
    period: "May – Aug 2025",
    location: "Tempe, AZ",
    bullets: [
      "Built and maintained a production-grade admin dashboard for a 2-sided marketplace using Next.js, TypeScript, and Firebase.",
      "Engineered an analytics module with revenue KPIs, geographic heatmaps (Leaflet.js), and CSV export — used by the founding team daily.",
      "Integrated Stripe for payments, refunds, and payouts; implemented Firebase Auth for secure, role-based access.",
      "Shipped a real-time notification system and review feature using Firestore listeners and custom React hooks.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Stripe", "Leaflet.js"],
  },
  {
    role: "Software Engineer Intern",
    company: "Circle.ooo",
    period: "Sep 2024 – May 2025",
    location: "Tempe, AZ",
    bullets: [
      "Developed a real-time event host dashboard (event selector, live metrics, profile views) deployed on GCP.",
      "Consumed and integrated Go-based REST APIs; built context-based state management with custom hooks.",
      "Led sprint planning and stakeholder communication as Scrum Master across a 5-person team.",
      "Ensured WCAG accessibility and full mobile responsiveness across all components.",
    ],
    tags: ["Next.js", "React", "Go APIs", "GCP", "Firebase"],
  },
  {
    role: "IT Intern",
    company: "MDS TS",
    period: "May – Aug 2024",
    location: "Abu Dhabi & Dubai, UAE",
    bullets: [
      "Reduced ticket resolution time by triaging and routing system issues to the correct vendor teams.",
      "Improved overall system uptime by 15% through proactive hardware and software troubleshooting.",
      "Supported network administration: configuring hardware, maintaining connectivity, and documenting procedures.",
    ],
    tags: ["IT Support", "Networking", "Troubleshooting"],
  },
];

const LEADERSHIP_EXP = [
  {
    role: "Treasurer",
    company: "International Sun Devils (ISD)",
    period: "Jan – Nov 2025",
    location: "ASU",
    bullets: [
      "Managed all club financial operations — budgeting, reimbursements, and transaction processing.",
      "Ensured compliance with ASU financial policies and coordinated with university administrative offices.",
    ],
    tags: ["Finance", "Operations"],
  },
  {
    role: "Secretary",
    company: "IEEE Eta Kappa Nu (HKN)",
    period: "May 2024 – May 2025",
    location: "ASU",
    bullets: [
      "Maintained full records of all General and Officer meetings.",
      "Managed newsletters and event notifications for 100+ member chapter via email and Slack.",
    ],
    tags: ["Communication", "Organization"],
  },
  {
    role: "Industry Relations Officer",
    company: "IEEE Eta Kappa Nu (HKN)",
    period: "Sep 2023 – Apr 2024",
    location: "ASU",
    bullets: [
      "Planned and managed events with companies, speakers, and ASU organizations.",
      "Served as liaison connecting students with industry representatives; maintained the chapter Resume Book.",
    ],
    tags: ["Networking", "Event Planning"],
  },
  {
    role: "Gold Guide",
    company: "New Student Programs, ASU",
    period: "Jan – Oct 2023",
    location: "ASU",
    bullets: [
      "Guided incoming students through orientation, welcome events, and academic transition.",
      "Served as a university ambassador; reached out via Email/SMS to help new students stay on track.",
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
      "ASU roommate matching platform with a lifestyle compatibility algorithm, housing reviews, and serverless backend. Onboarded 15 users and hit 300+ visitors within 2 weeks of launch.",
    link: "https://roomana-app.vercel.app/",
    highlights: [
      "300+ visitors in 2 weeks",
      "Serverless w/ Firestore",
      "Compatibility algorithm",
    ],
    img: "/images/roomana.jpg",
    featured: true,
  },
  {
    title: "RunCycler",
    year: "2024",
    tech: "HTML · CSS · JavaScript",
    description:
      "Web app that tracks run/cycle routes in real time using the Geolocation API and an interactive Leaflet map.",
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

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(18px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SKILL ICON ─────────────────────────────────────────────────────────── */
// Uses local /public/images/ file if `img` is provided, else simple-icons CDN
function SkillIcon({ icon, img, color, name }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);

  const src = img
    ? img
    : `https://cdn.simpleicons.org/${icon}/${color.replace("#", "")}`;

  const Fallback = () => (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 7,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: color + "18",
        border: `1px solid ${color}33`,
        fontSize: 11,
        fontWeight: 800,
        color,
        letterSpacing: "-0.5px",
      }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );

  if (err) return <Fallback />;

  return (
    <div style={{ width: 34, height: 34, position: "relative", flexShrink: 0 }}>
      {!ok && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 7,
            background: "#1a2744",
            animation: "skelPulse 1.4s ease infinite",
          }}
        />
      )}
      <img
        src={src}
        alt={name}
        style={{
          width: 34,
          height: 34,
          objectFit: "contain",
          display: ok ? "block" : "none",
        }}
        onLoad={() => setOk(true)}
        onError={() => {
          if (!img) setErr(true);
          else setErr(true);
        }}
      />
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expTab, setExpTab] = useState("tech");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Prevent background scroll when mobile menu is open
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
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    setSubmitted(true);
  };

  return (
    <div
      id="top"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; min-height: 100%; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        body { font-family: 'DM Sans', system-ui, sans-serif; background: #070c16; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; }
        ::selection { background: #00c9a730; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1a2744; border-radius: 99px; }

        @keyframes skelPulse {
          0%,100% { opacity: .35; }
          50%      { opacity: .7; }
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(.75); }
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          height: 68px; display: flex; align-items: center;
          padding: 0 clamp(18px, 5vw, 56px);
          transition: background .3s, border-color .3s;
        }
        .nav.scrolled {
          background: rgba(7,12,22,.92);
          backdrop-filter: blur(16px) saturate(1.5);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .nav-inner {
          width: 100%; max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo */
        .logo {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #00c9a7 0%, #4f8ef7 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-size: 16px; font-weight: 700;
          color: #070c16; letter-spacing: -.5px; cursor: pointer;
          flex-shrink: 0; user-select: none; border: none;
          transition: opacity .15s;
        }
        .logo:hover { opacity: .85; }

        /* Desktop nav links */
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-link {
          padding: 6px 13px; border-radius: 7px; font-size: 14px; font-weight: 500;
          color: #5a7390; cursor: pointer; border: none; background: none;
          transition: color .15s, background .15s; white-space: nowrap;
        }
        .nav-link:hover  { color: #c0cfe0; background: rgba(255,255,255,.05); }
        .nav-link.active { color: #00c9a7; }

        /* Hamburger */
        .ham {
          display: none;
          flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 40px; height: 40px;
          border: none; background: none; cursor: pointer;
          border-radius: 8px; padding: 6px;
          transition: background .15s;
        }
        .ham:hover { background: rgba(255,255,255,.06); }
        .ham-bar {
          width: 22px; height: 2px; background: #b8c4d8; border-radius: 99px;
          transform-origin: center;
          transition: transform .25s ease, opacity .25s ease, width .25s ease;
          display: block;
        }
        .ham.is-open .ham-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham.is-open .ham-bar:nth-child(2) { opacity: 0; width: 0; }
        .ham.is-open .ham-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile overlay */
        .mob-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(7,12,22,.97);
          backdrop-filter: blur(20px);
          display: none;
          flex-direction: column; justify-content: center; align-items: flex-start;
          padding: 0 clamp(28px, 8vw, 56px); gap: 6px;
        }
        .mob-overlay.is-open { display: flex; animation: menuSlide .2s ease; }

        .mob-link {
          font-family: 'Fraunces', serif;
          font-size: clamp(30px, 8vw, 52px);
          font-weight: 300; color: #2a3d54;
          border: none; background: none; cursor: pointer; text-align: left;
          padding: 6px 0; transition: color .15s;
        }
        .mob-link:hover { color: #00c9a7; }

        .mob-hire {
          margin-top: 28px; padding: 13px 28px; border-radius: 10px;
          background: rgba(0,201,167,.1); color: #00c9a7;
          border: 1px solid rgba(0,201,167,.28);
          font-size: 15px; font-weight: 600; cursor: pointer;
          text-decoration: none; display: inline-block;
          transition: background .15s;
        }
        .mob-hire:hover { background: rgba(0,201,167,.18); }

        /* Sections */
        .sec { padding: clamp(64px, 10vw, 120px) clamp(18px, 5vw, 56px); }
        .sec-inner { max-width: 1100px; margin: 0 auto; }

        .label {
          font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: #00c9a7; margin-bottom: 10px;
        }
        .heading {
          font-family: 'Fraunces', serif;
          font-size: clamp(30px, 5vw, 50px);
          font-weight: 700; line-height: 1.1; letter-spacing: -1.5px;
          color: #dde5f0; margin-bottom: 52px;
        }
        .divr { border: none; border-top: 1px solid rgba(255,255,255,.04); }

        /* Hero */
        .hero {
          min-height: 100svh; display: flex; flex-direction: column;
          justify-content: center;
          padding: 96px clamp(18px, 5vw, 56px) 64px;
        }
        .hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 12px 5px 8px; border-radius: 99px;
          background: rgba(0,201,167,.08); border: 1px solid rgba(0,201,167,.2);
          font-size: 12px; font-weight: 500; color: #00c9a7; margin-bottom: 22px;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00c9a7;
          animation: dotPulse 2s ease infinite;
        }

        .hero-name {
          font-family: 'Fraunces', serif;
          font-size: clamp(50px, 10vw, 100px);
          font-weight: 700; line-height: .95; letter-spacing: -3px;
          color: #dde5f0; margin-bottom: 22px;
        }
        .hero-name em {
          font-style: italic; font-weight: 300;
          background: linear-gradient(90deg, #00c9a7, #4f8ef7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        .hero-sub {
          font-size: clamp(15px, 2vw, 19px); color: #7a95b0;
          max-width: 500px; line-height: 1.75; margin-bottom: 36px;
        }
        .hero-sub strong { color: #a8bdd0; font-weight: 500; }

        .hero-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 60px; }

        .btn-p {
          padding: 12px 24px; border-radius: 9px; font-size: 14px; font-weight: 600;
          background: linear-gradient(135deg, #00c9a7, #4f8ef7);
          color: #070c16; border: none; cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          transition: opacity .15s, transform .15s;
        }
        .btn-p:hover { opacity: .85; transform: translateY(-1px); }

        .btn-g {
          padding: 12px 24px; border-radius: 9px; font-size: 14px; font-weight: 600;
          background: rgba(255,255,255,.04); color: #6a85a0;
          border: 1px solid rgba(255,255,255,.1);
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          transition: background .15s, color .15s, transform .15s;
        }
        .btn-g:hover { background: rgba(255,255,255,.08); color: #b8c4d8; transform: translateY(-1px); }

        .stats { display: flex; gap: 0; flex-wrap: wrap; }
        .stat {
          padding: 0 36px 0 0; margin-right: 36px;
          border-right: 1px solid rgba(255,255,255,.05);
        }
        .stat:last-child { border-right: none; }
        .stat-v {
          font-family: 'Fraunces', serif; font-size: 34px; font-weight: 700;
          color: #dde5f0; letter-spacing: -1.5px; line-height: 1;
        }
        .stat-l { font-size: 12px; color: #4a6580; margin-top: 5px; font-weight: 500; }

        /* Experience */
        .exp-tabs {
          display: flex; gap: 0; margin-bottom: 36px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .exp-tab {
          padding: 10px 20px; font-size: 14px; font-weight: 600; color: #2a3d54;
          cursor: pointer; border: none; background: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: color .15s, border-color .15s;
        }
        .exp-tab.on { color: #dde5f0; border-bottom-color: #00c9a7; }
        .exp-tab:hover:not(.on) { color: #5a7390; }

        .exp-card { padding: 26px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
        .exp-card:last-child { border-bottom: none; }

        .exp-top {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 4px 16px; margin-bottom: 12px;
        }
        .exp-role { font-size: 16px; font-weight: 700; color: #c8d8ea; }
        .exp-co   { font-size: 13px; color: #00c9a7; margin-top: 3px; }
        .exp-period { font-size: 12px; color: #4a6580; text-align: right; }
        .exp-loc    { font-size: 11px; color: #3a5270; margin-top: 2px; text-align: right; }

        .exp-bul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .exp-bul li {
          font-size: 13.5px; color: #6a85a0; line-height: 1.65;
          padding-left: 16px; position: relative;
        }
        .exp-bul li::before {
          content: "–"; position: absolute; left: 0;
          color: #2a3d54; top: 1px;
        }
        .etags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
        .etag {
          padding: 2px 9px; border-radius: 5px; font-size: 11px; font-weight: 600;
          background: rgba(79,142,247,.08); color: #4f8ef7;
          border: 1px solid rgba(79,142,247,.15);
        }

        /* Skills */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
          border: 1px solid rgba(255,255,255,.05); border-radius: 14px;
          overflow: hidden; gap: 1px; background: rgba(255,255,255,.05);
        }
        .sk-cell {
          display: flex; align-items: center; gap: 12px;
          padding: 18px 20px; background: #070c16;
          transition: background .15s;
        }
        .sk-cell:hover { background: rgba(0,201,167,.04); }
        .sk-name { font-size: 13px; font-weight: 600; color: #5a7390; }

        /* Projects */
        .proj-thumb {
          width: 88px; height: 62px; border-radius: 8px;
          overflow: hidden; flex-shrink: 0; align-self: center;
          border: 1px solid rgba(255,255,255,.06);
        }
        .proj-list {
          border: 1px solid rgba(255,255,255,.05); border-radius: 14px;
          overflow: hidden; display: flex; flex-direction: column; gap: 1px;
          background: rgba(255,255,255,.05);
        }
        .proj-row {
          display: flex; align-items: flex-start; gap: 24px;
          padding: 28px 28px; background: #070c16;
          text-decoration: none; color: inherit;
          transition: background .15s; flex-wrap: wrap;
        }
        .proj-row:hover { background: #0b1120; }

        .proj-l { min-width: 180px; flex-shrink: 0; }
        .proj-yr { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #3a5270; text-transform: uppercase; margin-bottom: 5px; }
        .proj-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #c8d8ea; margin-bottom: 5px; }
        .proj-tech  { font-size: 12px; color: #4a6580; }

        .proj-r { flex: 1; min-width: 220px; }
        .proj-desc { font-size: 13.5px; color: #6a85a0; line-height: 1.7; margin-bottom: 10px; }
        .proj-hl { display: flex; gap: 6px; flex-wrap: wrap; }
        .phl {
          padding: 2px 9px; border-radius: 5px; font-size: 11px; font-weight: 600;
          background: rgba(0,201,167,.07); color: #00c9a7;
          border: 1px solid rgba(0,201,167,.15);
        }
        .fbadge {
          display: inline-block; margin-left: 9px; padding: 2px 7px; border-radius: 4px;
          font-size: 9px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          background: rgba(0,201,167,.1); color: #00c9a7;
          border: 1px solid rgba(0,201,167,.2); vertical-align: middle;
          position: relative; top: -2px; font-family: 'DM Sans', sans-serif;
        }
        .proj-arrow {
          font-size: 17px; color: #1a2a40; align-self: center; flex-shrink: 0;
          transition: color .15s, transform .15s;
        }
        .proj-row:hover .proj-arrow { color: #00c9a7; transform: translate(2px,-2px); }

        /* Contact */
        .ct-grid {
          display: grid; grid-template-columns: 1fr 1.1fr; gap: 72px; align-items: start;
        }
        .ct-blurb { font-size: 15px; color: #6a85a0; line-height: 1.8; margin-bottom: 36px; }

        .clink {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,.04);
          text-decoration: none; color: inherit; transition: all .15s;
        }
        .clink:last-of-type { border-bottom: none; }
        .clink-icon {
          width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.06);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: #2a3d54; transition: all .15s;
        }
        .clink:hover .clink-icon { background: rgba(0,201,167,.1); border-color: rgba(0,201,167,.25); color: #00c9a7; }
        .clink-lbl { font-size: 13.5px; font-weight: 500; color: #5a7390; }
        .clink:hover .clink-lbl { color: #00c9a7; }
        .clink-sub { font-size: 11px; color: #3a5270; margin-top: 1px; }

        .flabel { display: block; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #4a6580; margin-bottom: 7px; }
        .finput {
          width: 100%; padding: 12px 15px; border-radius: 9px; margin-bottom: 13px;
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
          color: #c8d8ea; font-size: 14px; font-family: inherit; outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .finput:focus {
          border-color: rgba(0,201,167,.35);
          box-shadow: 0 0 0 3px rgba(0,201,167,.06);
        }
        .finput::placeholder { color: #3a5270; }
        textarea.finput { resize: vertical; min-height: 108px; }

        .fsub {
          width: 100%; padding: 13px; border-radius: 9px; font-size: 14px; font-weight: 700;
          background: linear-gradient(135deg, #00c9a7, #4f8ef7);
          color: #070c16; border: none; cursor: pointer; font-family: inherit;
          transition: opacity .15s, transform .15s;
        }
        .fsub:hover { opacity: .85; transform: translateY(-1px); }

        .ok-msg {
          padding: 40px 32px; border-radius: 13px; text-align: center;
          background: rgba(0,201,167,.06); border: 1px solid rgba(0,201,167,.18);
          color: #00c9a7;
        }
        .ok-icon  { font-size: 32px; margin-bottom: 10px; }
        .ok-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; margin-bottom: 6px; }
        .ok-sub   { font-size: 13px; color: #3d5570; }

        footer {
          padding: 26px clamp(18px, 5vw, 56px);
          border-top: 1px solid rgba(255,255,255,.04);
          text-align: center; font-size: 12px; color: #1a2a40;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .nav-links, .nav-hire { display: none !important; }
          .ham { display: flex !important; }
          .ct-grid { grid-template-columns: 1fr; gap: 44px; }
          .proj-row { flex-direction: column; gap: 14px; }
          .proj-r   { min-width: 0; }
          .proj-arrow { display: none; }
          .proj-thumb { width: 100%; height: 140px; }
        }
        @media (max-width: 520px) {
          .exp-top { flex-direction: column; }
          .exp-period, .exp-loc { text-align: left; }
          .stats { gap: 20px; flex-direction: row; }
          .stat { padding-right: 20px; margin-right: 20px; }
        }
      `}</style>

      {/* ══ NAV ════════════════════════════════════════════════════════════ */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <button
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            TP
          </button>

          {/* Desktop links */}
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                className={`nav-link${activeSection === l.href.slice(1) ? " active" : ""}`}
                onClick={() => goto(l.href)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Hamburger */}
            <button
              className={`ham${menuOpen ? " is-open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="ham-bar" />
              <span className="ham-bar" />
              <span className="ham-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* ══ MOBILE OVERLAY ══════════════════════════════════════════════════ */}
      <div className={`mob-overlay${menuOpen ? " is-open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <button
            key={l.href}
            className="mob-link"
            onClick={() => goto(l.href)}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section id="about" className="hero">
        <div className="hero-inner">
          <div className="badge">
            <span className="badge-dot" />
            Open to full-time roles · May 2026
          </div>

          <h1 className="hero-name">
            Tathagat
            <br />
            <em>Panwar.</em>
          </h1>

          <p className="hero-sub">
            <strong>Full-stack engineer</strong> pursuing M.S. CS at Arizona
            State University. I build production-ready apps with{" "}
            <strong>Next.js, TypeScript &amp; Firebase</strong>.
          </p>

          <div className="hero-btns">
            <a
              href="#projects"
              className="btn-p"
              onClick={(e) => {
                e.preventDefault();
                goto("#projects");
              }}
            >
              See my work
            </a>
            <a
              href="https://github.com/TathagatPanwar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-g"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tathagatpanwar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-g"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-v">4.0</div>
              <div className="stat-l">GPA · Summa Cum Laude</div>
            </div>
            <div className="stat">
              <div className="stat-v">2</div>
              <div className="stat-l">SWE Internships</div>
            </div>
            <div className="stat">
              <div className="stat-v">300+</div>
              <div className="stat-l">Visitors on Roomana</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divr" />

      {/* ══ EXPERIENCE ══════════════════════════════════════════════════════ */}
      <section id="experience" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Experience</p>
            <h2 className="heading">Where I've worked</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="exp-tabs">
              <button
                className={`exp-tab${expTab === "tech" ? " on" : ""}`}
                onClick={() => setExpTab("tech")}
              >
                Technical
              </button>
              <button
                className={`exp-tab${expTab === "leadership" ? " on" : ""}`}
                onClick={() => setExpTab("leadership")}
              >
                Leadership
              </button>
            </div>
          </Reveal>
          {(expTab === "tech" ? TECH_EXP : LEADERSHIP_EXP).map((exp, i) => (
            <Reveal key={`${expTab}-${i}`} delay={i * 0.06}>
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
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <div className="etags">
                  {exp.tags.map((t) => (
                    <span key={t} className="etag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="divr" />

      {/* ══ SKILLS ══════════════════════════════════════════════════════════ */}
      <section id="skills" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Skills</p>
            <h2 className="heading">Technologies</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="sk-grid">
              {SKILLS.map((s) => (
                <div key={s.name} className="sk-cell">
                  <SkillIcon
                    icon={s.icon}
                    img={s.img}
                    color={s.color}
                    name={s.name}
                  />
                  <span className="sk-name">{s.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divr" />

      {/* ══ PROJECTS ════════════════════════════════════════════════════════ */}
      <section id="projects" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Projects</p>
            <h2 className="heading">Things I've built</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="proj-list">
              {PROJECTS.map((p, i) => (
                <a
                  key={i}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-row"
                >
                  {p.img && (
                    <div className="proj-thumb">
                      <img
                        src={p.img}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  )}
                  <div className="proj-l">
                    <div className="proj-yr">{p.year}</div>
                    <div className="proj-title">
                      {p.title}
                      {p.featured && <span className="fbadge">Featured</span>}
                    </div>
                    <div className="proj-tech">{p.tech}</div>
                  </div>
                  <div className="proj-r">
                    <div className="proj-desc">{p.description}</div>
                    <div className="proj-hl">
                      {p.highlights.map((h) => (
                        <span key={h} className="phl">
                          {h}
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

      {/* ══ CONTACT ═════════════════════════════════════════════════════════ */}
      <section id="contact" className="sec">
        <div className="sec-inner">
          <div className="ct-grid">
            <Reveal>
              <p className="label">Contact</p>
              <h2 className="heading" style={{ marginBottom: 18 }}>
                Let's talk
              </h2>
              <p className="ct-blurb">
                Graduating May 2026 and actively looking for full-time SWE
                roles. Have an opportunity, a project idea, or just want to say
                hi? My inbox is open.
              </p>
              <a href="mailto:panwartathagat@gmail.com" className="clink">
                <div className="clink-icon">✉</div>
                <div>
                  <div className="clink-lbl">panwartathagat@gmail.com</div>
                  <div className="clink-sub">Email</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/tathagatpanwar/"
                target="_blank"
                rel="noopener noreferrer"
                className="clink"
              >
                <div
                  className="clink-icon"
                  style={{ fontWeight: 800, fontSize: 12, fontFamily: "serif" }}
                >
                  in
                </div>
                <div>
                  <div className="clink-lbl">
                    linkedin.com/in/tathagatpanwar
                  </div>
                  <div className="clink-sub">LinkedIn</div>
                </div>
              </a>
              <a
                href="https://github.com/TathagatPanwar"
                target="_blank"
                rel="noopener noreferrer"
                className="clink"
              >
                <div className="clink-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="clink-lbl">github.com/TathagatPanwar</div>
                  <div className="clink-sub">GitHub</div>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              {submitted ? (
                <div className="ok-msg">
                  <div className="ok-icon">✓</div>
                  <div className="ok-title">Sent!</div>
                  <div className="ok-sub">I'll get back to you shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className="flabel">Name</label>
                  <input
                    name="name"
                    className="finput"
                    placeholder="Your name"
                    required
                  />
                  <label className="flabel">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="finput"
                    placeholder="you@example.com"
                    required
                  />
                  <label className="flabel">Message</label>
                  <textarea
                    name="message"
                    className="finput"
                    placeholder="What's up?"
                    required
                  />
                  <input
                    type="hidden"
                    name="access_key"
                    value="1072c49b-930a-45ce-814d-96b267aea9ca"
                  />
                  <button type="submit" className="fsub">
                    Send message →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <footer>
        Built by <span style={{ color: "#00c9a7" }}>Tathagat Panwar</span> ·{" "}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}
