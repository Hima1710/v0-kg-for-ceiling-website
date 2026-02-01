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
      ease: "easeOut",
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
        ? ["أسقف معلقة", "تصميمات كاسيت", "إضاءة LED مدمجة", "حلول عزل الصوت"]
        : ["Suspended Ceilings", "Coffered Designs", "LED Integration", "Acoustic Solutions"],
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
    <section id="services" className="py-24 md:py-32 bg-background">
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
            {t.services.title}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-brand-beige transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 start-6 text-2xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-6 text-pretty">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-brand-red font-medium text-sm group/btn"
                >
                  {t.services.learnMore}
                  <Arrow className="w-4 h-4 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
