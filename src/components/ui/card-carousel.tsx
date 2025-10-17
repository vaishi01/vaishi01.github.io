"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"

interface CarouselCard {
  icon: React.ReactNode
  title: string
  description: string
}

interface CarouselProps {
  cards: CarouselCard[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  title?: string
  subtitle?: string
}

export const CardCarousel: React.FC<CarouselProps> = ({
  cards,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = false,
  title = "Benefits",
  subtitle = "Seamless advantages for your business."
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 400px;
  }
  
  .swiper-slide .card-content {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  
  .swiper-pagination-bullet {
    background: #3b82f6;
    opacity: 0.5;
  }
  
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
  `
  
  return (
    <section className="w-full space-y-4">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-6xl rounded-[24px] border border-zinc-200 dark:border-zinc-800 p-2 shadow-sm bg-white dark:bg-black transition-colors duration-300">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-gray-900 p-6 shadow-sm transition-colors duration-300">
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-[14px] border border-blue-500/20 bg-blue-50 dark:bg-blue-900/20 text-base md:left-6"
          >
            <SparklesIcon className="fill-blue-400 stroke-1 text-blue-600 dark:text-blue-400 mr-1" />
            Ready-to-Deploy
          </Badge>
          
          <div className="flex flex-col justify-center pb-2 pl-4 pt-14 md:items-center">
            <div className="flex gap-2">
              <div className="text-center">
                <h3 className="text-4xl opacity-85 font-bold tracking-tight text-black dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4 mt-6">
            <div className="w-full">
              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {cards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="card-content bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-lg transition-colors duration-300">
                      <div className="flex flex-col items-center text-center space-y-4 h-full">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-300">
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm flex-1">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}