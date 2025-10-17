"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

// The original `cn` import was conflicting with the local `cn` function.
// Since we are only allowed to edit this file and cannot affect other files,
// we will remove the import and rely on the local `cn` function provided.
// import { cn } from "@/lib/utils" 

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 0, 0], // Default red
  glowColor: [1, 1, 1],
  markers: [
    // Red markers - Primary locations
    { location: [28.6139, 77.2090], size: 0.1, color: [1, 0, 0] }, // New Delhi - Red (Headquarters)
    { location: [40.7128, -74.006], size: 0.08, color: [1, 0, 0] }, // New York - Red
    { location: [51.5074, -0.1278], size: 0.08, color: [1, 0, 0] }, // London - Red
    { location: [35.6762, 139.6503], size: 0.08, color: [1, 0, 0] }, // Tokyo - Red
    { location: [-33.8688, 151.2093], size: 0.08, color: [1, 0, 0] }, // Sydney - Red
    { location: [19.0760, 72.8777], size: 0.08, color: [1, 0, 0] }, // Mumbai - Red
    
    // Blue markers - Partner/Client locations
    { location: [37.7749, -122.4194], size: 0.08, color: [0, 0.4, 1] }, // San Francisco - Blue
    { location: [48.8566, 2.3522], size: 0.08, color: [0, 0.4, 1] }, // Paris - Blue
    { location: [55.7558, 37.6176], size: 0.08, color: [0, 0.4, 1] }, // Moscow - Blue
    { location: [-26.2041, 28.0473], size: 0.08, color: [0, 0.4, 1] }, // Johannesburg - Blue
    { location: [13.0827, 80.2707], size: 0.08, color: [0, 0.4, 1] }, // Chennai - Blue
    { location: [12.9716, 77.5946], size: 0.08, color: [0, 0.4, 1] }, // Bangalore - Blue
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  // Use useRef for mutable values that don't trigger re-renders
  const phi = useRef(0);
  const theta = useRef(0.3); // Added theta ref for vertical rotation
  const width = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null) // Explicitly type as number | null
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0) // Horizontal rotation speed
  const [t, setT] = useState(0) // Vertical rotation speed

  const updatePointerInteraction = (value: number | null) => { // Explicitly type value
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab" // Check for null
    }
  }

  const updateMovement = (clientX: number, clientY: number) => { // Added clientY
    if (pointerInteracting.current !== null) {
      const deltaX = clientX - pointerInteracting.current
      // For vertical movement, we need a separate initial Y to calculate deltaY
      // Since pointerInteracting.current is used for initial X, we'll use pointerInteractionMovement.current for initial Y
      const deltaY = clientY - pointerInteractionMovement.current; 
      
      // Adjust rotation speed based on mouse movement
      setR(deltaX / 200); // Horizontal speed
      setT(deltaY / 200); // Vertical speed
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (pointerInteracting.current === null) {
        phi.current += 0.005; // Access .current
      } else {
        phi.current += r; // Apply horizontal drag
        theta.current += t; // Apply vertical drag
      }
      state.phi = phi.current;
      state.theta = theta.current;
      state.width = width.current * 2; // Access .current
      state.height = width.current * 2; // Access .current
    },
    [r, t], // Add t to dependency array
  )

  const onResize = () => {
    if (canvasRef.current) {
      width.current = canvasRef.current.offsetWidth // Access .current
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    // Ensure canvasRef.current is not null before passing to createGlobe
    let globe: any; // Declare globe variable
    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        ...config,
        width: width.current * 2, // Access .current
        height: width.current * 2, // Access .current
        onRender,
      })
    }


    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 0); // Use 0 for immediate execution after current render cycle

    return () => {
      window.removeEventListener("resize", onResize);
      if (globe) { // Check if globe was initialized before destroying
        globe.destroy();
      }
    }
  }, [config, onRender]) // Add config and onRender to dependency array

  return (
    <div
      className={cn(
                "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          // Store initial clientX for horizontal drag
          updatePointerInteraction(e.clientX); 
          // Store initial clientY for vertical drag
          pointerInteractionMovement.current = e.clientY; 
        }}
        onPointerUp={() => {
          updatePointerInteraction(null);
          setR(0); // Stop horizontal rotation
          setT(0); // Stop vertical rotation
        }}
        onPointerOut={() => {
          updatePointerInteraction(null);
          setR(0); // Stop horizontal rotation
          setT(0); // Stop vertical rotation
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            updateMovement(e.clientX, e.clientY);
          }
        }}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX, e.touches[0].clientY)
        }
      />
    </div>
  )
}

// Helper function for cn (assuming it's a simple classnames utility)
// In a real project, this would be imported from a utility file.
// For this single-file output, it's included here.
type ClassValue = string | undefined | null | boolean | Record<string, any>;

function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}