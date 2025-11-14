import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CLASS_SVG_FILL, CLASS_SVG_VIEWBOX } from '@/constants/common'

const MAX_SEARCH_LENGTH = 100

const handleSanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .slice(0, MAX_SEARCH_LENGTH)
}

export const HeaderSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const debounceTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search).get('search')
    if (searchParam !== null) {
      setSearchQuery(searchParam)
    } else if (location.pathname !== '/products') {
      setSearchQuery('')
    }
  }, [location])

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (location.pathname === '/products') {
      debounceTimerRef.current = window.setTimeout(() => {
        const trimmedQuery = searchQuery.trim()
        if (trimmedQuery) {
          navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`, { replace: true })
        } else {
          navigate('/products', { replace: true })
        }
      }, 300)
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, navigate, location.pathname])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = handleSanitizeInput(e.target.value)
    setSearchQuery(sanitized)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`)
    } else {
      navigate('/products')
    }
  }

  return (
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
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke={CLASS_SVG_FILL}
        viewBox={CLASS_SVG_VIEWBOX}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  )
}

