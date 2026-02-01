"use client"

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t, isRTL, language } = useLanguage()

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.info.location,
      details: t.contact.info.locationDetails,
    },
    {
      icon: Phone,
      title: t.contact.info.phone,
      details: ["01005335945", "01111145096"],
    },
    {
      icon: Mail,
      title: t.contact.info.email,
      details: ["info@kgceiling.com"],
    },
    {
      icon: Clock,
      title: t.contact.info.hours,
      details: t.contact.info.hoursDetails,
    },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const service = formData.get("service") as string
    const message = formData.get("message") as string

    // Get service label based on value
    const serviceLabels: Record<string, { ar: string; en: string }> = {
      ceiling: { ar: "أسقف جبسية", en: "Gypsum Ceilings" },
      partition: { ar: "قواطيع", en: "Partitions" },
      custom: { ar: "تشطيبات مخصصة", en: "Custom Finishing" },
      other: { ar: "أخرى", en: "Other" },
    }
    const serviceLabel = serviceLabels[service]?.[language] || service

    // Format WhatsApp message
    const whatsappMessage = language === "ar" 
      ? `*طلب عرض سعر جديد*
━━━━━━━━━━━━━━━
*الاسم:* ${name}
*رقم الهاتف:* ${phone}
*البريد الإلكتروني:* ${email}
*الخدمة المطلوبة:* ${serviceLabel}
━━━━━━━━━━━━━━━
*تفاصيل الطلب:*
${message}
━━━━━━━━━━━━━━━
_تم الإرسال من موقع KG For Ceiling_`
      : `*New Quote Request*
━━━━━━━━━━━━━━━
*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Service:* ${serviceLabel}
━━━━━━━━━━━━━━━
*Message:*
${message}
━━━━━━━━━━━━━━━
_Sent from KG For Ceiling website_`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappURL = `https://wa.me/201005335945?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false)
      e.currentTarget?.reset()
    }, 3000)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-brand-beige/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mb-6 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t.nav.getQuote}
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-brand-green" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    {language === "ar" ? "تم الإرسال بنجاح!" : "Message Sent!"}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === "ar" ? "سنتواصل معك خلال 24 ساعة." : "We'll get back to you within 24 hours."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contact.form.name}</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t.contact.form.namePlaceholder}
                        required
                        className="rounded-xl border-border focus:border-brand-green"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.form.phone}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t.contact.form.phonePlaceholder}
                        required
                        className="rounded-xl border-border focus:border-brand-green"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t.contact.form.emailPlaceholder}
                      required
                      className="rounded-xl border-border focus:border-brand-green"
                      dir="ltr"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service">{t.contact.form.service}</Label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full h-10 px-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-brand-green"
                    >
                      <option value="">{t.contact.form.servicePlaceholder}</option>
                      <option value="ceiling">{t.contact.form.serviceOptions.ceiling}</option>
                      <option value="partition">{t.contact.form.serviceOptions.partitions}</option>
                      <option value="custom">{t.contact.form.serviceOptions.custom}</option>
                      <option value="other">{t.contact.form.serviceOptions.other}</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={4}
                      required
                      className="rounded-xl border-border focus:border-brand-green resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white rounded-full py-6"
                  >
                    {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-brand-beige transition-colors"
                >
                  <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  {item.details.map((detail) => (
                    <p key={detail} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden border border-border h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.376019476896!2d30.96!3d30.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145878c8c6a0b3f3%3A0x8a2c80c0e9d8c0a0!2sSadat%20City!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KG For Ceiling Sadat Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
