import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductFilters } from "@/apis/products";
import { useTranslation } from "@/hooks";
import { formatCurrency } from "@/i18n";

interface CategoryWithCount {
  name: string;
  count: number;
}

interface ProductFilterProps {
  categories: CategoryWithCount[];
  onFilterChange: (filters: ProductFilters) => void;
  searchValue?: string;
  onClearAll?: () => void;
  className?: string;
}

const CLASS_FILTER_TITLE =
  "text-base font-semibold text-gray-800 dark:text-gray-200 mb-4";
const CLASS_SPACE_Y2 = "space-y-2";

const PRICE_RANGES = [
  { min: 200000, max: 400000 },
  { min: 400000, max: 600000 },
  { min: 600000, max: 800000 },
  { min: 800000, max: 1000000 },
  { min: 1000000, max: 2000000 },
];

const COLORS = [
  { key: "green", value: "green", hex: "#46A358" },
  { key: "orange", value: "orange", hex: "#FF6B35" },
  { key: "purple", value: "purple", hex: "#8B5CF6" },
  { key: "blue", value: "blue", hex: "#3B82F6" },
  { key: "yellow", value: "yellow", hex: "#FBBF24" },
  { key: "pink", value: "pink", hex: "#EC4899" },
];

export const ProductFilter = ({
  categories,
  onFilterChange,
  searchValue,
  onClearAll,
  className,
}: ProductFilterProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    const isCategorySelected = category === selectedCategory;
    const newCategory = isCategorySelected ? "" : category;
    setSelectedCategory(newCategory);
    onFilterChange({
      search: searchValue,
      category: newCategory || undefined,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      color: selectedColor || undefined,
    });
  };

  const handlePriceRangeChange = (
    range: { min: number; max: number } | null
  ) => {
    const isRangeSame =
      selectedPriceRange?.min === range?.min &&
      selectedPriceRange?.max === range?.max;
    const targetRange = isRangeSame ? null : range;
    setSelectedPriceRange(targetRange);
    onFilterChange({
      search: searchValue,
      category: selectedCategory || undefined,
      minPrice: targetRange?.min,
      maxPrice: targetRange?.max,
      color: selectedColor || undefined,
    });
  };

  const handleColorChange = (color: string) => {
    const isColorSelected = color === selectedColor;
    const newColor = isColorSelected ? "" : color;
    setSelectedColor(newColor);
    onFilterChange({
      search: searchValue,
      category: selectedCategory || undefined,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      color: newColor || undefined,
    });
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedPriceRange(null);
    setSelectedColor("");
    if (onClearAll) {
      onClearAll();
    } else {
      onFilterChange({});
    }
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedPriceRange ||
    selectedColor ||
    Boolean(searchValue);

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {t("products.filters")}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-green-primary hover:text-green-dark transition-colors"
          >
            {t("products.clearAllFilters")}
          </button>
        )}
      </div>

      {searchValue && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{t("products.searchLabel")}</span>{" "}
            <span className="text-gray-800">"{searchValue}"</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h4 className={CLASS_FILTER_TITLE}>
            {t("products.productCategories")}
          </h4>
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
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-green-primary">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className={CLASS_FILTER_TITLE}>{t("products.filterByPrice")}</h4>
          <div className={CLASS_SPACE_Y2}>
            {PRICE_RANGES.map((range) => {
              const isSelected =
                selectedPriceRange?.min === range.min &&
                selectedPriceRange?.max === range.max;
              return (
                <button
                  key={`${range.min}-${range.max}`}
                  onClick={() => handlePriceRangeChange(range)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    isSelected
                      ? "bg-green-primary text-white"
                      : "bg-gray-50 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500"
                  )}
                >
                  {formatCurrency(range.min)} - {formatCurrency(range.max)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className={CLASS_FILTER_TITLE}>{t("products.filterByColor")}</h4>
          <div className="grid grid-cols-3 gap-3">
            {COLORS.map((color) => {
              const isSelected = selectedColor === color.value;
              return (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-2 rounded-md transition-all",
                    isSelected
                      ? "ring-2 ring-green-primary ring-offset-2"
                      : "hover:bg-gray-50"
                  )}
                  title={t(`products.colors.${color.key}`)}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {t(`products.colors.${color.key}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
