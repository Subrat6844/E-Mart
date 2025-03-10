"use client"

import { createContext, useContext, type ReactNode, useState, useEffect, useCallback } from "react"

export interface Product {
  _id: string
  name: string
  description: string
  sku: string
  category: {
    name: string
  }
  price: number
  images: string[]
  status: "active" | "inactive"
  avgRating: number
  reviewCount: number
  variants: { size: string; stock: number }[]
}

interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  fetchProductById: (id: string) => Promise<Product | null>
  searchProducts: (keyword: string) => Promise<void>
  filterProducts: (filters: FilterCriteria) => Promise<void>
}

interface FilterCriteria {
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  status?: "active" | "inactive"
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
   
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/product")
      if (!response.ok) throw new Error("Failed to fetch products")
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to fetch products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchProductById = useCallback(async (id: string): Promise<Product | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/product/${id}`)
      if (!response.ok) throw new Error("Failed to fetch product")
      const data = await response.json()
      return data.product
    } catch (error) {
      console.error("Error fetching product:", error)
      setError("Failed to fetch product. Please try again later.")
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const searchProducts = useCallback(async (keyword: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/products/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      })
      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()
      setProducts(data.searchResults)
    } catch (error) {
      console.error("Error searching products:", error)
      setError("Failed to search products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  const filterProducts = useCallback(async (filters: FilterCriteria) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/products/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      })
      if (!response.ok) throw new Error("Filtering failed")
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error("Error filtering products:", error)
      setError("Failed to filter products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        fetchProductById,
        searchProducts,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}

