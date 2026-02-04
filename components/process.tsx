"use client"

import { motion } from "framer-motion"
import { MessageSquare, Palette, Hammer, CheckCircle } from "lucide-react"
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

  return (
    <section id="process" className="py-24 md:py-32 bg-background">
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

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          
          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute start-8 top-20 w-0.5 h-full bg-border" />
                )}
                
                {/* Icon Circle */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-brand-beige rounded-full mb-6 mx-auto lg:mx-0 lg:ms-0">
                  <step.icon className="w-7 h-7 text-brand-green" />
                </div>

                {/* Content */}
                <div className="text-center lg:text-start">
                  <span className="text-brand-red font-bold text-sm tracking-wider">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
