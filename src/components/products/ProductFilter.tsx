import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductFilters } from '../apis'
import { LOCALE } from '@/constants/common'

interface CategoryWithCount {
  name: string
  count: number
}

interface ProductFilterProps {
  categories: CategoryWithCount[]
  onFilterChange: (filters: ProductFilters) => void
  className?: string
}

const CLASS_FILTER_TITLE = 'text-base font-semibold text-gray-800 mb-4'
const CLASS_SPACE_Y2 = 'space-y-2'

const PRICE_RANGES = [
  { min: 200000, max: 400000 },
  { min: 400000, max: 600000 },
  { min: 600000, max: 800000 },
  { min: 800000, max: 1000000 },
  { min: 1000000, max: 2000000 },
]

const COLORS = [
  { name: 'Xanh cây', value: 'green', hex: '#46A358' },
  { name: 'Đỏ cam', value: 'orange', hex: '#FF6B35' },
  { name: 'Tím', value: 'purple', hex: '#8B5CF6' },
  { name: 'Xanh trời', value: 'blue', hex: '#3B82F6' },
  { name: 'Vàng', value: 'yellow', hex: '#FBBF24' },
  { name: 'Hồng', value: 'pink', hex: '#EC4899' },
]

export const ProductFilter = ({ categories, onFilterChange, className }: ProductFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')

  const handleCategoryChange = (category: string) => {
    const isCategorySelected = category === selectedCategory
    const newCategory = isCategorySelected ? '' : category
    setSelectedCategory(newCategory)
    onFilterChange({
      category: newCategory || undefined,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      color: selectedColor || undefined,
    })
  }

  const handlePriceRangeChange = (range: { min: number; max: number } | null) => {
    const isRangeSame = selectedPriceRange?.min === range?.min && selectedPriceRange?.max === range?.max
    const targetRange = isRangeSame ? null : range
    setSelectedPriceRange(targetRange)
    onFilterChange({
      category: selectedCategory || undefined,
      minPrice: targetRange?.min,
      maxPrice: targetRange?.max,
      color: selectedColor || undefined,
    })
  }

  const handleColorChange = (color: string) => {
    const isColorSelected = color === selectedColor
    const newColor = isColorSelected ? '' : color
    setSelectedColor(newColor)
    onFilterChange({
      category: selectedCategory || undefined,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      color: newColor || undefined,
    })
  }

  const handleReset = () => {
    setSelectedCategory('')
    setSelectedPriceRange(null)
    setSelectedColor('')
    onFilterChange({})
  }

  const hasActiveFilters = selectedCategory || selectedPriceRange || selectedColor

  return (
    <div className={cn('bg-white p-4 rounded-lg shadow-sm border border-gray-200', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Bộ lọc</h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-green-primary hover:text-green-dark transition-colors"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h4 className={CLASS_FILTER_TITLE}>Danh mục sản phẩm</h4>
          <div className={CLASS_SPACE_Y2}>
            {categories.map((category) => (
              <label
                key={category.name}
                className="flex items-center cursor-pointer hover:text-green-primary transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === category.name}
                  onChange={() => handleCategoryChange(category.name)}
                  className="w-4 h-4 text-green-primary border-gray-300 rounded focus:ring-green-primary focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-green-primary">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className={CLASS_FILTER_TITLE}>Tìm theo giá</h4>
          <div className={CLASS_SPACE_Y2}>
            {PRICE_RANGES.map((range) => {
              const isSelected =
                selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
              return (
                <button
                  key={`${range.min}-${range.max}`}
                  onClick={() => handlePriceRangeChange(range)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                    isSelected
                      ? 'bg-green-primary text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {range.min.toLocaleString(LOCALE)} ₫ - {range.max.toLocaleString(LOCALE)} ₫
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h4 className={CLASS_FILTER_TITLE}>Tìm theo màu</h4>
          <div className="grid grid-cols-3 gap-3">
            {COLORS.map((color) => {
              const isSelected = selectedColor === color.value
              return (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-2 rounded-md transition-all',
                    isSelected ? 'ring-2 ring-green-primary ring-offset-2' : 'hover:bg-gray-50'
                  )}
                  title={color.name}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-gray-600">{color.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

