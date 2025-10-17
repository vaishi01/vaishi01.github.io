// Simplified and optimized scene preloader
class OptimizedScenePreloader {
  private static instance: OptimizedScenePreloader
  private preloadedAssets: Map<string, any> = new Map()
  private splineScenes: Map<string, any> = new Map()

  static getInstance(): OptimizedScenePreloader {
    if (!OptimizedScenePreloader.instance) {
      OptimizedScenePreloader.instance = new OptimizedScenePreloader()
    }
    return OptimizedScenePreloader.instance
  }

  // Instant Three.js scene setup
  async preloadScene() {
    if (this.preloadedAssets.has("ajaStoryScene")) {
      return this.preloadedAssets.get("ajaStoryScene")
    }

    try {
      const THREE = await import("three")

      // Pre-create optimized geometry and material
      const shape = new THREE.Shape()
      const radius = 1
      shape.absarc(2, 2, radius, 0, Math.PI * 0.5)
      shape.absarc(-2, 2, radius, Math.PI * 0.5, Math.PI)
      shape.absarc(-2, -2, radius, Math.PI, Math.PI * 1.5)
      shape.absarc(2, -2, radius, Math.PI * 1.5, Math.PI * 2)

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 10, // Reduced for performance
        curveSegments: 10, // Reduced for performance
      })
      geometry.center()

      const material = new THREE.MeshPhysicalMaterial({
        color: "#232323",
        metalness: 1,
        roughness: 0.3,
        reflectivity: 0.5,
      })

      const preloadedAssets = {
        THREE,
        geometry,
        material,
        ready: true,
        timestamp: Date.now(),
      }

      this.preloadedAssets.set("ajaStoryScene", preloadedAssets)
      return preloadedAssets
    } catch (error) {
      console.error("Scene preloading failed:", error)
      return null
    }
  }

  // Instant Spline scene setup
  async preloadSplineScene(sceneUrl: string, sceneName: string) {
    if (this.splineScenes.has(sceneName)) {
      return this.splineScenes.get(sceneName)
    }

    const preloadedData = {
      url: sceneUrl,
      sceneName,
      preloaded: true,
      timestamp: Date.now(),
      ready: true,
    }

    this.splineScenes.set(sceneName, preloadedData)
    return preloadedData
  }

  getPreloadedAssets(key: string) {
    return this.preloadedAssets.get(key)
  }

  getSplineScene(sceneName: string) {
    return this.splineScenes.get(sceneName)
  }

  isSplineSceneReady(sceneName: string): boolean {
    return this.splineScenes.has(sceneName)
  }
}

export default OptimizedScenePreloader
