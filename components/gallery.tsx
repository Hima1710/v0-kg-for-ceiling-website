"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { t, isRTL } = useLanguage()

  const projects = [
    {
      id: 1,
      title: t.gallery.projects.luxury.title,
      category: t.gallery.projects.luxury.category,
      image: "/gallery-1.jpg",
    },
    {
      id: 2,
      title: t.gallery.projects.kitchen.title,
      category: t.gallery.projects.kitchen.category,
      image: "/gallery-2.jpg",
    },
    {
      id: 3,
      title: t.gallery.projects.office.title,
      category: t.gallery.projects.office.category,
      image: "/gallery-3.jpg",
    },
    {
      id: 4,
      title: t.gallery.projects.bathroom.title,
      category: t.gallery.projects.bathroom.category,
      image: "/gallery-4.jpg",
    },
    {
      id: 5,
      title: t.gallery.projects.conference.title,
      category: t.gallery.projects.conference.category,
      image: "/gallery-5.jpg",
    },
    {
      id: 6,
      title: t.gallery.projects.retail.title,
      category: t.gallery.projects.retail.category,
      image: "/gallery-6.jpg",
    },
  ]

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  
  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % projects.length)
    }
  }
  
  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + projects.length) % projects.length)
    }
  }

  // Swap navigation for RTL
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <section id="gallery" className="py-24 md:py-32 bg-brand-light">
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
            {t.gallery.title}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block w-full overflow-hidden rounded-3xl cursor-pointer"
                aria-label={`${t.gallery.viewProject}: ${project.title}`}
              >
                <div className={`relative ${index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"}`}>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-brand-beige text-sm uppercase tracking-wider mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-white text-xl font-semibold">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 end-4 text-white hover:bg-white/10 z-10"
              onClick={closeLightbox}
              aria-label={t.gallery.close}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute start-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              aria-label={t.gallery.previous}
            >
              <PrevIcon className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute end-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              aria-label={t.gallery.next}
            >
              <NextIcon className="w-8 h-8" />
            </Button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={projects[selectedIndex].image || "/placeholder.svg"}
                alt={projects[selectedIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                quality={90}
              />
              <div className="absolute bottom-0 left-0 right-0 text-center p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-brand-beige text-sm uppercase tracking-wider">
                  {projects[selectedIndex].category}
                </p>
                <h3 className="text-white text-2xl font-semibold">
                  {projects[selectedIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
