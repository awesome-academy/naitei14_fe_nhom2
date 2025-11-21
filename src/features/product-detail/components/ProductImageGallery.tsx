import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CLASS_IMAGE_COVER } from '@/constants/common'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const mainImage = images[selectedImageIndex] || images[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={mainImage}
          alt={productName}
          className={CLASS_IMAGE_COVER}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                selectedImageIndex === index
                  ? 'border-green-primary'
                  : 'border-transparent hover:border-gray-300'
              )}
              aria-label={`Xem hình ảnh ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} - Hình ${index + 1}`}
                className={CLASS_IMAGE_COVER}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

