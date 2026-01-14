import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PlanetHero() {
    const containerRef = useRef()
    const planetRef = useRef()
    const [isMobile, setIsMobile] = useState(false)

    // Check for mobile/tablet on mount
    const [deviceType, setDeviceType] = useState('desktop')

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            if (width < 768) {
                setDeviceType('mobile')
                setIsMobile(true)
            } else if (width < 1024) {
                setDeviceType('tablet')
                setIsMobile(true)
            } else {
                setDeviceType('desktop')
                setIsMobile(false)
            }
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)
        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    useEffect(() => {
        if (!planetRef.current || !containerRef.current) return

        // Initial position based on screen size
        const isMobileView = window.innerWidth < 768

        // Set initial transform - planet starts visible
        gsap.set(planetRef.current, {
            x: '0%',
            y: '0%',
            opacity: 1,
        })

        // Create scroll-triggered animation for parallax + fade
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '60% top',
                scrub: 0.5,
            },
        })

        // Parallax movement + fade out as you scroll
        tl.to(planetRef.current, {
            x: isMobileView ? '5%' : '10%',   // Slight drift right
            y: isMobileView ? '-15%' : '-25%', // Drift up
            opacity: 0,  // Fade out while scrolling
            ease: 'none',
        })

        // Also animate container opacity for smooth fade
        const containerTl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '40% top',
                scrub: 0.5,
            },
        })

        containerTl.to(containerRef.current, {
            opacity: 0,
            ease: 'none',
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [isMobile])

    return (
        <div
            ref={containerRef}
            className="planet-container"
        >
            {/* Subtle noise overlay */}
            <div className="planet-noise" />

            {/* Planet image */}
            <div
                ref={planetRef}
                className="planet-image"
            >
                <img
                    src={
                        deviceType === 'mobile'
                            ? '/assets/planet/planet-mobile.png'
                            : deviceType === 'tablet'
                                ? '/assets/planet/planet.webp'
                                : '/assets/planet/planet.webp'
                    }
                    alt=""
                    draggable={false}
                />
            </div>

            {/* Subtle glow effect */}
            <div className="planet-glow" />
        </div>
    )
}

export { ScrollTrigger }
