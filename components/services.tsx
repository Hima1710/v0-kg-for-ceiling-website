"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function Services() {
  const { t, isRTL, language } = useLanguage()
  
  const services = [
    {
      key: "ceiling" as const,
      title: t.services.ceiling.title,
      description: t.services.ceiling.description,
      image: "/project-ceiling.jpg",
      features: language === "ar"
        ? ["أسقف جبسية", "تصميمات كاسيت", "إضاءة LED مدمجة", "حلول عزل الصوت"]
        : ["Gypsum Ceilings", "Coffered Designs", "LED Integration", "Acoustic Solutions"],
    },
    {
      key: "partitions" as const,
      title: t.services.partitions.title,
      description: t.services.partitions.description,
      image: "/project-partition.jpg",
      features: language === "ar"
        ? ["قواطيع مكاتب", "حوائط مقاومة للحريق", "عزل صوتي", "مقاومة للرطوبة"]
        : ["Office Partitions", "Fire-Rated Walls", "Sound Insulation", "Moisture Resistant"],
    },
    {
      key: "custom" as const,
      title: t.services.custom.title,
      description: t.services.custom.description,
      image: "/project-custom.jpg",
      features: language === "ar"
        ? ["كرانيش ديكورية", "قوالب تاج", "أنماط هندسية", "تصميمات مخصصة"]
        : ["Decorative Cornices", "Crown Molding", "Geometric Patterns", "Custom Designs"],
    },
  ]

  const Arrow = isRTL ? ArrowLeft : ArrowRight

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-br from-background via-brand-light/30 to-background relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-64 h-64 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-green rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-brand-beige/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Luxury Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-brand-beige to-brand-gold blur-lg opacity-30 scale-110" />
              <div className="relative bg-gradient-to-r from-brand-gold/20 to-brand-beige/20 backdrop-blur-sm border border-brand-gold/30 rounded-full px-6 py-2">
                <span className="text-brand-gold font-semibold text-sm uppercase tracking-wider">Services</span>
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance relative"
          >
            <span className="bg-gradient-to-r from-brand-green via-brand-green-dark to-brand-red bg-clip-text text-transparent">
              {t.services.title}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brand-gold to-brand-beige rounded-full"
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-xl text-pretty leading-relaxed max-w-2xl mx-auto"
          >
            {t.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-card via-card to-card/95 rounded-3xl overflow-hidden border border-border/50 hover:border-brand-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-gold/10 backdrop-blur-sm"
            >
              {/* Luxury Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 via-transparent to-brand-beige/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Luxury Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Title with Luxury Styling */}
                <div className="absolute bottom-6 start-6 end-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/30 to-brand-beige/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
                    <h3 className="relative text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-brand-gold to-brand-beige rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <p className="text-muted-foreground mb-8 text-pretty leading-relaxed text-base">
                  {service.description}
                </p>

                {/* Features with Luxury Styling */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                      className="flex items-center gap-3 text-sm text-foreground group/feature"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-brand-gold to-brand-beige flex-shrink-0 shadow-sm" />
                      <span className="group-hover/feature:text-brand-green transition-colors duration-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Luxury CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="inline-flex items-center gap-3 text-brand-red hover:text-brand-red-dark font-semibold text-sm group/btn bg-gradient-to-r from-brand-red/10 to-brand-red/5 hover:from-brand-red/20 hover:to-brand-red/10 px-6 py-3 rounded-full border border-brand-red/20 hover:border-brand-red/40 transition-all duration-300"
                >
                  {t.services.learnMore}
                  <Arrow className="w-4 h-4 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
