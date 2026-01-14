import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PlanetLayer() {
    const containerRef = useRef()
    const planetRef = useRef()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (!planetRef.current || !containerRef.current || !isLoaded) return

        // Set initial state
        gsap.set(planetRef.current, {
            scale: 1,
            y: '0%',
            opacity: 1,
        })

        // Create scroll-triggered animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '80% top',
                scrub: 0.8,
            },
        })

        // Planet slowly scales up and moves up while fading
        tl.to(planetRef.current, {
            scale: 1.15,
            y: '-8%',
            opacity: 0,
            ease: 'none',
        })

        // Container fades out
        const containerTl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: '50% top',
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
    }, [isLoaded])

    return (
        <div ref={containerRef} className="planet-layer">
            <div ref={planetRef} className="planet-wrapper">
                <img
                    src="/assets/planet.webp"
                    alt=""
                    draggable={false}
                    onLoad={() => setIsLoaded(true)}
                    className="planet-img"
                />
            </div>
        </div>
    )
}
