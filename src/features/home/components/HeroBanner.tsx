import { useState, useEffect } from 'react'
import {
  CLASS_DOT_INDICATOR,
  AUTO_SLIDE_INTERVAL_MS,
  CLASS_SVG_ICON_MD,
} from '@/constants/common'
import { IMAGES } from '@/constants/images'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline'

interface Slide {
  id: number
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: IMAGES.HERO_BANNER,
  },
  {
    id: 2,
    image: IMAGES.HERO_BANNER,
  },
  {
    id: 3,
    image: IMAGES.HERO_BANNER,
  },
]

export const RenderHeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, AUTO_SLIDE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const handleGoToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleGoToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleGoToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section 
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden" 
      role="region" 
      aria-label="Banner quảng cáo sản phẩm"
    >
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        Slide {currentSlide + 1} of {slides.length}
      </div>
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
            aria-label={`Slide ${index + 1} of ${slides.length}`}
          />
        ))}
      </div>

      <button
        onClick={handleGoToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className={CLASS_SVG_ICON_MD} />
      </button>
      <button
        onClick={handleGoToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRightIcon className={CLASS_SVG_ICON_MD} />
      </button>

      <button
        onClick={handleTogglePause}
        className="absolute top-4 right-4 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        aria-label={isPaused ? 'Tiếp tục trình chiếu' : 'Tạm dừng trình chiếu'}
      >
        {isPaused ? (
          <PlayIcon className={CLASS_SVG_ICON_MD} />
        ) : (
          <PauseIcon className={CLASS_SVG_ICON_MD} />
        )}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-3 h-3 bg-white'
                : `${CLASS_DOT_INDICATOR} cursor-pointer`
            }`}
            aria-label={`Chuyển đến slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  )
}

