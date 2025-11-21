import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { CLASS_QUANTITY_BUTTON, CLASS_ICON_SIZE_SM } from '@/constants/common'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 999,
  className,
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10)
    if (!isNaN(newValue)) {
      if (newValue < min) {
        onChange(min)
      } else if (newValue > max) {
        onChange(max)
      } else {
        onChange(newValue)
      }
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
        Số lượng:
      </label>
      <div className="flex items-center border border-gray-300 rounded-md">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={value <= min}
          className={CLASS_QUANTITY_BUTTON}
          aria-label="Giảm số lượng"
        >
          <MinusIcon className={CLASS_ICON_SIZE_SM} />
        </button>
        <input
          id="quantity"
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-16 text-center border-0 focus:outline-none focus:ring-0 py-2"
        />
        <button
          type="button"
          onClick={handleIncrease}
          disabled={value >= max}
          className={CLASS_QUANTITY_BUTTON}
          aria-label="Tăng số lượng"
        >
          <PlusIcon className={CLASS_ICON_SIZE_SM} />
        </button>
      </div>
    </div>
  )
}

