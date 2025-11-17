import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { MESSAGE_DEVELOPING, CLASS_DISABLED, CLASS_SVG_ICON } from '@/constants/common'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const MAX_SEARCH_LENGTH = 100

const handleSanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, MAX_SEARCH_LENGTH)
}

export const RenderMainHeader = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = handleSanitizeInput(e.target.value)
    setSearchQuery(sanitized)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
  }

  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-green-primary">Green Shop</div>
            <div className="text-xs text-gray-light">Món quà từ thiên nhiên</div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <span className="text-sm">(04) 6674 2332</span>
              <span className="text-gray-300">-</span>
              <span className="text-sm">(04) 3786 8504</span>
            </div>
            
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm..."
                maxLength={MAX_SEARCH_LENGTH}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent"
                aria-label="Tìm kiếm sản phẩm"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MagnifyingGlassIcon className={CLASS_SVG_ICON} />
              </div>
            </form>

            <button
              className={`relative flex items-center gap-2 bg-green-primary text-white px-4 py-2 rounded-md hover:bg-green-dark transition-colors ${CLASS_DISABLED}`}
              disabled
              title={MESSAGE_DEVELOPING}
            >
              <ShoppingCartIcon className={CLASS_SVG_ICON} />
              <span className="text-sm">0 Sản phẩm</span>
            </button>
          </div>
        </div>
      </Container>

      <nav className="bg-green-primary text-white">
        <Container>
          <div className="flex items-center gap-6 py-3">
            <button className="md:hidden text-white" aria-label="Menu">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <Link to="/" className="hover:text-green-200 transition-colors font-semibold">
              TRANG CHỦ
            </Link>
            <span className={CLASS_DISABLED} title={MESSAGE_DEVELOPING}>
              GIỚI THIỆU
            </span>
            <span className={`${CLASS_DISABLED} flex items-center gap-1`} title={MESSAGE_DEVELOPING}>
              SẢN PHẨM
              <ChevronDownIcon className="w-4 h-4" />
            </span>
            <span className={CLASS_DISABLED} title={MESSAGE_DEVELOPING}>
              SẢN PHẨM MỚI
            </span>
            <span className={CLASS_DISABLED} title={MESSAGE_DEVELOPING}>
              TIN TỨC
            </span>
            <span className={CLASS_DISABLED} title={MESSAGE_DEVELOPING}>
              LIÊN HỆ
            </span>
          </div>
        </Container>
      </nav>
    </header>
  )
}

