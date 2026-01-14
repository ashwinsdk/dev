import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],
    build: {
        // Improve chunk size warnings
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate three.js into its own chunk
                    three: ['three'],
                    'three-fiber': ['@react-three/fiber', '@react-three/drei'],
                    motion: ['framer-motion', 'gsap'],
                    // Vendor chunk for other deps
                    vendor: ['react', 'react-dom'],
                },
                // Use content hash for better caching
                assetFileNames: 'assets/[name]-[hash][extname]',
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
            },
        },
        // Use default esbuild minification (faster, no extra dep)
        minify: 'esbuild',
        // Disable source maps for production
        sourcemap: false,
    },
    optimizeDeps: {
        include: ['three', '@react-three/fiber', '@react-three/drei', 'react', 'react-dom'],
    },
    // Improve dev experience
    server: {
        warmup: {
            clientFiles: [
                './src/App.jsx',
                './src/components/SpaceBackground.jsx',
            ],
        },
    },
})
