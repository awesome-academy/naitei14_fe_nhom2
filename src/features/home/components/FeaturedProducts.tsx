import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { ProductCard } from '@/components/products/ProductCard'
import { Product } from '@/types/product'
import { getFeaturedProducts } from '@/apis/products'
import {
  CLASS_SECTION_WHITE,
  CLASS_GRID_LARGE_CARD_FIRST,
  CLASS_GRID_LARGE_CARD_SECOND,
} from '@/constants/common'

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFeaturedProducts()
        setProducts(data)
        setError(null)
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching products:', {
            error,
            context: 'FeaturedProducts',
            action: 'fetchProducts',
            timestamp: new Date().toISOString(),
          })
        }
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className={CLASS_SECTION_WHITE}>
        <Container>
          <div className="text-center" role="status" aria-live="polite">
            <span className="sr-only">Đang tải sản phẩm...</span>
            Loading...
          </div>
        </Container>
      </section>
    )
  }

  if (error) {
    return (
      <section className={CLASS_SECTION_WHITE}>
        <Container>
          <div className="text-center text-red-500" role="alert">
            {error}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className={CLASS_SECTION_WHITE}>
      <Container>
        <div className="mb-8">
          <div className="bg-green-primary text-white py-3 px-6 inline-block mb-4">
            <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const isLargeCard = index === 0 || index === 5
            
            let gridClasses = ''
            if (index === 0) {
              gridClasses = CLASS_GRID_LARGE_CARD_FIRST
            } else if (index === 5) {
              gridClasses = CLASS_GRID_LARGE_CARD_SECOND
            }
            
            return (
              <div key={product.id} className={gridClasses}>
                <ProductCard product={product} isLarge={isLargeCard} variant="home" />
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

