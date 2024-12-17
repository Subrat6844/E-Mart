"use client"

import { useState, useMemo } from "react"
import { Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from "@/commonComponents/ProductCard"
import { useProduct } from "@/context/ProductContext"
import { FilterModal } from "@/components/FilterModel"

const categories = ["All", "Shoes", "Clothing", "Accessories", "Bags"]
const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"]

export default function ProductListing() {
  const { products } = useProduct()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Default")
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    const result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" ||
          product.category.name === selectedCategory)
    )

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [searchTerm, selectedCategory, sortBy, products])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-100">
          Our Products
        </h1>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full dark:bg-gray-800 dark:text-gray-100"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
          <Button
            onClick={() => setIsFilterModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filter
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800">
              {sortOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="dark:text-gray-100"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <p className="mt-8 text-center text-lg text-gray-800 dark:text-gray-100">
            No products found. Try adjusting your filters.
          </p>
        )}

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    </div>
  )
}

