import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Play } from 'lucide-react'

export default function ProjectDetailModal({ project, isOpen, onClose }) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!project) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[200] bg-dark-900/95 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-[201] overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                            <motion.div
                                className="relative w-full max-w-6xl bg-dark-400 border border-white/10 rounded-2xl overflow-hidden"
                                initial={{ scale: 0.95, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 z-10 p-2 rounded-lg bg-dark-500/80 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-dark-400/80 transition-all"
                                    aria-label="Close modal"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Content */}
                                <div className="max-h-[85vh] overflow-y-auto scrollbar-hide">
                                    {/* Hero Image/Video */}
                                    <div className="relative aspect-video bg-dark-500">
                                        {project.media.video ? (
                                            <video
                                                className="w-full h-full object-cover"
                                                poster={project.media.poster}
                                                controls
                                                autoPlay
                                                loop
                                                muted
                                            >
                                                <source src={project.media.video} type="video/webm" />
                                                <source src={project.media.videoFallback} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img
                                                src={project.media.poster}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    {/* Details */}
                                    <div className="p-8 lg:p-12">
                                        {/* Header */}
                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-4">
                                                {project.priority && (
                                                    <span className="px-3 py-1 bg-neon-500/10 border border-neon-500/30 text-neon-500 text-xs font-mono rounded-full">
                                                        FEATURED
                                                    </span>
                                                )}
                                                <span className="text-neon-500/50 font-mono text-sm">
                                                    0{project.priority || '1'}
                                                </span>
                                            </div>

                                            <h2 className="text-heading-1 font-semibold mb-4">
                                                {project.title}
                                            </h2>

                                            <p className="text-lg text-white/70 leading-relaxed">
                                                {project.fullDescription || project.shortDescription}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        {project.features && project.features.length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                                                <ul className="space-y-3">
                                                    {project.features.map((feature, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-3 text-white/70"
                                                        >
                                                            <span className="w-2 h-2 mt-2 rounded-full bg-neon-500 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Tech Stack */}
                                        <div className="mb-8">
                                            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="tech-tag"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Screenshots */}
                                        {project.media.screenshots && project.media.screenshots.length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {project.media.screenshots.map((screenshot, i) => (
                                                        <img
                                                            key={i}
                                                            src={screenshot}
                                                            alt={`${project.title} screenshot ${i + 1}`}
                                                            className="rounded-lg border border-white/10 w-full"
                                                            loading="lazy"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                                            {project.github && (
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Github className="w-5 h-5" />
                                                    View on GitHub
                                                </motion.a>
                                            )}

                                            {project.preview && (
                                                <motion.a
                                                    href={project.preview}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-secondary"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                    Live Preview
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
