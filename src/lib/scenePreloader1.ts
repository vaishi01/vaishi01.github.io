// src/utils/enhancedScenePreloader.ts
class EnhancedScenePreloader {
  private static instance: EnhancedScenePreloader;
  private preloadedAssets: Map<string, any> = new Map();
  private isPreloading: boolean = false;
  private splineScenes: Map<string, any> = new Map();
  private preloadingSpline: Set<string> = new Set();
  private splineInstances: Map<string, HTMLIFrameElement> = new Map();

  static getInstance(): EnhancedScenePreloader {
    if (!EnhancedScenePreloader.instance) {
      EnhancedScenePreloader.instance = new EnhancedScenePreloader();
    }
    return EnhancedScenePreloader.instance;
  }

  // Original Three.js scene preloading for AJA Story
  async preloadScene() {
    if (this.isPreloading || this.preloadedAssets.has('ajaStoryScene')) {
      return this.preloadedAssets.get('ajaStoryScene');
    }

    this.isPreloading = true;
    
    try {
      console.log('🚀 Starting AJA Story Three.js scene preloading...');
      
      // Preload Three.js essentials
      const THREE = await import('three');
      
      // Pre-create geometry and material that will be reused for all 50 boxes
      const shape = new THREE.Shape();
      const angleStep = Math.PI * 0.5;
      const radius = 1;
      shape.absarc(2, 2, radius, angleStep * 0, angleStep * 1);
      shape.absarc(-2, 2, radius, angleStep * 1, angleStep * 2);
      shape.absarc(-2, -2, radius, angleStep * 2, angleStep * 3);
      shape.absarc(2, -2, radius, angleStep * 3, angleStep * 4);
      
      const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 20,
        curveSegments: 20
      };
      
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      
      const material = new THREE.MeshPhysicalMaterial({
        color: "#232323",
        metalness: 1,
        roughness: 0.3,
        reflectivity: 0.5,
        ior: 1.5,
        emissive: "#000000",
        emissiveIntensity: 0,
        transparent: false,
        opacity: 1.0,
        transmission: 0.0,
        thickness: 0.5,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
        sheen: 0,
        sheenRoughness: 1.0,
        sheenColor: "#ffffff",
        specularIntensity: 1.0,
        specularColor: "#ffffff",
        iridescence: 1,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 400],
        flatShading: false,
        side: THREE.FrontSide,
        alphaTest: 0,
        depthWrite: true,
        depthTest: true
      });

      const preloadedAssets = {
        THREE,
        geometry: geometry.clone(),
        material: material.clone(),
        ready: true,
        timestamp: Date.now()
      };

      this.preloadedAssets.set('ajaStoryScene', preloadedAssets);
      this.isPreloading = false;
      
      console.log('✅ AJA Story Three.js scene assets preloaded successfully!');
      
      return preloadedAssets;
    } catch (error) {
      console.error('❌ AJA Story scene preloading failed:', error);
      this.isPreloading = false;
      return null;
    }
  }

  // Enhanced Spline scene preloading with multiple strategies
  async preloadSplineScene(sceneUrl: string, sceneName: string, priority: 'high' | 'normal' = 'high') {
    if (this.preloadingSpline.has(sceneName) || this.splineScenes.has(sceneName)) {
      return this.splineScenes.get(sceneName);
    }

    this.preloadingSpline.add(sceneName);
    
    try {
      console.log(`🚀 [${priority.toUpperCase()}] Starting Spline ${sceneName} preload...`);
      
      const startTime = Date.now();
      
      // Use the most aggressive strategy for instant loading
      const result = await this.preloadViaIframe(sceneUrl, sceneName, priority);
      
      const loadTime = Date.now() - startTime;
      const preloadedData = {
        url: sceneUrl,
        sceneName,
        preloaded: true,
        timestamp: Date.now(),
        loadTime,
        strategy: 'iframe',
        priority,
        iframe: result.iframe
      };

      this.splineScenes.set(sceneName, preloadedData);
      this.preloadingSpline.delete(sceneName);
      
      console.log(`✅ Spline ${sceneName} preloaded in ${loadTime}ms`);
      
      return preloadedData;
    } catch (error) {
      console.warn(`⚠️ Spline ${sceneName} preloading error:`, error);
      this.preloadingSpline.delete(sceneName);
      
      const preloadedData = {
        url: sceneUrl,
        sceneName,
        preloaded: false,
        timestamp: Date.now(),
        error: error.message,
        priority
      };
      this.splineScenes.set(sceneName, preloadedData);
      return preloadedData;
    }
  }

  // Optimized iframe preloading strategy
  private async preloadViaIframe(sceneUrl: string, sceneName: string, priority: 'high' | 'normal'): Promise<{iframe: HTMLIFrameElement}> {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.position = 'fixed';
      iframe.style.left = '-9999px';
      iframe.style.width = '400px'; // Larger size for better preloading
      iframe.style.height = '300px';
      iframe.style.zIndex = '-1000';
      iframe.style.pointerEvents = 'none';
      iframe.src = sceneUrl;
      iframe.title = `Preloading ${sceneName}`;
      
      // Set iframe attributes for better performance
      iframe.setAttribute('loading', 'eager');
      iframe.setAttribute('importance', priority === 'high' ? 'high' : 'auto');
      
      const timeout = setTimeout(() => {
        resolve({ iframe }); // Resolve anyway to avoid blocking
      }, priority === 'high' ? 5000 : 8000); // Shorter timeout for high priority

      iframe.onload = () => {
        clearTimeout(timeout);
        console.log(`📦 Iframe loaded for ${sceneName}`);
        resolve({ iframe });
      };
      
      iframe.onerror = () => {
        clearTimeout(timeout);
        console.warn(`⚠️ Iframe error for ${sceneName}`);
        resolve({ iframe }); // Still resolve to avoid blocking
      };

      // Store iframe reference
      this.splineInstances.set(sceneName, iframe);
      document.body.appendChild(iframe);
    });
  }

  // Additional preloading via link prefetch
  private preloadViaLink(sceneUrl: string, sceneName: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = sceneUrl;
    link.as = 'document';
    document.head.appendChild(link);
    console.log(`🔗 Link prefetch started for ${sceneName}`);
  }

  // Preload via fetch for cache warming
  private async preloadViaFetch(sceneUrl: string, sceneName: string): Promise<void> {
    try {
      const response = await fetch(sceneUrl, { 
        method: 'GET',
        mode: 'no-cors', // Avoid CORS issues
        cache: 'force-cache'
      });
      console.log(`🌐 Fetch preload completed for ${sceneName}`);
    } catch (error) {
      console.warn(`⚠️ Fetch preload failed for ${sceneName}:`, error);
    }
  }

  // Method to start aggressive preloading with all strategies
  async aggressivePreload(sceneUrl: string, sceneName: string): Promise<any> {
    console.log(`🚀 Starting aggressive preload for ${sceneName}`);
    
    // Start all strategies in parallel
    const strategies = [
      this.preloadSplineScene(sceneUrl, sceneName, 'high'),
    ];

    // Add additional strategies
    this.preloadViaLink(sceneUrl, sceneName);
    this.preloadViaFetch(sceneUrl, sceneName);

    return Promise.race(strategies);
  }

  // Three.js methods
  getPreloadedAssets(key: string) {
    return this.preloadedAssets.get(key);
  }

  isAssetReady(key: string): boolean {
    const asset = this.preloadedAssets.get(key);
    return asset && asset.ready;
  }

  // Spline methods
  isSplineSceneReady(sceneName: string): boolean {
    const scene = this.splineScenes.get(sceneName);
    return scene && scene.preloaded;
  }

  getSplineScene(sceneName: string) {
    return this.splineScenes.get(sceneName);
  }

  // Get iframe instance for reuse
  getSplineIframe(sceneName: string): HTMLIFrameElement | undefined {
    return this.splineInstances.get(sceneName);
  }

  // Utility method to get preload status summary
  getPreloadStatus() {
    return {
      ajaStoryScene: this.isAssetReady('ajaStoryScene'),
      robotScene: this.isSplineSceneReady('robotScene'),
      allScenes: this.preloadedAssets.size + this.splineScenes.size,
      splineInstances: this.splineInstances.size,
      timestamp: new Date().toISOString()
    };
  }

  // Cleanup method
  cleanup(sceneName?: string) {
    if (sceneName) {
      const iframe = this.splineInstances.get(sceneName);
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
        this.splineInstances.delete(sceneName);
      }
    } else {
      // Cleanup all iframes
      this.splineInstances.forEach((iframe, name) => {
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      });
      this.splineInstances.clear();
    }
  }
}

export default EnhancedScenePreloader;