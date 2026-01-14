import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, Code2, FileCode } from 'lucide-react'
import { contact } from '../data/projects'
import { variants } from '../lib/motion'

export default function CTASection() {
    const sectionRef = useRef()
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative section-padding overflow-hidden"
        >
            {/* Grid background with animated intensity */}
            <div className="absolute inset-0 grid-background opacity-40" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-500 via-transparent to-dark-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-500/50 via-transparent to-dark-500/50" />

            <div className="section-container relative z-10">
                <motion.div
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={variants.staggerContainer}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Icon */}
                    <motion.div
                        variants={variants.staggerItem}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neon-500/10 border border-neon-500/30 mb-8"
                    >
                        <Code2 className="w-8 h-8 text-neon-500" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        variants={variants.staggerItem}
                        className="text-display-2 font-light mb-6"
                    >
                        Get Started
                        <br />
                        <span className="text-gradient-neon font-normal">With Me</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={variants.staggerItem}
                        className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Ready to build something amazing? Whether you need a custom solution,
                        consulting, or want to collaborate on open-source projects,
                        let's connect and make it happen.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={variants.staggerItem}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <motion.a
                            href={`mailto:${contact.email}`}
                            className="btn-primary w-full sm:w-auto text-base px-8 py-4"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Mail className="w-5 h-5" />
                            {/* {contact.email} */} contact
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>

                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="btn-secondary w-full sm:w-auto text-base px-8 py-4"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FileCode className="w-5 h-5" />
                            Explore Projects
                        </motion.a>
                    </motion.div>

                    {/* Additional info */}
                    <motion.div
                        variants={variants.staggerItem}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40"
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-500" />
                            <span>Source code ownership included</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-500" />
                            <span>Full documentation provided</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neon-500" />
                            <span>Open to remote collaboration</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-neon-500/30 to-transparent" />
                <div className="absolute top-1/3 right-10 w-px h-24 bg-gradient-to-b from-transparent via-neon-500/20 to-transparent" />
                <div className="absolute bottom-1/4 left-20 w-24 h-px bg-gradient-to-r from-transparent via-neon-500/20 to-transparent" />
            </div>
        </section>
    )
}
