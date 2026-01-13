import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { navItems, socialLinks, contact } from '../data/projects'
import { variants, motion as motionTokens } from '../lib/motion'

// Social icon mapping
const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [activeSection, setActiveSection] = useState('hero')
    const navRef = useRef()
    const lastScrollY = useRef(0)

    // Handle scroll state - hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Determine if scrolled past threshold
            setIsScrolled(currentScrollY > 50)

            // Show navbar when scrolling up (even a little), hide when scrolling down
            if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isMenuOpen])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen])

    // Intersection observer for active section
    useEffect(() => {
        const sections = ['hero', 'projects', 'about', 'contact']

        const observers = sections.map(section => {
            const element = document.getElementById(section)
            if (!element) return null

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(section)
                    }
                },
                { threshold: 0.3 }
            )

            observer.observe(element)
            return observer
        })

        return () => {
            observers.forEach(observer => observer?.disconnect())
        }
    }, [])

    const handleNavClick = (href) => {
        setIsMenuOpen(false)
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            {/* Desktop & Mobile Header */}
            <header
                ref={navRef}
                className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'top-0' : '-top-24'
                    } ${isScrolled
                        ? 'py-3 bg-dark-900/95 backdrop-blur-xl'
                        : 'py-5 bg-transparent'
                    }`}
            >
                <nav className="section-container flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault()
                            handleNavClick('#hero')
                        }}
                        className="relative flex items-center gap-3 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-white/20 group-hover:border-neon-500/50 transition-all duration-300">
                            <img
                                src="/assets/ashwinsdk.svg"
                                alt="Ashwin SDK"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="hidden sm:block font-mono text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                            ashwinsdk
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavButton
                                key={item.href}
                                item={item}
                                isActive={activeSection === item.href.slice(1)}
                                onClick={() => handleNavClick(item.href)}
                            />
                        ))}
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Social Icons */}
                        <div className="flex items-center gap-1">
                            {socialLinks.map((link) => {
                                const Icon = iconMap[link.icon]
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-icon"
                                        aria-label={link.name}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                )
                            })}
                        </div>

                        {/* Primary CTA */}
                        <motion.a
                            href={`mailto:${contact.email}`}
                            className="btn-primary text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="lg:hidden relative flex items-center gap-2 px-4 py-2.5 bg-neon-500 text-dark-900 rounded-lg font-mono text-sm font-semibold"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMenuOpen ? (
                            <>
                                <span>Close</span>
                                <X className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                <span>Menu</span>
                                <Menu className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="fixed inset-0 z-40 lg:hidden"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants.menuSlide}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-dark-900"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Menu Content */}
                        <div className="relative h-full flex flex-col pt-24 pb-8 px-6">
                            {/* Navigation Links */}
                            <nav className="flex-1">
                                <motion.ul
                                    className="space-y-2"
                                    variants={variants.staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {navItems.map((item, index) => (
                                        <motion.li
                                            key={item.href}
                                            variants={variants.staggerItem}
                                        >
                                            <button
                                                onClick={() => handleNavClick(item.href)}
                                                className={`block w-full text-left py-4 border-b border-white/10 transition-colors ${activeSection === item.href.slice(1)
                                                    ? 'text-neon-500'
                                                    : 'text-white hover:text-neon-400'
                                                    }`}
                                            >
                                                <span className="text-3xl sm:text-4xl font-light tracking-tight">
                                                    {item.label}
                                                </span>
                                            </button>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </nav>

                            {/* Bottom Section */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {/* Social Links */}
                                <div>
                                    <p className="text-white/50 text-sm font-mono mb-4">Follow Me</p>
                                    <div className="flex items-center gap-3">
                                        {socialLinks.map((link) => {
                                            const Icon = iconMap[link.icon]
                                            return (
                                                <a
                                                    key={link.name}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-neon-500/10 hover:border-neon-500/30 transition-all"
                                                    aria-label={link.name}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center justify-between w-full px-6 py-4 bg-neon-500 text-dark-900 rounded-lg font-mono font-semibold group"
                                >
                                    <span>GET IN TOUCH</span>
                                    <div className="p-2 bg-dark-500 rounded group-hover:bg-dark-400 transition-colors">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// Nav button component for desktop
function NavButton({ item, isActive, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className={`relative px-4 py-2 font-mono text-sm rounded-lg border transition-all duration-200 ${isActive
                ? 'text-neon-500 border-neon-500/30 bg-neon-500/5'
                : 'text-white/70 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/5'
                }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Active indicator dot */}
            <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-neon-500' : 'bg-white/30'
                }`} />
            {item.label}
        </motion.button>
    )
}
