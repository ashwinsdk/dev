import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HighlightedProjects from './components/HighlightedProjects'
import MoreProjects from './components/MoreProjects'
import AboutSection from './components/AboutSection'
import PricingSection from './components/PricingSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import { preloadSpaceModel } from './components/SpaceBackground'
import { preloadCriticalAssets, preloadSecondaryAssets } from './lib/assetPreloader'

gsap.registerPlugin(ScrollTrigger)

// Loading screen component
function LoadingScreen() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-dark-900 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Logo */}
                <motion.div
                    className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <img
                        src="/assets/ashwinsdk.svg"
                        alt="Loading"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Loading bar */}
                <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-neon-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                </div>

                <span className="text-sm font-mono text-white/40">Loading...</span>
            </div>
        </motion.div>
    )
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        // Minimum display time for the loading screen
        const minDelay = new Promise((resolve) => setTimeout(resolve, 1200))

        // Preload critical assets in parallel
        const criticalLoad = Promise.all([
            preloadSpaceModel().catch(() => null),
            preloadCriticalAssets().catch(() => null),
        ])

        Promise.all([minDelay, criticalLoad]).then(() => {
            if (!cancelled) {
                setIsLoading(false)
                // Start loading secondary assets after main content is visible
                preloadSecondaryAssets()
            }
        })

        // Safety timeout in case of network issues (increased for slower connections)
        const failSafe = setTimeout(() => {
            if (!cancelled) {
                setIsLoading(false)
                preloadSecondaryAssets()
            }
        }, 5000)

        return () => {
            cancelled = true
            clearTimeout(failSafe)
        }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            // Refresh ScrollTrigger after content loads
            ScrollTrigger.refresh()
        }
    }, [isLoading])

    // Handle smooth scroll for anchor links
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest('a[href^="#"]')
            if (target) {
                e.preventDefault()
                const id = target.getAttribute('href').slice(1)
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>

            {/* Main Content */}
            <div className="main-content">
                {/* Navigation */}
                <Navbar />

                {/* Page Sections */}
                <main>
                    <HeroSection />
                    <HighlightedProjects />
                    <MoreProjects />
                    <AboutSection />
                    <PricingSection />
                    <CTASection />
                </main>

                {/* Footer */}
                <Footer />
            </div>

            {/* Skip to content link for accessibility */}
            <a
                href="#projects"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-neon-500 focus:text-dark-500 focus:rounded-lg"
            >
                Skip to content
            </a>
        </>
    )
}
