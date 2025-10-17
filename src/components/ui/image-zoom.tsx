"use client";
 
import { Plus } from 'lucide-react'
import React, { useState } from "react";

export const Component = () => {  
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div>
      {/* Zoom overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={handleImageClick}
        >
          <img
            src="https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1"
            alt="Close up of human hand"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      <div className="border-brand/10 relative mx-auto my-6 flex h-[336px] max-w-[250px] flex-col items-start border p-4 md:h-[28rem] md:max-w-sm">
        <Plus
          strokeWidth={0.5}
          className="text-[#fff200] absolute -left-4 -top-4 h-8 w-8"
        />
        <Plus
          strokeWidth={0.5}
          className="text-[#fff200] absolute -bottom-4 -left-4 h-8 w-8"
        />
        <Plus
          strokeWidth={0.5}
          className="text-[#fff200] absolute -right-4 -top-4 h-8 w-8"
        />
        <Plus
          strokeWidth={0.5}
          className="text-[#fff200] absolute -bottom-4 -right-4 h-8 w-8"
        />
        
        <div className="cursor-pointer" onClick={handleImageClick}>
          <img
            src="https://images.pexels.com/photos/327540/pexels-photo-327540.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&dpr=1"
            alt="Close up of human hand"
            className="h-[300px] w-full object-cover md:h-[404px]"
          />
          <div className="relative -mt-14 bg-gradient-to-b from-black/0 to-black text-white md:-mt-24">
            <h1 className="z-20 items-center text-center text-[40px] font-black tracking-tighter md:text-[70px]">Team Lead</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Component as ImageZoom };