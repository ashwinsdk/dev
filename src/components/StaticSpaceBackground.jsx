import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

// Simple loading fallback
function LoadingFallback() {
    return (
        <mesh>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="#0a0a0a" />
        </mesh>
    )
}

function OuterSpaceModel() {
    const group = useRef()
    // Reuse the same GLB as hero (already cached)
    const { scene } = useGLTF('/assets/need_some_space.glb')

    // Static position - no scroll tracking for CTA section
    useFrame(() => {
        if (group.current) {
            group.current.scale.setScalar(35)
            group.current.position.set(-50, -60, 1.5)
            group.current.rotation.set(0, 0, 0)
        }
    })

    return (
        <group ref={group}>
            <primitive object={scene.clone()} />
        </group>
    )
}

function Scene() {
    return (
        <>
            <color attach="background" args={['#0a0a0a']} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[2, 2, 3]} intensity={1.2} />
            <directionalLight position={[-2, -1, -3]} intensity={0.3} color="#4de39f" />
            <OuterSpaceModel />
        </>
    )
}

export default function StaticSpaceBackground() {
    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            <Canvas
                camera={{ position: [0, 0, 1], fov: 22, near: 0.01, far: 5000 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                    preserveDrawingBuffer: true,
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#0a0a0a'
                }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    )
}
