import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BlackOverlay() {
    const overlayRef = useRef()
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        // Create scroll trigger for the black overlay fade
        const trigger = ScrollTrigger.create({
            trigger: document.body,
            start: '40% top',
            end: '70% top',
            scrub: 1,
            onUpdate: (self) => {
                // Calculate opacity based on scroll progress
                const progress = self.progress
                setOpacity(Math.min(1, progress))
            },
        })

        return () => {
            trigger.kill()
        }
    }, [])

    return (
        <div
            ref={overlayRef}
            className="black-overlay"
            style={{ opacity }}
            aria-hidden="true"
        />
    )
}
