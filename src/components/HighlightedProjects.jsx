import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Play, Pause, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { highlightedProjects } from '../data/projects'
import { variants } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function HighlightedProjects() {
    const sectionRef = useRef()
    const headerRef = useRef()
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative section-padding bg-dark-500"
        >
            {/* Section Header */}
            <div className="section-container mb-16">
                <motion.div
                    ref={headerRef}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={variants.staggerContainer}
                    className="max-w-3xl"
                >
                    <motion.span
                        variants={variants.staggerItem}
                        className="inline-block text-neon-500 font-mono text-sm mb-4"
                    >
                        FEATURED WORK
                    </motion.span>

                    <motion.h2
                        variants={variants.staggerItem}
                        className="text-display-2 font-light mb-4"
                    >
                        Highlighted{' '}
                        <span className="text-gradient-neon font-normal">Projects</span>
                    </motion.h2>

                    <motion.p
                        variants={variants.staggerItem}
                        className="text-lg text-white/60"
                    >
                        Production-ready applications showcasing full-stack expertise and innovative problem-solving.
                    </motion.p>
                </motion.div>
            </div>

            {/* Projects */}
            <div className="space-y-24 lg:space-y-32">
                {highlightedProjects.map((project, index) => (
                    <ProjectPanel
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}

function ProjectPanel({ project, index }) {
    const panelRef = useRef()
    const isInView = useInView(panelRef, { once: true, margin: '-50px' })
    const [isPlaying, setIsPlaying] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const videoRef = useRef()

    const isReversed = index % 2 === 1

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    return (
        <motion.article
            ref={panelRef}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants.fadeInUp}
            className="section-container"
        >
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:grid-flow-dense' : ''
                }`}>
                {/* Media Section */}
                <motion.div
                    className={`relative ${isReversed ? 'lg:col-start-2' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-400 border border-white/10 group">
                        {/* Video/Image Preview */}
                        {project.media.video ? (
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                poster={project.media.poster}
                                loop
                                muted
                                playsInline
                            >
                                <source src={project.media.video} type="video/webm" />
                                <source src={project.media.videoFallback} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={project.media.poster}
                                alt={`${project.title} preview`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Play/Pause button */}
                        {project.media.video && (
                            <motion.button
                                onClick={handlePlayPause}
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="p-4 rounded-full bg-dark-500/80 backdrop-blur-sm border border-white/20 hover:bg-neon-500/20 hover:border-neon-500/50 transition-all">
                                    {isPlaying ? (
                                        <Pause className="w-8 h-8 text-white" />
                                    ) : (
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    )}
                                </div>
                            </motion.button>
                        )}

                        {/* Progress indicator */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-neon-500"
                            initial={{ width: 0 }}
                            animate={{ width: isPlaying ? '100%' : 0 }}
                            transition={{ duration: 10, ease: 'linear' }}
                        />

                        {/* Corner glow effect on hover */}
                        <motion.div
                            className="absolute -inset-px rounded-2xl pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, transparent 40%, rgba(0, 255, 102, 0.1) 100%)',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Frame decoration */}
                    <div className="absolute -inset-2 rounded-3xl border border-white/5 pointer-events-none" />
                </motion.div>

                {/* Content Section */}
                <motion.div
                    className={`space-y-6 ${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    variants={variants.staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Project number */}
                    <motion.span
                        variants={variants.staggerItem}
                        className="inline-block text-neon-500/50 font-mono text-sm"
                    >
                        0{index + 1}
                    </motion.span>

                    {/* Title */}
                    <motion.h3
                        variants={variants.staggerItem}
                        className="text-heading-1 font-semibold"
                    >
                        {project.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        variants={variants.staggerItem}
                        className="text-white/60 leading-relaxed"
                    >
                        {project.fullDescription}
                    </motion.p>

                    {/* Features */}
                    <motion.ul
                        variants={variants.staggerContainer}
                        className="space-y-3"
                    >
                        {project.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                variants={variants.staggerItem}
                                className="flex items-start gap-3 text-white/80"
                            >
                                <span className="w-2 h-2 mt-2 rounded-full bg-neon-500 flex-shrink-0" />
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Tech Stack */}
                    <motion.div
                        variants={variants.staggerItem}
                        className="flex flex-wrap gap-2"
                    >
                        {project.techStack.map((tech) => (
                            <TechTag key={tech} name={tech} />
                        ))}
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        variants={variants.staggerItem}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </motion.a>

                        {project.preview && (
                            <motion.a
                                href={project.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Preview
                            </motion.a>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </motion.article>
    )
}

function TechTag({ name }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.span
            className="tech-tag"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
        >
            {name}
        </motion.span>
    )
}
