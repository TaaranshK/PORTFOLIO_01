"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Wander", href: "#chronicle" },
  { label: "Music", href: "#music" },
  { label: "Moments", href: "#gallery" },
  { label: "Portfolio", href: "/" },
];


export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    // If it starts with /, it's a route - let Link handle it
    if (href.startsWith("/")) {
      window.location.href = href;
    } else {
      // Otherwise it's an anchor
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className={`fixed top-0 left-0 right-0 z-[900] px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-stone/20" : ""}`
        }>
        
        {/* Logo */}
        <Link
          to="/"
          className="text-paper text-xl italic story-link font-serif hover:opacity-80 transition-opacity"
          data-cursor="pointer">
          
          TK
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) =>
          <li key={item.label}>
              {item.href.startsWith("/") ? (
                <Link
                  to={item.href}
                  className="font-inter text-xs tracking-widest uppercase text-paper/60 hover:text-paper transition-colors duration-300 story-link"
                  data-cursor="pointer">
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleNav(item.href)}
                  className="font-inter text-xs tracking-widest uppercase text-paper/60 hover:text-paper transition-colors duration-300 story-link"
                  data-cursor="pointer">
                  {item.label}
                </button>
              )}
            </li>
          )}
        </ul>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden font-inter text-xs tracking-widest uppercase text-paper/60 hover:text-neon transition-colors"
          data-cursor="pointer">
          
          [ Menu ]
        </button>
      </motion.nav>

      {/* Fullscreen mobile overlay */}
      <AnimatePresence>
        {menuOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[950] bg-ink flex flex-col items-center justify-center">
          
            <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 font-inter text-xs tracking-widest uppercase text-stone hover:text-paper transition-colors"
            data-cursor="pointer">
            
              [ Close ]
            </button>
            <ul className="flex flex-col gap-8 items-center">
              {navItems.map((item, i) =>
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.1 }}>
              
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-garamond text-4xl italic text-paper hover:text-neon transition-colors duration-300"
                      data-cursor="pointer">
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNav(item.href)}
                      className="font-garamond text-4xl italic text-paper hover:text-neon transition-colors duration-300"
                      data-cursor="pointer">
                      {item.label}
                    </button>
                  )}
                </motion.li>
            )}
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
