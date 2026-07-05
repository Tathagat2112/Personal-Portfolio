import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#credentials" },
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
      "Built and maintained a production-grade admin dashboard for a 2-sided marketplace using Next.js, TypeScript, and Firebase, used daily by the 4-person founding team.",
      "Engineered an analytics module surfacing 12+ revenue and engagement KPIs, geographic heatmaps, and CSV export.",
      "Integrated Stripe for payments, refunds, and payouts and implemented Firebase Auth with role-based access across 3 user types.",
      "Shipped a real-time notification and review system using Firestore listeners and custom React hooks, delivering updates in under a second.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Stripe", "Leaflet.js"],
  },
  {
    role: "Software Engineer Intern",
    company: "Circle.ooo",
    period: "Sep 2024 - May 2025",
    location: "Tempe, AZ",
    bullets: [
      "Developed a real-time event host dashboard with live metrics and profile views, deployed on GCP.",
      "Consumed and integrated 15+ Go-based REST endpoints and built context-based state management with custom hooks.",
      "Led sprint planning and stakeholder communication as Scrum Master across a 5-person team over 8+ two-week sprints.",
      "Ensured WCAG accessibility and full mobile responsiveness across 20+ shared components.",
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

const CERTIFICATIONS = [
  {
    title: "Bloomberg Finance Fundamentals",
    issuer: "Bloomberg for Education",
    issued: "June 2026",
    skills: ["Finance", "Financial Markets"],
    verificationUrl:
      "https://portal.bloombergforeducation.com/certificates/aUtqQFbhuVW9CSBCyBMnUEpC",
  },
  {
    title: "The Complete JavaScript Course 2025: From Zero to Expert!",
    issuer: "Udemy",
    issued: "January 2025",
    credentialId: "UC-55381798-c8a6-45a9-bf04-bb76b7512439",
    skills: ["JavaScript"],
    verificationUrl:
      "https://www.udemy.com/certificate/UC-55381798-c8a6-45a9-bf04-bb76b7512439/",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issued: "December 2024",
    credentialId: "tathagat21-rwd",
    skills: ["HTML", "CSS", "Responsive Design"],
    verificationUrl:
      "https://www.freecodecamp.org/certification/Tathagat21/responsive-web-design",
  },
  {
    title: "The Complete Android 13 App Development Bootcamp 2023",
    issuer: "Udemy",
    issued: "July 2023",
    credentialId: "UC-89fc76e7-8809-48a5-9e3c-5a8631736f4a",
    skills: ["Kotlin", "Java", "Android"],
    verificationUrl:
      "https://www.udemy.com/certificate/UC-89fc76e7-8809-48a5-9e3c-5a8631736f4a/",
  },
];

const PROJECTS = [
  {
    title: "Roomana",
    year: "2025",
    tech: "Next.js · TypeScript · Firebase · Tailwind",
    description:
      "A roommate-finding platform for ASU students. It matches people by lifestyle, verifies students when they sign up, lets you browse listings, and has reviews so you know what you're walking into. It's live with 35+ active users.",
    link: "https://roomana-app.vercel.app/",
    highlights: ["Lifestyle matching", "Verified ASU sign-in", "Housing reviews", "Serverless backend"],
    img: "/images/roomana.jpg",
    featured: true,
  },
  {
    title: "RunCycler",
    year: "2024",
    tech: "HTML · CSS · JavaScript",
    description:
      "A web app that tracks your runs and rides in real time using the Geolocation API and a Leaflet map.",
    link: "https://github.com/TathagatPanwar/RunCycler",
    highlights: ["Geolocation API", "Leaflet maps"],
    img: "/images/runcycler.jpg",
  },
  {
    title: "Record Keeper",
    year: "2023",
    tech: "Kotlin · Java",
    description:
      "An Android app for logging your runs and rides and looking back over them. It saves everything to a file and has a history screen you can scroll through.",
    link: "https://github.com/TathagatPanwar/RecordKeeperApp",
    highlights: ["Android", "File persistence"],
    img: "/images/record_keeper.jpg",
  },
];

const SPECS = [
  ["Academic", "M.S. Computer Science, Arizona State University. Summa Cum Laude, 2026"],
  ["Experience", "2 software engineering internships (Sport Sitters, Circle.ooo)"],
  ["Roomana", "Live, with 35+ active users"],
  ["Core stack", "Next.js, TypeScript, React, Firebase, GCP, Stripe"],
  ["Also comfortable with", "Python, Go, Java, Kotlin, Tailwind"],
  ["Availability", "Open to full-time roles"],
];

/* ------------------------------------------------------------------ helpers */

const ICON_SUN = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const ICON_SYSTEM = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const ICON_MOON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

function useInView(threshold = 0.18) {
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

const HIDDEN = {
  up: "translateY(30px)",
  left: "translateX(36px)",
  right: "translateX(-36px)",
  scale: "scale(0.95)",
};

function Reveal({ children, delay = 0, variant = "up", className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0) scale(1)" : HIDDEN[variant],
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ value, decimals = 0, suffix = "", duration = 1500 }) {
  const [ref, inView] = useInView(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let start;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = reduce ? 1 : Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function spotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function SkillIcon({ icon, img, color, name }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = img ? img : `https://cdn.simpleicons.org/${icon}/${color.replace("#", "")}`;

  if (failed) {
    return <div className="skill-fallback">{name.slice(0, 2).toUpperCase()}</div>;
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

/* interactive constellation behind the statement — reacts to the cursor */
function Constellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = [];
    const mouse = { x: -9999, y: -9999 };
    let W = 0;
    let H = 0;
    let raf = 0;
    let running = false;
    let t = 0;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const seed = () => {
      pts.length = 0;
      const n = Math.max(26, Math.min(78, Math.floor((W * H) / 17000)));
      for (let i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
        });
      }
    };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      // follow the cursor if present, otherwise a slow wandering point (keeps it alive on phones)
      const hasPointer = mouse.x > -1000;
      const fx = hasPointer ? mouse.x : W * (0.5 + 0.32 * Math.sin(t * 0.6) + 0.09 * Math.sin(t * 1.7));
      const fy = hasPointer ? mouse.y : H * (0.5 + 0.3 * Math.sin(t * 0.85 + 1) + 0.09 * Math.cos(t * 1.35));
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = fx - p.x;
        const dy = fy - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 150) {
          const f = ((150 - d) / 150) * 1.5;
          p.x -= (dx / d) * f;
          p.y -= (dy / d) * f;
        }
        p.x = Math.max(0, Math.min(W, p.x));
        p.y = Math.max(0, Math.min(H, p.y));
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 122) {
            ctx.strokeStyle = `rgba(200,164,90,${(1 - d / 122) * 0.26})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - fx, a.y - fy);
        if (dm < 180) {
          ctx.strokeStyle = `rgba(211,171,91,${(1 - dm / 180) * (hasPointer ? 0.5 : 0.34)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(fx, fy);
          ctx.stroke();
        }
      }
      for (const p of pts) {
        ctx.fillStyle = "rgba(211,171,91,0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      frame();
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };

    size();
    seed();

    if (reduce) {
      frame();
      stop();
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce) start();
        else stop();
      },
      { threshold: 0.04 },
    );
    io.observe(canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      size();
      seed();
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />;
}

/* ------------------------------------------------------- hidden terminal */

const BOOT = [
  { type: "out", html: '<span class="t-dim">tathagat-os · type </span><span class="t-g">help</span><span class="t-dim"> to explore, </span><span class="t-g">exit</span><span class="t-dim"> to close.</span>' },
];

const RESP = {
  help: 'commands: <span class="t-g">about</span> <span class="t-g">work</span> <span class="t-g">skills</span> <span class="t-g">experience</span> <span class="t-g">education</span> <span class="t-g">contact</span> <span class="t-g">resume</span> <span class="t-g">clear</span> <span class="t-g">exit</span>',
  about: "I'm a software engineer. I like taking rough ideas and getting them to something people can actually use. I mostly work with Next.js, TypeScript, and Firebase.",
  whoami: '<span class="t-c">tathagat_panwar</span>, software engineer. M.S. Computer Science at ASU.',
  work: '<span class="t-y">01</span> Roomana <span class="t-dim">(2025, Next.js/Firebase)</span>: ASU roommate platform, 35+ users<br><span class="t-y">02</span> RunCycler <span class="t-dim">(2024, JS/Leaflet)</span>: real-time route tracker<br><span class="t-y">03</span> Record Keeper <span class="t-dim">(2023, Kotlin)</span>: Android records app',
  skills: "TypeScript · JavaScript · Python · Go · React · Next.js · Firebase · Tailwind · Java · Kotlin · Git · GCP · Stripe",
  experience: 'SWE Intern · Sport Sitters <span class="t-dim">(2025)</span><br>SWE Intern · Circle.ooo <span class="t-dim">(2024–25)</span><br>IT Intern · MDS TS <span class="t-dim">(2024)</span>',
  education: 'M.S. Computer Science · Arizona State University · Summa Cum Laude · <span class="t-c">2026</span>',
  contact: 'email  <a href="mailto:panwartathagat@gmail.com">panwartathagat@gmail.com</a><br>github <a href="https://github.com/Tathagat2112" target="_blank" rel="noopener">github.com/Tathagat2112</a><br>lnkdn  <a href="https://linkedin.com/in/tathagatpanwar/" target="_blank" rel="noopener">linkedin.com/in/tathagatpanwar</a>',
  resume: "M.S. CS @ ASU · Summa Cum Laude · 2 SWE internships · shipped Roomana (35+ users). Open to full-time roles.",
  sudo: '<span class="t-y">nice try.</span> permission denied 😏',
  ls: '<span class="t-c">about.txt</span>  <span class="t-c">work/</span>  <span class="t-c">skills.json</span>  <span class="t-c">resume.pdf</span>  <span class="t-c">contact.md</span>',
};

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
}

function Console({ open, onClose }) {
  const [lines, setLines] = useState(BOOT);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  const run = (raw) => {
    const c = raw.trim().toLowerCase();
    const next = [...lines, { type: "in", html: escapeHtml(raw) }];
    if (c) {
      setHist([raw, ...hist]);
      setHi(-1);
    }
    if (c === "clear") {
      setLines(BOOT);
      return;
    }
    if (c === "exit" || c === "quit") {
      setLines(next);
      onClose();
      return;
    }
    if (!c) {
      setLines(next);
      return;
    }
    const key = c === "social" ? "contact" : c === "hire" ? "about" : c;
    if (RESP[key]) next.push({ type: "out", html: RESP[key] });
    else next.push({ type: "out", html: `<span class="t-y">command not found: ${escapeHtml(c)}</span>. try <span class="t-g">help</span>` });
    setLines(next);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(val);
      setVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hi < hist.length - 1) {
        const n = hi + 1;
        setHi(n);
        setVal(hist[n] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hi > 0) {
        const n = hi - 1;
        setHi(n);
        setVal(hist[n] || "");
      } else {
        setHi(-1);
        setVal("");
      }
    }
  };

  return (
    <div className={`console-wrap${open ? " open" : ""}`} onMouseDown={onClose}>
      <div className="console" onMouseDown={(e) => e.stopPropagation()}>
        <div className="console-bar">
          <span className="cdot r" onClick={onClose} role="button" aria-label="Close console" />
          <span className="cdot y" />
          <span className="cdot g" />
          <span className="console-title">tathagat@portfolio: ~</span>
        </div>
        <div className="console-body" ref={bodyRef} onClick={() => inputRef.current && inputRef.current.focus()}>
          {lines.map((l, i) =>
            l.type === "in" ? (
              <div key={i} className="c-line">
                <span className="c-ps">›</span>
                <span dangerouslySetInnerHTML={{ __html: l.html }} />
              </div>
            ) : (
              <div key={i} className="c-out" dangerouslySetInnerHTML={{ __html: l.html }} />
            ),
          )}
          <div className="c-line c-input">
            <span className="c-ps">›</span>
            <input
              ref={inputRef}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={onKey}
              autoComplete="off"
              spellCheck="false"
              aria-label="terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- main site */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expTab, setExpTab] = useState("tech");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [progress, setProgress] = useState(0);
  const [termOpen, setTermOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "system";
    } catch (err) {
      void err;
      return "system";
    }
  });
  const profileRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen || termOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, termOpen]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (err) {
      void err;
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      const ids = ["about", "work", "experience", "skills", "credentials", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // hidden terminal: backtick opens, escape closes (ignored while typing in a field)
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea";
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setTermOpen((v) => !v);
      } else if (e.key === "Escape") {
        setTermOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goto = (href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const onTiltMove = (e) => {
    const el = profileRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 7}deg`);
    el.style.setProperty("--rx", `${-py * 7}deg`);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const onTiltLeave = () => {
    const el = profileRef.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
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
    <div id="top" className="shell">
      <div className="progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="grain" aria-hidden="true" />

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Tathagat<span>Panwar</span>
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
          <div className="nav-right">
            <div className="theme-toggle" role="group" aria-label="Theme">
              <button type="button" className={`tt${theme === "light" ? " on" : ""}`} onClick={() => setTheme("light")} aria-label="Light theme" aria-pressed={theme === "light"} title="Light">{ICON_SUN}</button>
              <button type="button" className={`tt${theme === "system" ? " on" : ""}`} onClick={() => setTheme("system")} aria-label="Match system theme" aria-pressed={theme === "system"} title="System">{ICON_SYSTEM}</button>
              <button type="button" className={`tt${theme === "dark" ? " on" : ""}`} onClick={() => setTheme("dark")} aria-label="Dark theme" aria-pressed={theme === "dark"} title="Dark">{ICON_MOON}</button>
            </div>
            <button
              className={`ham${menuOpen ? " is-open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="ham-stack"><span className="ham-bar" /><span className="ham-bar" /><span className="ham-bar" /></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mob-overlay${menuOpen ? " is-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link.href} className="mob-link" onClick={() => goto(link.href)}>
            {link.label}
          </button>
        ))}
      </div>

      {/* HERO */}
      <section id="about" className="hero">
        <div className="hero-inner">
          <Reveal className="hero-copy">
            <div className="eyebrow">Software Engineer</div>
            <h1 className="hero-name">
              Tathagat<br /><em>Panwar.</em>
            </h1>
            <p className="tagline">Based in Tempe, Arizona.</p>
            <p className="hero-sub">
              I mostly work with <strong>Next.js, TypeScript, and Firebase</strong>. I like taking a rough idea and
              turning it into something people can actually use, and I pay as much attention to how it feels as to how it's built.
            </p>
            <div className="hero-btns">
              <a href="#work" className="btn-p" onClick={(e) => { e.preventDefault(); goto("#work"); }}>See my work</a>
              <a href="mailto:panwartathagat@gmail.com" className="btn-g">Get in touch</a>
            </div>
            <div className="stats">
              <div className="stat spot" onMouseMove={spotlight}>
                <div className="stat-v"><CountUp value={2} /></div>
                <div className="stat-l">SWE internships</div>
              </div>
              <div className="stat spot" onMouseMove={spotlight}>
                <div className="stat-v"><CountUp value={3} /></div>
                <div className="stat-l">Projects shipped</div>
              </div>
              <a href="https://roomana-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="stat stat-link spot" onMouseMove={spotlight}>
                <span className="stat-link-arrow" aria-hidden="true">↗</span>
                <div className="stat-v"><CountUp value={35} suffix="+" /></div>
                <div className="stat-l">Active users on Roomana</div>
              </a>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.1}>
            <div className="portrait tilt" ref={profileRef} onMouseMove={onTiltMove} onMouseLeave={onTiltLeave}>
              <div className="portrait-shine" aria-hidden="true" />
              <div className="portrait-img">
                <img src="/images/headshot.jpeg" alt="Tathagat Panwar" />
              </div>
              <div className="portrait-meta">
                <div>
                  <strong>Tathagat Panwar</strong>
                  <span>M.S. Computer Science · ASU</span>
                </div>
                <span className="portrait-tag">SWE</span>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* STATEMENT */}
      <section className="statement">
        <div className="pin">
          <Constellation />
          <div className="veil" aria-hidden="true" />
          <Reveal className="statement-content">
            <h2>I care about the design<br /><em>as much as the code.</em></h2>
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Selected Work</p>
            <h2 className="heading">Things I've built.</h2>
          </Reveal>
          <div className="work-list">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.06}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={`work${project.featured ? " feat" : ""} spot`} onMouseMove={spotlight}>
                  <div className="work-media">
                    <img src={project.img} alt={project.title} />
                  </div>
                  <div className="work-body">
                    <div className="work-top">
                      <span className="work-no">{String(i + 1).padStart(2, "0")}</span>
                      <span className="work-yr">{project.year}</span>
                      {project.featured && <span className="work-badge">Featured</span>}
                    </div>
                    <h3 className="work-title">{project.title}</h3>
                    <p className="work-tech">{project.tech}</p>
                    <p className="work-desc">{project.description}</p>
                    <div className="work-hl">
                      {project.highlights.map((h) => <span key={h}>{h}</span>)}
                    </div>
                    <span className="work-cta">View project <span aria-hidden="true">↗</span></span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="sec alt">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Experience</p>
            <h2 className="heading">Where I've worked so far.</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="exp-tabs">
              <button className={`exp-tab${expTab === "tech" ? " on" : ""}`} onClick={() => setExpTab("tech")}>Technical</button>
              <button className={`exp-tab${expTab === "leadership" ? " on" : ""}`} onClick={() => setExpTab("leadership")}>Leadership</button>
            </div>
          </Reveal>
          {experiences.map((exp, i) => (
            <Reveal key={`${expTab}-${exp.role}-${i}`} delay={i * 0.05} variant="left">
              <div className="exp">
                <div className="exp-head">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-co">{exp.company}</div>
                  </div>
                  <div className="exp-when">
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-loc">{exp.location}</div>
                  </div>
                </div>
                <ul className="exp-bul">
                  {exp.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="tagrow">
                  {exp.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Toolkit</p>
            <h2 className="heading">Tools I build with.</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="sk-grid">
              {SKILLS.map((s) => (
                <div key={s.name} className="sk-cell spot" onMouseMove={spotlight}>
                  <SkillIcon icon={s.icon} img={s.img} color={s.color} name={s.name} />
                  <span className="sk-name">{s.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CREDENTIALS + SPECS */}
      <section id="credentials" className="sec alt">
        <div className="sec-inner">
          <Reveal>
            <p className="label">Credentials</p>
            <h2 className="heading">Courses and certifications.</h2>
          </Reveal>
          <div className="cert-grid">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05} variant="scale">
                <article className="cert spot" onMouseMove={spotlight}>
                  <div className="cert-top">
                    <div className="cert-mark" aria-hidden="true">{c.issuer.slice(0, 1)}</div>
                    <div>
                      <div className="cert-issuer">{c.issuer}</div>
                      <div className="cert-issued">Issued {c.issued}</div>
                    </div>
                  </div>
                  <h3 className="cert-title">{c.title}</h3>
                  {c.credentialId && <p className="cert-id">Credential ID {c.credentialId}</p>}
                  <div className="cert-skills">{c.skills.map((s) => <span key={s}>{s}</span>)}</div>
                  <a href={c.verificationUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                    Verify credential <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h3 className="specs-h">At a glance.</h3>
          </Reveal>
          <div className="specs">
            {SPECS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.04}>
                <div className="spec-row">
                  <div className="spec-k">{k}</div>
                  <div className="spec-v">{v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec">
        <div className="sec-inner">
          <div className="ct-grid">
            <Reveal>
              <p className="label">Contact</p>
              <h2 className="heading" style={{ marginBottom: 20 }}>Let's talk.</h2>
              <p className="ct-blurb">
                I'm finishing my master's in computer science and looking for full-time software engineering roles. If you're
                hiring, have a project in mind, or just want to say hi, send me a note.
              </p>
              <a href="mailto:panwartathagat@gmail.com" className="clink spot" onMouseMove={spotlight}>
                <div className="clink-icon">✉</div>
                <div><div className="clink-lbl">panwartathagat@gmail.com</div><div className="clink-sub">Email</div></div>
              </a>
              <a href="https://linkedin.com/in/tathagatpanwar/" target="_blank" rel="noopener noreferrer" className="clink spot" onMouseMove={spotlight}>
                <div className="clink-icon">in</div>
                <div><div className="clink-lbl">linkedin.com/in/tathagatpanwar</div><div className="clink-sub">LinkedIn</div></div>
              </a>
              <a href="https://github.com/Tathagat2112" target="_blank" rel="noopener noreferrer" className="clink spot" onMouseMove={spotlight}>
                <div className="clink-icon">{"</>"}</div>
                <div><div className="clink-lbl">github.com/Tathagat2112</div><div className="clink-sub">GitHub</div></div>
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
                <form onSubmit={handleSubmit} className="ct-form">
                  <label className="flabel">Name</label>
                  <input name="name" className="finput" placeholder="Your name" required />
                  <label className="flabel">Email</label>
                  <input name="email" type="email" className="finput" placeholder="you@example.com" required />
                  <label className="flabel">Message</label>
                  <textarea name="message" className="finput" placeholder="Tell me what you're building" required />
                  <button type="submit" className="fsub">Send message →</button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <footer>
        <span>Built by Tathagat Panwar · 2025</span>
        <button className="console-trigger" onClick={() => setTermOpen(true)} aria-label="Open console">
          <span className="ct-caret">▸_</span>
        </button>
      </footer>

      <Console open={termOpen} onClose={() => setTermOpen(false)} />
    </div>
  );
}
