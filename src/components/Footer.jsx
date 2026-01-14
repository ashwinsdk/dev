import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'
import { socialLinks, contact } from '../data/projects'

const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-dark-900 border-t border-white/5">
            <div className="section-container py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-white/20">
                                <img
                                    src="/assets/ashwinsdk.svg"
                                    alt="Ashwin SDK"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-mono text-sm font-semibold text-white/90">
                                ashwinsdk
                            </span>
                        </div>

                        <p className="text-sm text-white/40 text-center lg:text-left">
                            © {currentYear} ashwinsdk. All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        {/* Navigation */}
                        <nav className="flex items-center gap-6">
                            <a
                                href="#projects"
                                className="text-sm text-white/50 hover:text-white transition-colors"
                            >
                                Projects
                            </a>
                            <a
                                href="#pricing"
                                className="text-sm text-white/50 hover:text-white transition-colors"
                            >
                                Services
                            </a>
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-sm text-white/50 hover:text-white transition-colors"
                            >
                                Contact
                            </a>
                        </nav>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((link) => {
                                const Icon = iconMap[link.icon]
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                        aria-label={link.name}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                {/* <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-2">
                        Built with <Heart className="w-3 h-3 text-red-500" /> using React, Three.js & Tailwind
                    </span>
                </div> */}
            </div>
        </footer>
    )
}
