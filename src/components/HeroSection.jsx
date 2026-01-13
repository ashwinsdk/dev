import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Github } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { variants } from '../lib/motion'
import { contact } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
    const sectionRef = useRef()
    const contentRef = useRef()

    useEffect(() => {
        // Fade out hero content as user scrolls
        const ctx = gsap.context(() => {
            gsap.to(contentRef.current, {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '40% top',
                    scrub: 1,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center"
        >
            <div
                ref={contentRef}
                className="section-container relative z-10 py-20 lg:py-0"
            >
                <div className="max-w-4xl mx-auto text-center">
                    {/* Label */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={variants.fadeInUp}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm font-mono text-neon-500">
                            <span className="w-2 h-2 rounded-full bg-neon-500 animate-pulse" />
                            FULL-STACK DEVELOPER
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={variants.fadeInUp}
                        className="text-display-1 font-light tracking-tight mb-6"
                    >
                        Building software
                        <br />
                        <span className="text-gradient-neon font-normal">that works</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={variants.fadeInUp}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Production-ready applications showcasing full-stack expertise and innovative problem-solving.
                        From data pipelines to native mobile apps.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={variants.fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="btn-primary w-full sm:w-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Projects
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>

                        <motion.a
                            href={contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary w-full sm:w-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Github className="w-4 h-4" />
                            GitHub Profile
                        </motion.a>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex flex-col items-center gap-2 text-white/40"
                        >
                            <span className="text-xs font-mono">SCROLL</span>
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-500 to-transparent pointer-events-none" />
        </section>
    )
}
