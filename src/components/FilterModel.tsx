import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

type FilterModalProps = {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: { min: number; max: number }
  onPriceRangeChange: (range: { min: number; max: number }) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  onApplyFilters: () => void
}

export function FilterModal({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onApplyFilters,
}: FilterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <RadioGroup
              id="category"
              value={selectedCategory}
              onValueChange={onCategoryChange}
              className="flex flex-col space-y-1"
            >
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={category} />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label>Price Range</Label>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={[priceRange.min, priceRange.max]}
              onValueChange={(value) => onPriceRangeChange({ min: value[0], max: value[1] })}
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Minimum Rating</Label>
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={[minRating]}
              onValueChange={(value) => onMinRatingChange(value[0])}
            />
            <div className="text-sm">{minRating} stars</div>
          </div>
        </div>
        <Button onClick={onApplyFilters}>Apply Filters</Button>
      </DialogContent>
    </Dialog>
  )
}

