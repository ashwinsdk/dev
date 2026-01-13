import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Database, Cloud, Cpu, Layers, Terminal } from 'lucide-react'
import { variants } from '../lib/motion'

const skills = [
    {
        category: 'Frontend',
        icon: Layers,
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter'],
    },
    {
        category: 'Backend',
        icon: Terminal,
        items: ['Node.js', 'Python', 'Java', 'PostgreSQL'],
    },
    {
        category: 'Blockchain',
        icon: Cpu,
        items: ['Ethereum', 'Solidity', 'Hardhat', 'Web.js', 'Foundry'],
    },
    {
        category: 'Cloud & DevOps',
        icon: Cloud,
        items: ['Git', 'Docker', 'Linux Service Deployment'],
    },
]

export default function AboutSection() {
    const sectionRef = useRef()
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative section-padding bg-dark-500"
        >
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column - About Text */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={variants.staggerContainer}
                    >
                        <motion.span
                            variants={variants.staggerItem}
                            className="inline-block text-neon-500 font-mono text-sm mb-4"
                        >
                            ABOUT ME
                        </motion.span>

                        <motion.h2
                            variants={variants.staggerItem}
                            className="text-heading-1 font-light mb-6"
                        >
                            Full-stack developer
                            <br />
                            <span className="text-gradient-neon font-normal">passionate about craft</span>
                        </motion.h2>

                        <motion.div
                            variants={variants.staggerItem}
                            className="space-y-4 text-white/60 leading-relaxed"
                        >
                            <p>
                                I'm a software engineer with expertise spanning the entire development stack.
                                From building responsive web applications to designing scalable data pipelines,
                                I focus on creating solutions that are both elegant and production-ready.
                            </p>

                            <p>
                                My approach combines clean code principles with pragmatic problem-solving.
                                I believe in building systems that are maintainable, well-documented, and
                                designed to evolve with changing requirements.
                            </p>

                            <p>
                                When I'm not coding, you'll find me exploring new technologies, contributing
                                to open-source projects, or diving deep into system architecture patterns.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={variants.staggerItem}
                            className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10"
                        >
                            <div>
                                <div className="text-3xl font-light text-neon-500 mb-1">5+</div>
                                <div className="text-sm text-white/40">Hackathons Experience</div>
                            </div>
                            <div>
                                <div className="text-3xl font-light text-neon-500 mb-1">10+</div>
                                <div className="text-sm text-white/40">Projects Built</div>
                            </div>
                            <div>
                                <div className="text-3xl font-light text-neon-500 mb-1">10+</div>
                                <div className="text-sm text-white/40">Open Source</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Skills Grid */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={variants.staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.category}
                                variants={variants.staggerItem}
                                className="group"
                            >
                                <div className="glass-panel rounded-xl p-6 h-full hover:border-neon-500/30 transition-all duration-300">
                                    {/* Icon */}
                                    <div className="inline-flex p-3 rounded-lg bg-neon-500/10 text-neon-500 mb-4 group-hover:bg-neon-500/20 transition-colors">
                                        <skill.icon className="w-5 h-5" />
                                    </div>

                                    {/* Category */}
                                    <h3 className="font-semibold mb-3 group-hover:text-neon-400 transition-colors">
                                        {skill.category}
                                    </h3>

                                    {/* Skills list */}
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs font-mono text-white/50 px-2 py-1 bg-white/5 rounded"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
