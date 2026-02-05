"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function Gallery() {
  const [selectedProject, setSelectedProject] = useState<{ projectIndex: number; imageIndex: number } | null>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { t, isRTL } = useLanguage()



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const spreadsheetId = '1HPwrrrDK66bNHXhvFmhJ-4fTvi-EJvoSsigK4TPaPMY'

        // Fetch projects
        const projectsResponse = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=projects`)
        const projectsText = await projectsResponse.text()
        const projectsJson = JSON.parse(projectsText.substr(47).slice(0, -2))
        const projectsRows = projectsJson.table.rows

        // Fetch project images
        const imagesResponse = await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=project_images`)
        const imagesText = await imagesResponse.text()
        const imagesJson = JSON.parse(imagesText.substr(47).slice(0, -2))
        const imagesRows = imagesJson.table.rows

        // Process projects
        const fetchedProjects = projectsRows.map((row: any) => ({
          id: row.c[0]?.v || 0,
          title_ar: row.c[1]?.v || '',
          title_en: row.c[2]?.v || '',
          category_ar: row.c[3]?.v || '',
          category_en: row.c[4]?.v || '',
          image: (row.c[5]?.v && row.c[5]?.v.trim() !== '') ? row.c[5]?.v.trim() : '/placeholder.svg'
        }))

        console.log('Fetched projects:', fetchedProjects)

        // Process images and attach to projects
        const imagesMap: { [key: number]: string[] } = {}
        imagesRows.forEach((row: any) => {
          const projectId = row.c[1]?.v
          const imageUrl = row.c[2]?.v
          if (projectId && imageUrl && imageUrl.trim() !== '') {
            if (!imagesMap[projectId]) {
              imagesMap[projectId] = []
            }
            imagesMap[projectId].push(imageUrl.trim())
          }
        })

        console.log('Images map:', imagesMap)

        // Attach images to projects and filter out empty images
        const projectsWithImages = fetchedProjects.map((project: any) => {
          const projectImages = imagesMap[project.id] || []
          const filteredImages = projectImages.filter((img: string) => img && img.trim() !== '')
          if (filteredImages.length === 0 && project.image && project.image.trim() !== '') {
            filteredImages.push(project.image)
          }
          return {
            ...project,
            images: filteredImages
          }
        }).filter((project: any) => project.images.length > 0)

        console.log('Projects with images:', projectsWithImages)

        setProjects(projectsWithImages)
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Fallback to default projects if fetch fails
        setProjects([
          {
            id: 1,
            title_ar: 'سقف فاخر',
            title_en: 'Luxury Ceiling',
            category_ar: 'سقف',
            category_en: 'Ceiling',
            image: "/gallery-1.jpg",
            images: ["/gallery-1.jpg"]
          },
          {
            id: 2,
            title_ar: 'سقف مطبخ',
            title_en: 'Kitchen Ceiling',
            category_ar: 'مطبخ',
            category_en: 'Kitchen',
            image: "/gallery-2.jpg",
            images: ["/gallery-2.jpg"]
          },
          {
            id: 3,
            title_ar: 'سقف مكتب',
            title_en: 'Office Ceiling',
            category_ar: 'مكتب',
            category_en: 'Office',
            image: "/gallery-3.jpg",
            images: ["/gallery-3.jpg"]
          },
          {
            id: 4,
            title_ar: 'سقف حمام',
            title_en: 'Bathroom Ceiling',
            category_ar: 'حمام',
            category_en: 'Bathroom',
            image: "/gallery-4.jpg",
            images: ["/gallery-4.jpg"]
          },
          {
            id: 5,
            title_ar: 'سقف قاعة اجتماعات',
            title_en: 'Conference Ceiling',
            category_ar: 'قاعة اجتماعات',
            category_en: 'Conference',
            image: "/gallery-5.jpg",
            images: ["/gallery-5.jpg"]
          },
          {
            id: 6,
            title_ar: 'سقف محل تجاري',
            title_en: 'Retail Ceiling',
            category_ar: 'محل تجاري',
            category_en: 'Retail',
            image: "/gallery-6.jpg",
            images: ["/gallery-6.jpg"]
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])



  const openLightbox = (projectIndex: number) => setSelectedProject({ projectIndex, imageIndex: 0 })
  const closeLightbox = () => setSelectedProject(null)

  const goNext = () => {
    if (selectedProject !== null) {
      const currentProject = projects[selectedProject.projectIndex]
      let nextImageIndex = (selectedProject.imageIndex + 1) % currentProject.images.length
      // Skip empty images
      while (nextImageIndex !== selectedProject.imageIndex && (!currentProject.images[nextImageIndex] || currentProject.images[nextImageIndex].trim() === '')) {
        nextImageIndex = (nextImageIndex + 1) % currentProject.images.length
      }
      setSelectedProject({ ...selectedProject, imageIndex: nextImageIndex })
    }
  }

  const goPrev = () => {
    if (selectedProject !== null) {
      const currentProject = projects[selectedProject.projectIndex]
      let prevImageIndex = (selectedProject.imageIndex - 1 + currentProject.images.length) % currentProject.images.length
      // Skip empty images
      while (prevImageIndex !== selectedProject.imageIndex && (!currentProject.images[prevImageIndex] || currentProject.images[prevImageIndex].trim() === '')) {
        prevImageIndex = (prevImageIndex - 1 + currentProject.images.length) % currentProject.images.length
      }
      setSelectedProject({ ...selectedProject, imageIndex: prevImageIndex })
    }
  }

  // Swap navigation for RTL
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    <section id="gallery" className="py-24 md:py-32 bg-gradient-to-br from-brand-light via-white to-brand-light/50 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-green rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-beige/10 to-transparent rounded-full" />
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
                <span className="text-brand-gold font-semibold text-sm uppercase tracking-wider">Portfolio</span>
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
              {t.gallery.title}
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
            {t.gallery.subtitle}
          </motion.p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
          ) : (
            projects.map((project, index) => (
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
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={isRTL ? project.title_ar : project.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-brand-beige text-sm uppercase tracking-wider mb-1">
                      {isRTL ? project.category_ar : project.category_en}
                    </p>
                    <h3 className="text-white text-xl font-semibold">
                      {isRTL ? project.title_ar : project.title_en}
                    </h3>
                  </div>
                </div>
              </button>
            </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-sm flex flex-col"
            onClick={closeLightbox}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex justify-between items-center p-6 bg-gradient-to-r from-brand-green/20 to-brand-red/20 backdrop-blur-md border-b border-white/10"
            >
              <div className="flex-1">
                <h2 className="text-white text-xl font-bold">
                  {isRTL ? projects[selectedProject.projectIndex].title_ar : projects[selectedProject.projectIndex].title_en}
                </h2>
                <p className="text-brand-beige text-sm uppercase tracking-wider">
                  {isRTL ? projects[selectedProject.projectIndex].category_ar : projects[selectedProject.projectIndex].category_en}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full w-10 h-10"
                onClick={closeLightbox}
                aria-label={t.gallery.close}
              >
                <X className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-7xl mx-auto">
                {/* Image Container */}
                <motion.div
                  key={`${selectedProject.projectIndex}-${selectedProject.imageIndex}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="relative group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
                    <img
                      src={projects[selectedProject.projectIndex].images[selectedProject.imageIndex] || "/placeholder.svg"}
                      alt={projects[selectedProject.projectIndex].title_ar}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Navigation Buttons */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute start-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-12 h-12 shadow-lg backdrop-blur-sm border border-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      goPrev()
                    }}
                    aria-label={t.gallery.previous}
                  >
                    <PrevIcon className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute end-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full w-12 h-12 shadow-lg backdrop-blur-sm border border-white/20"
                    onClick={(e) => {
                      e.stopPropagation()
                      goNext()
                    }}
                    aria-label={t.gallery.next}
                  >
                    <NextIcon className="w-6 h-6" />
                  </Button>
                </motion.div>

                {/* Thumbnails */}
                {projects[selectedProject.projectIndex].images.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-6 flex justify-center gap-2 overflow-x-auto pb-2"
                  >
                    {projects[selectedProject.projectIndex].images.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject({ ...selectedProject, imageIndex: index })
                        }}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === selectedProject.imageIndex
                            ? 'border-brand-beige shadow-lg scale-110'
                            : 'border-white/30 hover:border-white/60'
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-6 bg-gradient-to-r from-brand-green/10 to-brand-red/10 backdrop-blur-md border-t border-white/10"
            >
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-brand-beige rounded-full animate-pulse" />
                  <span className="text-sm">
                    {selectedProject.imageIndex + 1} / {projects[selectedProject.projectIndex].images.length}
                  </span>
                </div>
                <div className="text-sm text-brand-beige">
                  KG For Ceiling Sadat
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
