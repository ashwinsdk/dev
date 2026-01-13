// Motion tokens for consistent animations across the site
export const motion = {
    // Durations
    duration: {
        fast: 0.15,
        normal: 0.25,
        slow: 0.4,
        slower: 0.6,
        slowest: 1,
    },

    // Easing curves
    ease: {
        smooth: [0.4, 0, 0.2, 1],
        smoothOut: [0, 0, 0.2, 1],
        smoothIn: [0.4, 0, 1, 1],
        bounce: [0.68, -0.55, 0.265, 1.55],
        spring: [0.175, 0.885, 0.32, 1.275],
        elastic: [0.68, -0.6, 0.32, 1.6],
    },

    // Common transition configs
    transition: {
        fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
        normal: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        slow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        spring: { type: 'spring', stiffness: 300, damping: 30 },
        springBouncy: { type: 'spring', stiffness: 400, damping: 25 },
    },

    // Stagger children delay
    stagger: {
        fast: 0.05,
        normal: 0.1,
        slow: 0.15,
    },
}

// Animation variants for Framer Motion
export const variants = {
    // Fade animations
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: motion.transition.normal },
    },

    fadeInUp: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: motion.ease.smooth }
        },
    },

    fadeInDown: {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: motion.ease.smooth }
        },
    },

    // Scale animations
    scaleIn: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: motion.ease.smooth }
        },
    },

    // Slide animations
    slideInLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: motion.ease.smooth }
        },
    },

    slideInRight: {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: motion.ease.smooth }
        },
    },

    // Container with stagger
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: motion.stagger.normal,
                delayChildren: 0.1,
            },
        },
    },

    staggerItem: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: motion.ease.smooth }
        },
    },

    // Menu animations
    menuSlide: {
        hidden: { opacity: 0, y: '-100%' },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: motion.ease.smooth }
        },
        exit: {
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.3, ease: motion.ease.smoothIn }
        },
    },

    // Card hover
    cardHover: {
        rest: {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
        },
        hover: {
            scale: 1.02,
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 102, 0.2)'
        },
    },

    // Button glow
    buttonGlow: {
        rest: {
            boxShadow: '0 0 0 rgba(0, 255, 102, 0)'
        },
        hover: {
            boxShadow: '0 0 30px rgba(0, 255, 102, 0.5), 0 0 60px rgba(0, 255, 102, 0.2)'
        },
    },
}

// Scroll trigger configuration
export const scrollConfig = {
    // Hero section scroll triggers
    hero: {
        planetDollyStart: 0,
        planetDollyEnd: 0.5,
        fadeToBlackStart: 0.6,
        fadeToBlackEnd: 0.85,
    },

    // Section reveal thresholds
    reveal: {
        start: 'top 80%',
        end: 'top 20%',
    },
}

// Reduced motion check
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get motion-safe variants
export const getMotionVariants = (variants) => {
    if (prefersReducedMotion()) {
        return {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0 } },
        }
    }
    return variants
}
