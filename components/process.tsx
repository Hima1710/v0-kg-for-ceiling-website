"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageSquare, Palette, Hammer, CheckCircle, ArrowRight, ArrowDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Process() {
  const { t, isRTL } = useLanguage()

  const steps = [
    {
      number: "01",
      key: "consultation" as const,
      title: t.process.steps.consultation.title,
      description: t.process.steps.consultation.description,
      icon: MessageSquare,
    },
    {
      number: "02",
      key: "design" as const,
      title: t.process.steps.design.title,
      description: t.process.steps.design.description,
      icon: Palette,
    },
    {
      number: "03",
      key: "implementation" as const,
      title: t.process.steps.implementation.title,
      description: t.process.steps.implementation.description,
      icon: Hammer,
    },
    {
      number: "04",
      key: "delivery" as const,
      title: t.process.steps.delivery.title,
      description: t.process.steps.delivery.description,
      icon: CheckCircle,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const Arrow = isRTL ? ArrowRight : ArrowRight

  return (
    <section id="process" className="py-24 md:py-32 bg-gradient-to-br from-background via-background to-brand-beige/5">
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
            {t.process.title}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.key}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-beige/30 max-w-xs"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-red text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-beige to-brand-beige/80 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-brand-green" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-green transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                    className="flex items-center"
                  >
                    <Arrow className="w-6 h-6 text-brand-green" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-beige/30"
              >
                <div className="flex items-start gap-4">
                  {/* Icon and Number */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-brand-beige to-brand-beige/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-7 h-7 text-brand-green" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-green transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className="flex justify-center mt-6"
                  >
                    <ArrowDown className="w-5 h-5 text-brand-green" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
