"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const seasonalImages = [
  {
    url: "https://images.pexels.com/photos/280014/pexels-photo-280014.jpeg",
    season: "Spring",
    description: "Luxury private jet amid blossoming cherry trees"
  },
  {
    url: "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg",
    season: "Summer",
    description: "Private jet on coastal tarmac"
  },
  {
    url: "https://images.pexels.com/photos/1589300/pexels-photo-1589300.jpeg",
    season: "Autumn",
    description: "Private jet against fall foliage"
  },
  {
    url: "https://images.pexels.com/photos/1098745/pexels-photo-1098745.jpeg",
    season: "Winter",
    description: "Private jet in serene winter setting"
  }
]

export default function SeasonalJetCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % seasonalImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % seasonalImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((current) => 
      current === 0 ? seasonalImages.length - 1 : current - 1
    )
  }

  return (
    <section className="relative w-full py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Experience Luxury in Every Season
        </h2>
        
        <div className="relative aspect-[16/9] w-full max-w-6xl mx-auto overflow-hidden rounded-lg">
          {/* Main Image */}
          <div className="relative w-full h-full">
            <Image
              src={seasonalImages[currentIndex].url}
              alt={seasonalImages[currentIndex].description}
              fill
              className="object-cover transition-opacity duration-500"
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Season Indicator */}
          <div className="absolute bottom-8 left-8 bg-black/70 px-6 py-3 rounded-full">
            <p className="text-white font-semibold text-lg">
              {seasonalImages[currentIndex].season}
            </p>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {seasonalImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}