/**
 * Asset Preloading Utilities
 * Handles preloading of images, GLB models, and other assets
 * to ensure smooth first-load experience
 */

// Cache for tracking loaded assets
const loadedAssets = new Set()
const loadingPromises = new Map()

/**
 * Preload an image and return a promise
 */
export function preloadImage(src) {
    if (loadedAssets.has(src)) {
        return Promise.resolve()
    }

    if (loadingPromises.has(src)) {
        return loadingPromises.get(src)
    }

    const promise = new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            loadedAssets.add(src)
            loadingPromises.delete(src)
            resolve(img)
        }
        img.onerror = () => {
            loadingPromises.delete(src)
            reject(new Error(`Failed to load image: ${src}`))
        }
        img.src = src
    })

    loadingPromises.set(src, promise)
    return promise
}

/**
 * Preload multiple images in parallel
 */
export function preloadImages(sources) {
    return Promise.allSettled(sources.map(preloadImage))
}

/**
 * Preload a fetch resource (like GLB files)
 */
export function preloadFetch(url) {
    if (loadedAssets.has(url)) {
        return Promise.resolve()
    }

    if (loadingPromises.has(url)) {
        return loadingPromises.get(url)
    }

    const promise = fetch(url, {
        method: 'GET',
        cache: 'force-cache',
        credentials: 'same-origin'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }
            loadedAssets.add(url)
            loadingPromises.delete(url)
            return response
        })
        .catch(err => {
            loadingPromises.delete(url)
            console.warn(`Failed to preload: ${url}`, err)
            // Don't throw - allow graceful degradation
            return null
        })

    loadingPromises.set(url, promise)
    return promise
}

/**
 * Critical assets that must load before app is interactive
 */
export const criticalAssets = {
    logo: '/assets/ashwinsdk.svg',
    spaceModel: '/assets/need_some_space.glb',
}

/**
 * Secondary assets that can load after initial render
 */
export const secondaryAssets = {
    projectPosters: [
        '/projects/rigledger/poster.webp',
        '/projects/urbandao/poster.webp',
        '/projects/xylen/poster.webp',
    ],
}

/**
 * Preload all critical assets
 * Returns a promise that resolves when critical assets are ready
 */
export async function preloadCriticalAssets() {
    const results = await Promise.allSettled([
        preloadImage(criticalAssets.logo),
        preloadFetch(criticalAssets.spaceModel),
    ])

    // Log any failures for debugging
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.warn(`Critical asset ${index} failed to preload:`, result.reason)
        }
    })

    return results
}

/**
 * Preload secondary assets (call after initial render)
 */
export function preloadSecondaryAssets() {
    // Use requestIdleCallback for non-critical assets
    const loadAssets = () => {
        preloadImages(secondaryAssets.projectPosters)
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadAssets, { timeout: 3000 })
    } else {
        setTimeout(loadAssets, 1000)
    }
}

/**
 * Check if an asset is already loaded
 */
export function isAssetLoaded(url) {
    return loadedAssets.has(url)
}
