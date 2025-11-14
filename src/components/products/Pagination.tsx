import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const CLASS_PAGINATION_BUTTON = 'px-4 py-2 rounded-md text-sm font-medium transition-colors'
const CLASS_PAGINATION_DISABLED = 'bg-gray-100 text-gray-400 cursor-not-allowed'
const CLASS_PAGINATION_ENABLED = 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'

export const RenderPagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  const onClickPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const onClickNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const onClickPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 4

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 1) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        onClick={onClickPrevious}
        disabled={currentPage === 1}
        className={cn(
          CLASS_PAGINATION_BUTTON,
          currentPage === 1 ? CLASS_PAGINATION_DISABLED : CLASS_PAGINATION_ENABLED
        )}
      >
        Trang trước
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isActive = pageNumber === currentPage

          return (
            <button
              key={pageNumber}
              onClick={() => onClickPage(pageNumber)}
              className={cn(
                CLASS_PAGINATION_BUTTON,
                isActive ? 'bg-green-primary text-white' : CLASS_PAGINATION_ENABLED
              )}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      <button
        onClick={onClickNext}
        disabled={currentPage === totalPages}
        className={cn(
          CLASS_PAGINATION_BUTTON,
          currentPage === totalPages ? CLASS_PAGINATION_DISABLED : CLASS_PAGINATION_ENABLED
        )}
      >
        Trang cuối
      </button>
    </div>
  )
}

