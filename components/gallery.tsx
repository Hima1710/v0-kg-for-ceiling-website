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

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject !== null && (
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
              key={`${selectedProject.projectIndex}-${selectedProject.imageIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[selectedProject.projectIndex].images[selectedProject.imageIndex] || "/placeholder.svg"}
                alt={projects[selectedProject.projectIndex].title_ar}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-brand-beige text-sm uppercase tracking-wider">
                  {isRTL ? projects[selectedProject.projectIndex].category_ar : projects[selectedProject.projectIndex].category_en}
                </p>
                <h3 className="text-white text-2xl font-semibold">
                  {isRTL ? projects[selectedProject.projectIndex].title_ar : projects[selectedProject.projectIndex].title_en}
                </h3>
                <p className="text-white text-sm mt-2">
                  {selectedProject.imageIndex + 1} / {projects[selectedProject.projectIndex].images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
