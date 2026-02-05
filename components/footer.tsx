"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Instagram, MessageCircle, Phone, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/201005335945", label: "WhatsApp" },
]

export function Footer() {
  const { t, language } = useLanguage()
  const [showContact, setShowContact] = useState(false)

  const footerLinks = {
    services: [
      { label: t.services.ceiling.title, href: "#services" },
      { label: t.services.partitions.title, href: "#services" },
      { label: t.services.custom.title, href: "#services" },
    ],
    company: [
      { label: t.nav.home, href: "#" },
      { label: t.nav.process, href: "#process" },
      { label: t.nav.gallery, href: "#gallery" },
      { label: t.nav.contact, href: "#contact" },
    ],
  }

  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer */}
        <div className="py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-beige blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-110" />
                <Image
                  src="/logo.png"
                  alt="KG For Ceiling Sadat"
                  width={60}
                  height={60}
                  className="w-16 h-16 brightness-0 invert relative z-10 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-background leading-tight group-hover:text-brand-beige transition-colors">
                  KG FOR CEILING
                </p>
                <p className="text-sm text-brand-beige font-semibold">SADAT</p>
              </div>
            </Link>
            <p className="text-background/70 text-base mb-8 max-w-xs leading-relaxed">
              {t.footer.description}
            </p>

            {/* Luxury Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-background/10 to-background/5 border border-background/20 flex items-center justify-center hover:border-brand-gold/50 hover:bg-gradient-to-br hover:from-brand-gold/20 hover:to-brand-beige/20 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:text-brand-gold transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative mb-8">
              <h4 className="text-background font-bold text-lg mb-2">{t.footer.ourServices}</h4>
              <div className="w-12 h-0.5 bg-gradient-to-r from-brand-gold to-brand-beige rounded-full" />
            </div>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-base text-background/70 hover:text-brand-beige transition-all duration-300 group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50 group-hover:bg-brand-gold transition-colors" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative mb-8">
              <h4 className="text-background font-bold text-lg mb-2">{t.footer.quickLinks}</h4>
              <div className="w-12 h-0.5 bg-gradient-to-r from-brand-gold to-brand-beige rounded-full" />
            </div>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-base text-background/70 hover:text-brand-beige transition-all duration-300 group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50 group-hover:bg-brand-gold transition-colors" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-background font-semibold mb-6">{t.footer.contactUs}</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li>{t.contact.info.locationDetails[0]}</li>
              <li>{t.contact.info.locationDetails[1]}</li>
              <li className="pt-2">
                <Link href="tel:+201005335945" className="hover:text-brand-beige transition-colors" dir="ltr">
                  01005335945
                </Link>
              </li>
              <li>
                <Link href="tel:+201111145096" className="hover:text-brand-beige transition-colors" dir="ltr">
                  01111145096
                </Link>
              </li>
              <li>
                <Link href="mailto:info@kgceiling.com" className="hover:text-brand-beige transition-colors">
                  info@kgceiling.com
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Luxury Bottom Bar */}
        <div className="py-8 border-t border-gradient-to-r from-transparent via-background/20 to-transparent relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base text-background/50 font-medium"
            >
              &copy; {new Date().getFullYear()} KG For Ceiling Sadat. {t.footer.rights}.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-right"
            >
              <button
                onClick={() => setShowContact(true)}
                className="text-base text-background/50 hover:text-brand-beige transition-all duration-300 cursor-pointer group"
              >
                {t.footer.developer}{" "}
                <span className="text-brand-beige hover:text-brand-red transition-colors font-semibold group-hover:scale-105 inline-block">
                  Ibrahim Mabrouk
                </span>
              </button>
              <div className="mt-2 flex items-center gap-3 text-base text-brand-beige hover:text-brand-red transition-all duration-300 group">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-bold tracking-wide">01558905021</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
