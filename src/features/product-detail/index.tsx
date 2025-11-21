import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Product } from '@/types/product'
import { getProductById } from '@/apis/products'
import { ProductImageGallery } from './components/ProductImageGallery'
import { ProductInfo } from './components/ProductInfo'
import { ProductTabs } from './components/ProductTabs'
import { RelatedProducts } from './components/RelatedProducts'
import { CLASS_SECTION_WHITE, CLASS_TEXT_CENTER_PY12 } from '@/constants/common'
import { logError } from '@/lib/logger'

export const RenderProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate('/products')
        return
      }

      setLoading(true)
      try {
        const productId = parseInt(id, 10)
        if (isNaN(productId)) {
          navigate('/products')
          return
        }

        const productData = await getProductById(productId)
        if (!productData) {
          navigate('/products')
          return
        }

        setProduct(productData)
      } catch (error) {
        logError({
          error,
          context: 'RenderProductDetail',
          action: 'fetchProduct',
          productId: id,
          timestamp: new Date().toISOString(),
          message: 'Error fetching product',
        })
        navigate('/products')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, navigate])

  if (loading) {
    return (
      <section className={CLASS_SECTION_WHITE}>
        <Container>
          <div className={CLASS_TEXT_CENTER_PY12}>
            <div className="text-gray-500">Đang tải...</div>
          </div>
        </Container>
      </section>
    )
  }

  if (!product) {
    return (
      <section className={CLASS_SECTION_WHITE}>
        <Container>
          <div className={CLASS_TEXT_CENTER_PY12}>
            <div className="text-gray-500 mb-2">Không tìm thấy sản phẩm</div>
            <button
              onClick={() => navigate('/products')}
              className="text-green-primary hover:underline"
            >
              Quay lại danh sách sản phẩm
            </button>
          </div>
        </Container>
      </section>
    )
  }

  const productImages = product.images || [product.image]

  return (
    <section className={CLASS_SECTION_WHITE}>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: product.name },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <ProductImageGallery images={productImages} productName={product.name} />
          </div>

          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        <ProductTabs product={product} />

        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <RelatedProducts products={product.relatedProducts} />
        )}
      </Container>
    </section>
  )
}

