import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ProductCard } from '@/components/products/ProductCard'
import { RenderProductCardList } from './components/ProductCardList'
import { ProductFilter } from './components/ProductFilter'
import { RenderPagination } from '@/components/products/Pagination'
import { Product } from '@/types/product'
import { getAllProducts, searchProducts, ProductFilters } from '@/apis/products'
import {
  CLASS_SECTION_WHITE,
  CLASS_FLEX_ITEMS_GAP2,
  CLASS_TEXT_SM_GRAY,
  CLASS_SELECT_INPUT,
  CLASS_VIEW_TOGGLE_BUTTON,
  CLASS_VIEW_TOGGLE_ACTIVE,
  CLASS_VIEW_TOGGLE_INACTIVE,
  CLASS_SVG_ICON,
  CLASS_SVG_FILL,
  CLASS_SVG_VIEWBOX,
  CLASS_TEXT_CENTER_PY12,
  CONTEXT_RENDER_PRODUCTS,
} from '@/constants/common'
import { cn } from '@/lib/utils'

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'price-asc' | 'price-desc'

export const RenderProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ProductFilters>({})
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortOption, setSortOption] = useState<SortOption>('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)

  const categoriesWithCount = useMemo(() => {
    const categoryMap = new Map<string, number>()
    allProducts.forEach((product) => {
      if (product.category) {
        categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1)
      }
    })
    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [allProducts])

  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setFilters({ search: searchQuery })
    } else {
      setFilters({})
    }
  }, [searchParams])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const products = await getAllProducts()
        setAllProducts(products)
        setFilteredProducts(products)
      } catch (error) {
        console.error('Error fetching products:', {
          error,
          context: CONTEXT_RENDER_PRODUCTS,
          action: 'fetchProducts',
          timestamp: new Date().toISOString(),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (allProducts.length === 0) return

      const hasActiveFilters = 
        Boolean(filters.search) || 
        Boolean(filters.category) || 
        filters.minPrice !== undefined || 
        filters.maxPrice !== undefined || 
        Boolean(filters.color)

      if (!hasActiveFilters) {
        setFilteredProducts(allProducts)
        return
      }

      setLoading(true)
      try {
        const searchFilters: ProductFilters = {
          ...filters,
        }
        const filtered = await searchProducts(searchFilters)
        setFilteredProducts(filtered)
      } catch (error) {
        console.error('Error searching products:', {
          error,
          context: CONTEXT_RENDER_PRODUCTS,
          action: 'fetchFilteredProducts',
          timestamp: new Date().toISOString(),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredProducts()
  }, [filters, allProducts])

  useEffect(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        default:
          return 0
      }
    })
    setDisplayedProducts(sorted)
    setCurrentPage(1)
  }, [filteredProducts, sortOption])

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return displayedProducts.slice(startIndex, endIndex)
  }, [displayedProducts, currentPage, itemsPerPage])

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage)

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    if (newFilters.search) {
      setSearchParams({ search: newFilters.search })
    } else {
      setSearchParams({})
    }
  }

  const handleClearAllFilters = () => {
    setFilters({})
    setCurrentPage(1)
    setSearchParams({})
  }

  return (
    <section className={CLASS_SECTION_WHITE}>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Danh sách sản phẩm' },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProductFilter 
              categories={categoriesWithCount} 
              onFilterChange={handleFilterChange}
              searchValue={filters.search}
              onClearAll={handleClearAllFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="text-sm text-gray-600">
                Tìm thấy <span className="font-semibold">{displayedProducts.length}</span> sản phẩm
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className={CLASS_FLEX_ITEMS_GAP2}>
                  <label htmlFor="sort-select" className={CLASS_TEXT_SM_GRAY}>Sắp xếp theo:</label>
                  <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className={CLASS_SELECT_INPUT}
                  >
                    <option value="name">Tên sản phẩm</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                  </select>
                </div>

                <div className={CLASS_FLEX_ITEMS_GAP2}>
                  <label htmlFor="items-per-page-select" className={CLASS_TEXT_SM_GRAY}>Show:</label>
                  <select
                    id="items-per-page-select"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className={CLASS_SELECT_INPUT}
                  >
                    <option value="9">9</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-md p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      CLASS_VIEW_TOGGLE_BUTTON,
                      viewMode === 'grid' ? CLASS_VIEW_TOGGLE_ACTIVE : CLASS_VIEW_TOGGLE_INACTIVE
                    )}
                    aria-label="Grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <svg className={CLASS_SVG_ICON} fill="none" stroke={CLASS_SVG_FILL} viewBox={CLASS_SVG_VIEWBOX}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      CLASS_VIEW_TOGGLE_BUTTON,
                      viewMode === 'list' ? CLASS_VIEW_TOGGLE_ACTIVE : CLASS_VIEW_TOGGLE_INACTIVE
                    )}
                    aria-label="List view"
                    aria-pressed={viewMode === 'list'}
                  >
                    <svg className={CLASS_SVG_ICON} fill="none" stroke={CLASS_SVG_FILL} viewBox={CLASS_SVG_VIEWBOX}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className={CLASS_TEXT_CENTER_PY12}>
                <div className="text-gray-500">Đang tải...</div>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className={CLASS_TEXT_CENTER_PY12}>
                <div className="text-gray-500 mb-2">Không tìm thấy sản phẩm nào</div>
                <div className="text-sm text-gray-400">
                  {filters.search || filters.category || filters.minPrice !== undefined || filters.maxPrice !== undefined || filters.color
                    ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                    : 'Danh sách sản phẩm trống'}
                </div>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {paginatedProducts.map((product) => (
                      <RenderProductCardList key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <RenderPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

