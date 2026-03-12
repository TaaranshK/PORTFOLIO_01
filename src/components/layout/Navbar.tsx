import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { personal } from "@/data/portfolio";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Daily Beats", href: "/journal" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    // If it's a route (starts with /), navigation will be handled by Link component
    // If it's an anchor, scroll to it
    if (!href.startsWith("/")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-16 py-5 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md border-b border-border/60 bg-background/80"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-2xl font-light tracking-widest text-primary hover:opacity-80 transition-opacity"
        >
          TK
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("/") ? (
                <Link
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="relative group font-body text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ) : (
                <button
                  onClick={() => handleNav(link.href)}
                  className="relative group font-body text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-[1100]"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-px bg-foreground"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-foreground"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 h-px bg-foreground"
          />
        </button>
      </motion.nav>

      {/* Mobile Full-screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999] bg-background/98 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="flex flex-col items-center gap-8"
            >
              {links.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-5xl font-light text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNav(link.href)}
                      className="font-display text-5xl font-light text-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  )}
                </motion.li>
              ))}
            </motion.ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 font-mono-custom text-xs text-muted-foreground tracking-widest"
            >
              {personal.email}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
