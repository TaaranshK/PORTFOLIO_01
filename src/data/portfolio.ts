export const personal = {
  name: "Taaransh Kapoor",
  firstName: "Taaransh",
  lastName: "Kapoor",
  title: "Full Stack Developer · AI & ML · UI/UX",
  email: "taaransh.kapoor@gmail.com",
  phone: "+91-7014619618",
  location: "Jaipur, Rajasthan",
  linkedin: "https://linkedin.com/in/taaransh-kapoor",
  github: "https://github.com/TaaranshK",
  portfolio: "https://kapoortaaransh.vercel.app",
  bio: "Currently pursuing B.Tech in Computer Science at JECRC University Jaipur, Rajasthan. Deep expertise in AI/ML, Data Science, and UI/UX. I build scalable systems and deliver data-driven solutions — with 400+ competitive programming problems demonstrating sharp problem-solving instincts.",
  education: {
    degree: "B.Tech in Computer Science",
    institution: "JECRC University Jaipur, Rajasthan",
    cgpa: "8.5",
    year: "2022–2026",
  },
};

export const skills = {
  Languages: ["Java", "Python", "C++", "Kotlin", "JavaScript", "SQL", "HTML5", "CSS3"],
  Frontend: ["React.js", "Tailwind CSS", "Bootstrap"],
  Backend: ["Spring Boot", "Flask", "FastAPI", "REST APIs"],
  "AI / ML": ["Generative AI", "NLP", "Scikit-learn", "Pandas", "NumPy"],
  Databases: ["PostgreSQL", "SQLite", "SQL"],
  Tools: ["Git", "VS Code", "Docker", "Android Studio"],
};

export const experience = [
  {
    id: "01",
    company: "Tata Technologies Ltd.",
    role: "Software Engineering Intern",
    duration: "Dec 2025 – Feb 2026",
    location: "Gurugram",
    type: "On-site",
    tech: ["Java", "Spring Boot", "React.js", "JPA/Hibernate"],
    bullets: [
      "Implemented layered architecture with Controller–Service–Repository pattern for scalable backend systems",
      "Developed responsive React.js frontend components integrated with Spring Boot APIs",
      "Contributed to TATA Hero Lead Nurturing CRM — a full-stack enterprise CRM solution",
    ],
  },
  {
    id: "02",
    company: "Infosys Springboard",
    role: "Data Science & AI Project Intern",
    duration: "Oct 2025 – Dec 2025",
    location: "Virtual",
    type: "Remote",
    tech: ["Python", "Streamlit", "ML", "AI", "Scikit-learn"],
    bullets: [
      "Built FitPulse — a real-time ML health anomaly detection system with live monitoring dashboard",
      "Engineered a preprocessing pipeline achieving 45% faster processing times over baseline",
      "Applied supervised learning models for multi-class health anomaly classification",
    ],
  },
];

export const projects = [
  {
    id: "01",
    name: "TATA Hero Lead\nNurturing CRM",
    shortName: "CRM Platform",
    description:
      "Enterprise-grade CRM built during internship at Tata Technologies. Layered architecture, intelligent lead tracking, and a React frontend that makes complex data feel effortless.",
    tech: ["Java", "Spring Boot", "React.js", "JPA/Hibernate", "PostgreSQL"],
    metrics: [
      { value: "15+", label: "REST APIs" },
      { value: "3", label: "Service Layers" },
      { value: "100%", label: "Test Coverage" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#4A6741",
  },
  {
    id: "02",
    name: "FitPulse",
    shortName: "Health AI",
    description:
      "Real-time ML health anomaly detection system. Monitors vitals, detects anomalies live, and delivers actionable insights — with a 45% faster preprocessing pipeline.",
    tech: ["Python", "Scikit-learn", "Streamlit", "Plotly", "NumPy"],
    metrics: [
      { value: "45%", label: "Faster Pipeline" },
      { value: "98%", label: "Accuracy" },
      { value: "Real-time", label: "Detection" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#C8A96E",
  },
  {
    id: "03",
    name: "Financial\nMonitoring Dashboard",
    shortName: "FinDash",
    description:
      "Secure financial analytics platform with GenAI-powered insights. JWT authentication, real-time data visualization, and an AI assistant that speaks the language of money.",
    tech: ["FastAPI", "React", "PostgreSQL", "JWT", "GenAI"],
    metrics: [
      { value: "1000+", label: "Users" },
      { value: "AI", label: "Insights Engine" },
      { value: "JWT", label: "Secure Auth" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#6B9E60",
  },
  {
    id: "04",
    name: "Smart Recipe\nExplorer",
    shortName: "Recipe AI",
    description:
      "GenAI-powered culinary assistant that generates personalized recipes from ingredients. Integrates multiple REST APIs with a conversational AI backbone.",
    tech: ["Flask", "GenAI", "Streamlit", "REST APIs"],
    metrics: [
      { value: "5+", label: "APIs Integrated" },
      { value: "GenAI", label: "Powered" },
      { value: "Instant", label: "Results" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#8B6F3E",
  },
];

export const certifications = [
  { name: "Python Programming", issuer: "Infosys Springboard", icon: "🐍" },
  { name: "SQL & NoSQL Databases", issuer: "Infosys Springboard", icon: "🗄️" },
  { name: "Agile & Scrum", issuer: "Infosys Springboard", icon: "⚡" },
  { name: "Data Analytics", issuer: "Infosys Springboard", icon: "📊" },
  { name: "Machine Learning", issuer: "Coursera", icon: "🤖" },
  { name: "DSA — 400+ Problems", issuer: "LeetCode / HackerRank", icon: "🧩" },
];
