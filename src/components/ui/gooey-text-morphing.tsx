"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const animationStateRef = React.useRef<{
    textIndex: number;
    time: Date;
    morph: number;
    cooldown: number;
    animationId?: number;
  }>({
    textIndex: texts.length - 1,
    time: new Date(),
    morph: 0,
    cooldown: cooldownTime
  });

  React.useEffect(() => {
    // Don't restart animation - use existing state
    const state = animationStateRef.current;
    // Don't restart animation - use existing state
    const animState = animationStateRef.current;
    let textIndex = animState.textIndex;
    let time = animState.time;
    let morph = animState.morph;
    let cooldown = animState.cooldown;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      animState.morph = morph;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      animState.morph = morph;
      animState.cooldown = cooldown;
      setMorph(fraction);
    };

    function animate() {
      animState.animationId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      animState.time = time;

      cooldown -= dt;
      animState.cooldown = cooldown;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          animState.textIndex = textIndex;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    // Initialize text content if not already set
    if (text1Ref.current && text2Ref.current) {
      if (!text1Ref.current.textContent) {
        text1Ref.current.textContent = texts[textIndex % texts.length];
      }
      if (!text2Ref.current.textContent) {
        text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
      }
    }

    animate();

    return () => {
      if (animState.animationId) {
        cancelAnimationFrame(animState.animationId);
      }
    };
  }, [texts, morphTime, cooldownTime]); // Only depend on essential props, not theme changes

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
}