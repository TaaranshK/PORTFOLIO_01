export const personal = {
  name: "Taaransh Kapoor",
  firstName: "Taaransh",
  lastName: "Kapoor",
  title: "Full Stack Developer · AI & ML · UI/UX · Data Science",
  email: "taaransh.kapoor@gmail.com",
  phone: "+91-7014619618",
  location: "Jaipur, Rajasthan",
  linkedin: "https://linkedin.com/in/taaransh-kapoor",
  github: "https://github.com/TaaranshK",
  portfolio: "https://kapoortaaransh01.vercel.app",
  bio: "I am a Full Stack Developer currently pursuing B.Tech in Computer Science with expertise in AI/ML, Data Science, and UI/UX — building scalable and well-optimized applications. I have a strong background in optimizing backend systems, designing efficient APIs and architecture, and delivering data-driven solutions. I am also doing Competitive Programming with 400+ problems solved, demonstrating strong problem-solving skills.",
  education: {
    degree: "B.Tech in Computer Science",
    institution: "JECRC University, Jaipur",
    cgpa: "8.5",
    year: "2022–2026",
  },
};

export const skills = {
  Languages: ["Java", "Python"],
  Frontend: [
    "React.js",
    "Next.js",
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "Bootstrap",
    "Material UI",
    "Responsive Design",
  ],
  Backend: [
    "Spring Boot",
    "Spring MVC",
    "Spring Security",
    "Spring Data JPA",
    "Django",
    "Django REST Framework (DRF)",
    "Celery",
    "FastAPI",
    "REST APIs",
  ],
  "AI / ML": [
    "Generative AI",
    "NLP",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Supervised/Unsupervised Learning",
    "LLMs",
  ],
  Databases: ["PostgreSQL", "MySQL", "SQLite", "Redis", "Docker"],
  "Core Concepts": [
    "Data Structures",
    "Operating Systems",
    "Computer Networks",
    "OOPs",
    "Cloud Basics",
    "Agile/Scrum",
  ],
  Tools: ["Git", "GitHub", "Android Studio", "Postman", "Linux", "AWS (EC2)", "Kubernetes"],
};

export const experience = [
  {
    id: "01",
    company: "DSTP Technologies",
    role: "Full Stack Developer Intern",
    duration: "Ongoing",
    location: "Jaipur, Rajasthan",
    type: "On-site",
    tech: ["Python", "Django", "React.js"],
    bullets: [
      "Working on a multi-tenant platform that allows multiple customers to use the same software separately, ensuring their data stays secure and organized",
      "Creating a dynamic portfolio website that can easily adapt and be reused for different users",
      "Helping connect and work with IoT devices, understanding how data travels from devices to the application step by step",
      "Building a system that converts complex device data into simple, human-readable information so it's easy to understand",
    ],
  },
  {
    id: "02",
    company: "Tata Technologies Ltd.",
    role: "Software Engineering Intern",
    duration: "Dec 2025 – Feb 2026",
    location: "Gurugram, Haryana",
    type: "On-site",
    tech: ["Java", "Spring Boot", "React.js", "HTML", "CSS", "JavaScript"],
    bullets: [
      "Designed a scalable layered architecture using Controller–Service–Repository pattern with DTO-based data transfer and role-based access control for clean separation of concerns and maintainability",
      "Developed the frontend interface utilizing HTML, CSS, JavaScript, and React, enhancing user experience",
      "Collaborated closely with the Tata Technologies team, benefiting from extensive guidance and mentorship throughout the project",
    ],
  },
  {
    id: "03",
    company: "Infosys Springboard",
    role: "Data Science & AI Project Intern",
    duration: "Oct 2025 – Dec 2025",
    location: "Virtual",
    type: "Remote",
    tech: ["Python", "Streamlit", "ML", "AI", "Data Science"],
    bullets: [
      "Built FitPulse, an end-to-end Machine Learning health anomaly detection system processing real-time fitness data for 1,000+ users, delivering sub-2-second alerts via an optimized Pandas & NumPy pipeline (~45% faster preprocessing)",
    ],
  },
];

export const projects = [
  {
    id: "01",
    name: "TATA Hero Lead\nNurturing CRM",
    shortName: "CRM Platform",
    description:
      "Web-based CRM system to streamline automobile lead management and follow-up tracking, built during internship at Tata Technologies with layered architecture and a dynamic React frontend.",
    tech: ["Java", "Spring Boot", "JPA/Hibernate", "MVC", "React.js", "JavaScript", "HTML", "CSS", "Bootstrap"],
    metrics: [
      { value: "15+", label: "REST APIs" },
      { value: "RBAC", label: "Access Control" },
      { value: "Paginated", label: "Lead Filters" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#4A6741",
    bullets: [
      "Developed a web-based CRM system to streamline automobile lead management and follow-up tracking",
      "Engineered 15+ RESTful APIs to create, search, filter, paginate, and update lead statuses (New → Contacted → Follow-up → Converted)",
      "Designed a scalable layered architecture using Controller–Service–Repository pattern with DTO-based data transfer and role-based access control",
      "Developed a responsive frontend using React.js, JavaScript, HTML, CSS, and Bootstrap with dynamic lead listing, advanced search filters, pagination, and REST API integration",
    ],
  },
  {
    id: "02",
    name: "FitPulse",
    shortName: "Health AI",
    description:
      "End-to-end Machine Learning health anomaly detection system processing real-time fitness data for 1,000+ users, delivering sub-2-second alerts with a 45% faster preprocessing pipeline.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "Plotly"],
    metrics: [
      { value: "45%", label: "Faster Pipeline" },
      { value: "<2s", label: "Alert Latency" },
      { value: "1000+", label: "Users" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#C8A96E",
    bullets: [
      "Built an end-to-end ML pipeline on time-series fitness data for 1,000+ users, delivering anomaly detection alerts in under 2 seconds — 45% faster than baseline via Pandas & NumPy preprocessing optimization",
      "Developed a Streamlit-Plotly dashboard with live health metric visualization and configurable alert thresholds, reducing risk response time from minutes to seconds",
    ],
  },
  {
    id: "03",
    name: "Financial\nMonitoring Dashboard",
    shortName: "FinDash",
    description:
      "Secure financial analytics platform with GenAI-powered insights, JWT authentication, real-time portfolio tracking, and zero page-reload latency.",
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "JWT", "GenAI"],
    metrics: [
      { value: "JWT", label: "Secure Auth" },
      { value: "RBAC", label: "Access Control" },
      { value: "AI", label: "Insights Engine" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#6B9E60",
    bullets: [
      "Engineered a secure FastAPI backend with JWT auth and role-based access control, integrated with a React frontend delivering real-time portfolio tracking and transaction metrics with zero page-reload latency",
      "Implemented GenAI-powered financial insights with interactive chart visualizations, enabling data-driven investment decisions for end users",
    ],
  },
  {
    id: "04",
    name: "Smart Recipe\nExplorer",
    shortName: "Recipe AI",
    description:
      "Flask REST API with a GenAI instruction-simplification module converting complex recipes into beginner-friendly steps across a 500+ recipe catalog.",
    tech: ["Python", "Flask", "Generative AI", "Streamlit", "REST APIs"],
    metrics: [
      { value: "500+", label: "Recipes" },
      { value: "GenAI", label: "Simplification" },
      { value: "Flask", label: "REST API" },
    ],
    github: "https://github.com/TaaranshK",
    live: null,
    accent: "#8B6F3E",
    bullets: [
      "Developed a Flask REST API with GenAI instruction-simplification module, converting complex recipes into beginner-friendly steps across a 500+ recipe catalog — reducing user drop-off on complex dishes",
    ],
  },
];

export type CertificationIcon = "python" | "database" | "agile" | "analytics" | "dsa";

export const certifications: Array<{
  name: string;
  issuer: string;
  icon: CertificationIcon;
}> = [
  { name: "Python Programming", issuer: "Infosys Springboard", icon: "python" },
  { name: "SQL & NoSQL Databases", issuer: "Infosys Springboard", icon: "database" },
  { name: "Agile & Scrum", issuer: "Infosys Springboard", icon: "agile" },
  { name: "Data Analytics & Architecture Fundamentals", issuer: "Infosys Springboard", icon: "analytics" },
  { name: "DSA — 400+ Problems Solved", issuer: "LeetCode / HackerRank", icon: "dsa" },
];