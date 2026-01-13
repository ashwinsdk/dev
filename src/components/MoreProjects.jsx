import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Folder } from 'lucide-react'
import { moreProjects } from '../data/projects'
import { variants } from '../lib/motion'

export default function MoreProjects() {
    const sectionRef = useRef()
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            className="relative section-padding bg-dark-500"
        >
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={variants.staggerContainer}
                    className="mb-12"
                >
                    <motion.span
                        variants={variants.staggerItem}
                        className="inline-block text-neon-500 font-mono text-sm mb-4"
                    >
                        MORE WORK
                    </motion.span>

                    <motion.h2
                        variants={variants.staggerItem}
                        className="text-heading-1 font-light"
                    >
                        Other{' '}
                        <span className="text-gradient-neon font-normal">Projects</span>
                    </motion.h2>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={variants.staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {moreProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function ProjectCard({ project, index }) {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef()
    const [tilt, setTilt] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const tiltX = (y - centerY) / 20
        const tiltY = (centerX - x) / 20

        setTilt({ x: tiltX, y: tiltY })
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setTilt({ x: 0, y: 0 })
    }

    return (
        <motion.article
            ref={cardRef}
            variants={variants.staggerItem}
            className="group relative perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="project-card h-full flex flex-col preserve-3d"
                style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                {/* Card header with icon */}
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-white/5 text-neon-500">
                        <Folder className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                        {project.github && (
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                aria-label={`${project.title} GitHub`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                        )}

                        {project.preview && (
                            <motion.a
                                href={project.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                aria-label={`${project.title} Preview`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink className="w-5 h-5" />
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-neon-400 transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 flex-1 mb-4 leading-relaxed">
                    {project.shortDescription}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs font-mono text-white/40"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Hover glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 102, 0.1) 0%, transparent 50%)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </motion.article>
    )
}
