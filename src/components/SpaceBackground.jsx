import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

// Loading fallback component
function LoadingFallback() {
    return (
        <mesh>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="#000000" />
        </mesh>
    )
}

function OuterSpaceModel() {
    const group = useRef()
    const { scene } = useGLTF('/assets/need_some_space.glb')
    const scrollProgress = useRef(0)
    const [isReady, setIsReady] = useState(false)
    const [base, setBase] = useState({
        // Start heavily zoomed-in to meet the new default requirement
        scale: 40,
        position: [-55, -65, 1.5],
        zoomRange: 0.6,
    })

    useEffect(() => {
        // Map scroll within the hero to a normalized 0..1 progress
        const handleScroll = () => {
            const hero = document.getElementById('hero')
            if (!hero) return
            const rect = hero.getBoundingClientRect()
            const height = hero.offsetHeight || 1
            const traveled = Math.min(Math.max(-rect.top, 0), height)
            scrollProgress.current = traveled / height
        }

        // Responsive base scale and position to avoid showing edges/corners
        const updateBase = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            const aspect = w / Math.max(h, 1)

            // Tuned values to guarantee coverage across breakpoints
            // if (w <= 480) {
            //     // Small mobile: extreme default zoom
            //     setBase({ scale: 55, position: [-22, -32, 1.5], zoomRange: 0.7 })
            // } else if (w <= 768) {
            //     // Mobile
            //     setBase({ scale: 50, position: [-21, -30, 1.5], zoomRange: 0.65 })
            // } else if (w <= 1024) {
            //     // Tablet
            //     setBase({ scale: 45, position: [-20, -27, 1.5], zoomRange: 0.6 })
            // } else {
            //     // Desktop (still heavily zoomed in by default)
            //     // setBase({ scale: 40, position: [-20, -28, 1.5], zoomRange: 0.6 })
            // }
        }

        handleScroll()
        updateBase()

        // Mark as ready after scene is loaded
        if (scene) {
            setIsReady(true)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', updateBase)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateBase)
        }
    }, [scene])

    // Scroll-linked zoom (scale) with slight vertical parallax; no rotation
    useFrame(() => {
        if (group.current && isReady) {
            const progress = scrollProgress.current
            const targetScale = base.scale * (1 + progress * base.zoomRange)
            group.current.scale.setScalar(targetScale)

            // Keep the planet anchored visually near the lower-left
            const yParallax = base.position[1] - progress * 3.5
            group.current.position.set(base.position[0], yParallax, base.position[2])

            // Ensure no unintended rotation
            group.current.rotation.set(0, 0, 0)
        }
    })

    return (
        <group ref={group} scale={base.scale} position={base.position}>
            <primitive object={scene} />
        </group>
    )
}

function Scene() {
    return (
        <>
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 2, 3]} intensity={1.2} />
            <directionalLight position={[-2, -1, -3]} intensity={0.3} color="#4de39f" />
            <OuterSpaceModel />
        </>
    )
}

export default function SpaceBackground() {
    return (
        <div className="space-bg-container" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 22, near: 0.01, far: 5000 }}
                // Slightly lower max DPR than default to keep FPS high on hi-dpi screens
                dpr={[1, 1.25]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    )
}

// Preload the GLB model immediately
useGLTF.preload('/assets/need_some_space.glb')

// Export a manual preloader that resolves when the GLB is downloaded and cached.
// Uses fetch with cache to work with browser cache and service workers.
let spacePreloadPromise
export function preloadSpaceModel() {
    if (!spacePreloadPromise) {
        spacePreloadPromise = new Promise((resolve, reject) => {
            // First, try to fetch the model to warm up the cache
            fetch('/assets/need_some_space.glb', {
                method: 'GET',
                cache: 'force-cache',
                credentials: 'same-origin'
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok')
                    return response.arrayBuffer()
                })
                .then(() => {
                    // Now load with GLTFLoader (should hit cache)
                    const loader = new GLTFLoader()
                    loader.load(
                        '/assets/need_some_space.glb',
                        (gltf) => resolve(gltf),
                        undefined,
                        reject
                    )
                })
                .catch(err => {
                    // Fallback: try direct GLTFLoader
                    const loader = new GLTFLoader()
                    loader.load(
                        '/assets/need_some_space.glb',
                        (gltf) => resolve(gltf),
                        undefined,
                        reject
                    )
                })
        })
    }
    return spacePreloadPromise
}
