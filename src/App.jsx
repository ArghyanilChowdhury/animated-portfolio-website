import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail, Phone, MapPin, Github, Linkedin, Send, GraduationCap,
  Award, Cloud, Server, Boxes, Shield, Terminal, Cpu, Sun, Moon, Filter
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* =========================
   Typewriter (looping) for HERO subtitle
   ========================= */
function TypewriterLoop({ texts, typingSpeed = 100, deletingSpeed = 50, delay = 1500 }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= texts.length) return;

    if (!deleting && subIndex === texts[index].length) {
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex(prev => (prev + 1) % texts.length);
      return;
    }

    const id = setTimeout(() => {
      setSubIndex(prev => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(id);
  }, [subIndex, index, deleting, texts, typingSpeed, deletingSpeed, delay]);

  useEffect(() => {
    setDisplayed(texts[index].substring(0, subIndex));
  }, [subIndex, index, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

/* =========================
   Typewriter-on-scroll (once) for SUMMARY paragraph
   ========================= */
function useEnterOnce(options) {
  const ref = React.useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!ref.current || entered) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setEntered(true);
        obs.disconnect();
      }
    }, options || { threshold: 0.3 });

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [entered, options]);

  return { ref, entered };
}

function TypewriterOnView({ text = "", speed = 70, className = "" }) {
  const { ref, entered } = useEnterOnce({ threshold: 0.3 });
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!entered) return;

    let i = 0;
    setOut("");

    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [entered, text, speed]);

  return (
    <p ref={ref} className={className}>
      {out}
      <span className="type-cursor" />
    </p>
  );
}

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const pref = localStorage.getItem("theme");
    if (pref) return pref === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return [dark, setDark];
}

function Skill({ name, level, icon: Icon }) {
  return (
    <motion.div variants={fadeUp} className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5" />
        <p className="font-medium">{name}</p>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
        />
      </div>
      <p className="text-xs mt-1 text-gray-500">{level}%</p>
    </motion.div>
  );
}


/* =========================
   Education Roadmap (Scroll-based glowing path)
   ========================= */


/* =========================
   Project Cards
   ========================= */
function Projects() {
  const projects = [
    {
      title: "Service Ninja",
      tag: "Web",
      img: "/service-ninja.png",
      description:
        "A dynamic service management platform built with PHP and MySQL. It supports user registration with email and phone verification via OTP, CRUD operations, testimonial management, and career application submission with CV upload functionality.",
      github: "https://github.com/ArghyanilChowdhury/Service-Ninja",
    },
    {
      title: "Steganography Tool",
      tag: "Python",
      img: "/steganography.png",
      description:
        "A Python-based GUI tool that hides secret text messages inside images using the LSB algorithm. Built with Tkinter for easy use, supporting image selection, encoding, and decoding processes with instant previews.",
      github: "https://github.com/ArghyanilChowdhury/Steganography-Tool",
    },
    {
      title: "Employee Management System",
      tag: "Python",
      img: "/ems.png",
      description:
        "An Employee Management desktop application using Python and MySQL that allows HR teams to manage employee data efficiently. Supports add, update, delete, and search operations with a clean GUI built using Tkinter.",
      github: "https://github.com/ArghyanilChowdhury/Employee-Management-System",
    },
    {
      title: "Weather Data Tracking",
      tag: "Linux",
      img: "/weather.png",
      description:
        "A Linux-based shell project that fetches, analyzes, and displays weather data from APIs. It supports sorting and filtering based on multiple parameters like temperature, humidity, and date range.",
      github: "https://github.com/ArghyanilChowdhury/Weather-Tracking-System",
    },
    {
      title: "Pathfinding Algorithm Visualizer Tool",
      tag: "Python",
      img: "/pvt.png",
      description:
        "A Python visualization tool that demonstrates popular pathfinding algorithms like Dijkstra’s and A*. Provides grid-based animation for understanding how each algorithm explores nodes step by step.",
      github: "https://github.com/ArghyanilChowdhury/Pathfinding-Visualizer",
    },
    {
      title: "Quiz Management System",
      tag: "Web",
      img: "/qms.png",
      description:
        "A web-based quiz platform where users can create, participate, and evaluate quizzes. Developed using HTML, CSS, JavaScript, and PHP with a MySQL backend for real-time data handling.",
      github: "https://github.com/ArghyanilChowdhury/Quiz-Management-System",
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-800 relative">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl font-semibold text-center text-teal-700 dark:text-teal-400 mb-10">
          Projects Gallery
        </h2>

        {/* Project Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {projects.map((proj) => (
            <motion.div
              key={proj.title}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              onClick={() => setSelected(proj)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              <img
                src={proj.img}
                alt={proj.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 p-4 text-white opacity-0 group-hover:opacity-100 transition">
                <h3 className="font-semibold text-lg">{proj.title}</h3>
                <p className="text-xs">{proj.tag}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Popup Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
              >
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-teal-600 mb-2">
                  {selected.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                  {selected.description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium shadow-md transition"
                  >
                    View on GitHub
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}



function EducationRoadmap() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Smooth scroll animation with spring
  const pathProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  // Control glowing height dynamically
  const glowHeight = useTransform(pathProgress, [0, 1], ["0%", "100%"]);

  const roadmap = [
    {
      id: "01",
      side: "left",
      title: "MCA – Cloud Computing & DevOps",
      place: "Chandigarh University",
      year: "07/2024 – Present",
      desc: "Currently pursuing MCA specialization in Cloud Computing & DevOps with hands-on experience in Azure and AWS.",
      grade: "CGPA 7.41/10",
      start: 0.00,
      end: 0.25,
    },
    {
      id: "02",
      side: "right",
      title: "BCA",
      place: "Dr. B.C. Roy Academy",
      year: "06/2021 – 06/2024",
      desc: "Graduated with strong foundation in computer science, programming, and database management.",
      grade: "CGPA 8.56/10",
      start: 0.25,
      end: 0.50,
    },
    {
      id: "03",
      side: "left",
      title: "Class XII",
      place: "Hem Sheela Model School",
      year: "2019 – 2020",
      desc: "Completed Higher Secondary education with focus on science and computer fundamentals.",
      grade: "84%",
      start: 0.50,
      end: 0.75,
    },
    {
      id: "04",
      side: "right",
      title: "Class X",
      place: "Hem Sheela Model School",
      year: "2017 – 2018",
      desc: "Completed Secondary education with excellent academic performance.",
      grade: "80.2%",
      start: 0.75,
      end: 1.0,
    },
  ];

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-32 bg-gray-900 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-teal-400 mb-24">
          Education Roadmap
        </h2>

{/* ===== Vertical Line & Neon Glow Path (Clean Centered Version) ===== */}
<div className="relative flex justify-center">
  {/* Base static line */}
  <div className="absolute top-0 bottom-0 w-[4px] bg-gray-700/40 rounded-full" />

  {/* Pure neon glowing path (no fade, perfectly aligned) */}
  <motion.div
    style={{ height: glowHeight }}
    className="absolute top-0 w-[4px] rounded-full bg-teal-400 shadow-[0_0_30px_8px_rgba(45,212,191,0.9),_0_0_60px_15px_rgba(16,185,129,0.7)]"
  />

  {/* Timeline Nodes + Boxes */}
  <div className="w-full relative flex flex-col items-center space-y-32">
    {roadmap.map((edu) => {
      const nodeActive = useTransform(pathProgress, [edu.start, edu.end], [0, 1]);
      return (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`relative flex flex-col md:flex-row items-center w-full ${
            edu.side === "left"
              ? "md:justify-start md:pr-[55%]"
              : "md:justify-end md:pl-[55%]"
          }`}
        >
          {/* Centered glowing node (no offset, perfectly vertical) */}
          <motion.div
  style={{
    scale: useTransform(nodeActive, [0, 1], [1, 1.25]),
    boxShadow: useTransform(
      nodeActive,
      [0, 1],
      [
        "0 0 0px rgba(45,212,191,0)",
        "0 0 40px rgba(45,212,191,1), 0 0 80px rgba(16,185,129,0.7)",
      ]
    ),
    background: useTransform(
      nodeActive,
      [0, 1],
      [
        "linear-gradient(to bottom right, #14f1c8, #0de6a6)",
        "linear-gradient(to bottom right, #5effe0, #00ffb3)",
      ]
    ),
    left: "calc(47.5% - 2px)", // visually centers considering outline width
    transform: "translateX(-50%)",
  }}
  className="absolute w-14 h-14 flex items-center justify-center text-white text-lg font-semibold rounded-full outline outline-[4px] outline-white z-10 shadow-[0_0_20px_rgba(45,212,191,0.8)]"
>
  {edu.id}
</motion.div>


          {/* Box glow appears when node reached */}
          <motion.div
            style={{
              borderColor: useTransform(
                nodeActive,
                [0, 1],
                ["rgba(255,255,255,0.1)", "rgba(94,234,212,0.9)"]
              ),
              boxShadow: useTransform(
                nodeActive,
                [0, 1],
                [
                  "0 0 0px rgba(45,212,191,0)",
                  "0 0 50px rgba(45,212,191,0.8), 0 0 90px rgba(16,185,129,0.5)",
                ]
              ),
            }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-md border border-gray-700 p-6 rounded-2xl max-w-md"
          >
            <h3 className="text-2xl font-semibold text-teal-300 mb-1">
              {edu.title}
            </h3>
            <p className="text-sm text-gray-400 mb-1">
              {edu.year} • {edu.place}
            </p>
            <p className="text-sm text-gray-300">{edu.desc}</p>
            <p className="text-md text-emerald-400 mt-2 font-medium">
              {edu.grade}
            </p>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</div>

      </div>
    </section>
  );
}

/* =========================
   Flip Card Component
   ========================= */
function FlipCard({ frontTitle, company, period, bullets }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-64 cursor-pointer perspective-1000"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`card-inner ${flipped ? "rotate-y-180" : ""}`}
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT SIDE */}
        <div className="card-front bg-white/10 dark:bg-gray-800/80 backdrop-blur-md border border-teal-400 text-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-teal-300">
              {frontTitle}
            </h3>
            <p className="text-gray-400">{company}</p>
          </div>
          <p className="text-right text-sm italic text-gray-400">Click Me</p>
        </div>

        {/* BACK SIDE */}
        <div className="card-back bg-[rgba(11,18,32,0.95)] border border-teal-400 text-white p-6 rounded-2xl">
          <p className="text-sm text-gray-400 mb-3">{period}</p>
          <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


/* =========================
   Main App
   ========================= */
export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [dark, setDark] = useDarkMode();

  const onNav = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 👇 add this near your other state declarations
const [loading, setLoading] = useState(false);
const [popupMessage, setPopupMessage] = useState("");
const [popupVisible, setPopupVisible] = useState(false);

const handleChange = (e) =>
  setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setPopupVisible(false);

  try {
    const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

    console.log("Email sent successfully:", result.text);
    setPopupMessage("✅ Message Sent Successfully!");
    setPopupVisible(true);
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("Email send failed:", error.text);
    setPopupMessage("❌ Failed to Send Message. Please Try Again!");
    setPopupVisible(true);
  } finally {
    setLoading(false);
    // Auto-hide popup after 3 seconds
    setTimeout(() => setPopupVisible(false), 3000);
  }
};



  return (
    <div className="min-h-screen bg-[#0b1220] dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative transition-colors">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-gray-800/60 border-b border-white/30 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <a href="#home" onClick={onNav("#home")} className="font-semibold text-teal-700 dark:text-teal-400">Arghyanil</a>
          <ul className="flex items-center gap-6 text-sm">
            {[["Summary","#summary"],["Education","#education"],["Experience","#experience"],["Skills","#skills"],["Projects","#projects"],["Achievements","#achievements"],["Contact","#contact"]].map(([label,id])=>(
              <li key={id}><a href={id} onClick={onNav(id)} className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">{label}</a></li>
            ))}
            <li>
              <button onClick={()=>setDark(!dark)} aria-label="Toggle color theme" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                {dark ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="relative">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 grid md:grid-cols-[1.2fr,1fr] items-center gap-10">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-tight">Arghyanil Chowdhury</motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg md:text-xl text-emerald-100 font-mono">
              <TypewriterLoop
                texts={[
                  "DevOps Enthusiast",
                  "Full Stack Developer",
                  "Cloud Practitioner",
                  "Tech Learner"
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                delay={1500}
              />
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" onClick={onNav("#contact")} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-500 text-white shadow hover:shadow-lg transition">Contact Me <Send className="w-4 h-4"/></a>
              <a href="https://www.linkedin.com/in/arghyanil-chowdhury/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 border hover:bg-gray-50 dark:hover:bg-gray-700"><Linkedin className="w-4 h-4"/>LinkedIn</a>
              <a href="https://github.com/ArghyanilChowdhury" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 border hover:bg-gray-50 dark:hover:bg-gray-700"><Github className="w-4 h-4"/>GitHub</a>
            </motion.div>
          </motion.div>

          {/* Profile Image with dashed orbiting rings (anti-clockwise) */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative flex items-center justify-center">
            <div className="relative w-60 h-60">
              {/* outer dashed ring */}
              <div className="absolute inset-[-10px] ring-dashed ring-emerald animate-spin-reverse"></div>
              {/* inner dashed ring with different speed */}
              <div className="absolute inset-[-22px] ring-dashed ring-teal animate-spin-reverse" style={{animationDuration:'20s'}}></div>
              <img src="/profile.jpg" alt="Arghyanil Chowdhury" className="w-full h-full object-cover object-top rounded-full shadow-xl border-4 border-white dark:border-gray-900" />
            </div>
          </motion.div>
        </div>
      </header>

      {/* SUMMARY — stacked layout with typewriter-on-scroll */}
      <section id="summary" className="py-16">
        <div className="max-w-6xl mx-auto px-5 space-y-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl p-6 shadow border border-white/50 dark:border-gray-700"
          >
            <h2 className="text-3xl font-semibold text-teal-700 dark:text-teal-400 mb-3">Summary</h2>

<TypewriterOnView
  className="typewriter-safe text-lg leading-relaxed text-gray-800 dark:text-gray-200"
  speed={70}
  text="Passionate about Cloud computing and DevOps, Currently pursuing MCA in Cloud Computing & DevOps from Chandigarh University. With hands-on experience in Azure and AWS, I excel in infrastructure management, security implementation, and automation. Skilled in Python, Java, and React, I build efficient solutions. Eager to contribute to innovative projects and collaborate with forward-thinking teams."
/>

          </motion.div>

          

{/* 3×3 Grid – Individual 3D Skill Cards */}

{/* Centered Heading for Technical Skills */}
<section id="skills" className="py-16">
<h2 className="text-3xl font-bold text-center text-teal-400 mt-10 mb-6">
  Technical Skills
</h2>


<motion.div
  variants={stagger}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
>
  {[
    { icon: Cloud, title: "Azure", desc: "Cloud Services & Infrastructure" },
    { icon: Cloud, title: "AWS", desc: "Compute, Storage & IAM" },
    { icon: Boxes, title: "Docker", desc: "Containerization & Orchestration" },
    { icon: Github, title: "GitHub Actions", desc: "CI/CD Automation" },
    { icon: Shield, title: "Security", desc: "IAM • MFA • Compliance" },
    { icon: Terminal, title: "Python", desc: "Automation & Scripting" },
    { icon: Cpu, title: "Java", desc: "OOP & Backend Development" },
    { icon: Server, title: "React", desc: "Frontend & UI Development" },
    { icon: Award, title: "DevOps", desc: "Pipeline & Deployment Practices" },
  ].map(({ icon: Icon, title, desc }) => (
    <motion.div
      key={title}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative bg-white/10 dark:bg-gray-800/70 backdrop-blur-md border border-white/10 dark:border-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:border-teal-400 transform perspective-1000"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* 3D-like icon container */}
        <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg group-hover:shadow-teal-400/50 transform group-hover:rotate-y-12 group-hover:rotate-x-6 transition-transform duration-500">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-teal-300">{title}</h3>
        <p className="text-sm text-gray-300">{desc}</p>
      </div>
    </motion.div>
  ))}
</motion.div>
</section>
        </div>
      </section>

      {/* EDUCATION - Roadmap style */}
{/* EDUCATION - Glowing Roadmap Style */}
<EducationRoadmap />


      {/* Experience Flip Cards */}
      <section id="experience" className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-semibold text-emerald-200 mb-8">
            Training & Internships
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                frontTitle: "Cloud Infra & Security Intern",
                company: "Celebal Technologies",
                period: "05/2025 – 07/2025",
                bullets: [
                  "Configured infra on Azure & AWS",
                  "Implemented IAM, MFA, Monitoring",
                  "Enhanced compliance",
                ],
              },
              {
                frontTitle: "Cloud Computing Intern",
                company: "Corizo",
                period: "03/2025 – 04/2025",
                bullets: [
                  "Practiced IaaS/PaaS/SaaS",
                  "Virtualization & Containerization",
                ],
              },
              {
                frontTitle: "Web Developer Intern",
                company: "EuphoriaGenx",
                period: "06/2023 – 08/2023",
                bullets: [
                  "Online Grocery Management System",
                  "PHP/MySQL + HTML/CSS",
                ],
              },
            ].map((job, i) => (
              <FlipCard key={i} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      

      <Projects />

      {/* ACHIEVEMENTS & CERTIFICATIONS */}
            {/* ACHIEVEMENTS & CERTIFICATIONS */}
      <section id="achievements" className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-teal-400 mb-12"
          >
            Achievements & Certifications
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10"
          >
            {/* Academic Achievements */}
            <motion.div
              variants={fadeUp}
              whileHover={{
                boxShadow:
                  "0 0 25px rgba(45,212,191,0.7), 0 0 45px rgba(16,185,129,0.5)",
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="bg-white/5 dark:bg-gray-800/70 backdrop-blur-md border border-gray-700/50 hover:border-teal-400 rounded-3xl p-8 shadow-lg transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-2 text-white mb-4">
                <Award className="w-6 h-6 text-teal-400" />
                Academic Achievements
              </h3>
              <ul className="space-y-3 text-gray-300 list-disc list-inside">
                <li>Secured 2nd position in Tech Fest exhibition (2021).</li>
                <li>Advanced to national round of SAP Hackathon (2025).</li>
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={fadeUp}
              whileHover={{
                boxShadow:
                  "0 0 25px rgba(45,212,191,0.7), 0 0 45px rgba(16,185,129,0.5)",
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="bg-white/5 dark:bg-gray-800/70 backdrop-blur-md border border-gray-700/50 hover:border-teal-400 rounded-3xl p-8 shadow-lg transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-2 text-white mb-4">
                <Award className="w-6 h-6 text-teal-400" />
                Certifications
              </h3>
              <ul className="space-y-3 text-gray-300 list-disc list-inside">
                <li>Infosys – Basic C# Programming (Sep 2024)</li>
                <li>Coursera – Google AI Essentials (Sep 2024)</li>
                <li>Infosys – React.js Certification (Jan 2025)</li>
                <li>Postman – API Fundamentals Student Expert (Feb 2025)</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* CONTACT */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl font-semibold text-teal-700 dark:text-teal-400">Let’s build something</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">Have an opportunity or collaboration in mind? I’d love to hear from you.</p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="mailto:arghyanilryzen@gmail.com" className="flex items-center gap-3"><Mail className="w-5 h-5 text-teal-600"/> arghyanilryzen@gmail.com</a>
              <a href="tel:+919735209855" className="flex items-center gap-3"><Phone className="w-5 h-5 text-teal-600"/> +91 9735209855</a>
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-teal-600"/> Durgapur, West Bengal, India</p>
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-white rounded-3xl p-6 shadow border space-y-4 dark:bg-gray-900 dark:border-gray-700">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input name="name" required value={formData.name} onChange={handleChange} className="mt-1 w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700" placeholder="Your full name"/>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700" placeholder="you@example.com"/>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700" placeholder="Lets Connect..."/>
            </div>
            <button type="submit" className="w-full px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white">Send Message</button>
            {loading && (
  <p className="text-sm text-teal-400 mt-2 animate-pulse">Sending...</p>
)}

{popupVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div
      className={`p-6 rounded-xl shadow-lg text-white text-center w-[320px] ${
        popupMessage.includes("✅") ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      <p className="text-lg font-semibold mb-4">{popupMessage}</p>
      <button
        onClick={() => setPopupVisible(false)}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition"
      >
        Close
      </button>
    </div>
  </div>
)}


            <AnimatePresence>
  {sent && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl text-center border border-teal-400 max-w-sm mx-auto"
      >
        <div className="text-5xl mb-4">
          {popupMessage.includes("Failed") ? "❌" : "✅"}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {popupMessage}
        </h3>
        <button
          onClick={() => setSent(false)}
          className={`px-4 py-2 rounded-xl font-medium shadow-md ${
            popupMessage.includes("Failed")
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-teal-500 hover:bg-teal-600 text-white"
          }`}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


          </motion.form>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-emerald-100">© {new Date().getFullYear()} Arghyanil Chowdhury • Animated Portfolio Website</footer>
    </div>
  );
}