import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function FilterModal({ isOpen, onClose, categories, selectedCategory, onCategoryChange }: FilterModalProps) {
  const [localCategory, setLocalCategory] = useState(selectedCategory)

  useEffect(() => {
    setLocalCategory(selectedCategory)
  }, [selectedCategory])

  const handleApply = () => {
    onCategoryChange(localCategory)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Categories</h4>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={localCategory === category}
                  onCheckedChange={() => setLocalCategory(category)}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleApply}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

