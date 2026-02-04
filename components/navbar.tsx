"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#services", label: t.nav.services },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#process", label: t.nav.process },
    { href: "#contact", label: t.nav.contact },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="KG For Ceiling Sadat"
              width={60}
              height={60}
              className="w-12 h-12 md:w-14 md:h-14"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-brand-green leading-tight">
                KG FOR CEILING
              </p>
              <p className="text-xs text-brand-red font-medium">SADAT</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-brand-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-brand-green transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "ar" ? "EN" : "عربي"}</span>
            </button>

            <Button
              asChild
              className="bg-brand-red hover:bg-brand-red/90 text-white rounded-full px-6"
            >
              <Link href="#contact">{t.nav.getQuote}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-brand-green transition-colors p-2"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs">{language === "ar" ? "EN" : "عربي"}</span>
            </button>
            
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-brand-green transition-colors py-3 border-b border-border/50"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="bg-brand-red hover:bg-brand-red/90 text-white rounded-full w-full mt-4"
              >
                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t.nav.getQuote}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
