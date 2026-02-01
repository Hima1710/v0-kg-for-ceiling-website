"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/201005335945", label: "WhatsApp" },
]

export function Footer() {
  const { t, language } = useLanguage()

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="KG For Ceiling Sadat"
                width={60}
                height={60}
                className="w-14 h-14 brightness-0 invert"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-background leading-tight">
                  KG FOR CEILING
                </p>
                <p className="text-xs text-brand-beige font-medium">SADAT</p>
              </div>
            </Link>
            <p className="text-background/60 text-sm mb-6 max-w-xs">
              {t.footer.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-brand-red transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-background font-semibold mb-6">{t.footer.ourServices}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-brand-beige transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-background font-semibold mb-6">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-brand-beige transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
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

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            &copy; {new Date().getFullYear()} KG For Ceiling Sadat. {t.footer.rights}.
          </p>
          <p className="text-sm text-background/40">
            {t.footer.developer}{" "}
            <Link
              href="https://wa.me/201558905021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-beige hover:text-brand-green transition-colors"
            >
              Ibrahim Mabrouk
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
