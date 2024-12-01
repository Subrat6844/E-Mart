"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock cart items data
const initialItems = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: 32.00,
    color: "Sienna",
    quantity: 1,
    size: "Large",
    imageSrc: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: 32.00,
    quantity: 1,
    color: "Black",
    size: "Medium",
    imageSrc: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    price: 32.00,
    quantity: 1,
    color: "Black",
    size: "Medium",
    imageSrc: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    price: 32.00,
    quantity: 1,
    color: "Black",
    size: "Medium",
    imageSrc: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    price: 32.00,
    quantity: 1,
    color: "Black",
    size: "Medium",
    imageSrc: "/placeholder.svg?height=400&width=400",
  },
]

export function CartItems() {
  const [items, setItems] = useState(initialItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 border-y border-gray-200 dark:border-gray-700">
      {items.map((product) => (
        <li key={product.id} className="flex py-6 sm:py-10">
          <div className="flex-shrink-0">
            <Image
              src={product.imageSrc}
              alt={product.name}
              width={200}
              height={200}
              className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100">
                      {product.name}
                    </a>
                  </h3>
                </div>
                <div className="mt-1 flex text-sm">
                  <p className="text-gray-500 dark:text-gray-400">{product.color}</p>
                  <p className="ml-4 border-l border-gray-200 dark:border-gray-700 pl-4 text-gray-500 dark:text-gray-400">{product.size}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${product.id}`} className="sr-only">
                  Quantity, {product.name}
                </label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => updateQuantity(product.id, (product.quantity || 1) - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id={`quantity-${product.id}`}
                    name={`quantity-${product.id}`}
                    type="number"
                    className="mx-2 w-16 text-center"
                    value={product.quantity || 1}
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => updateQuantity(product.id, (product.quantity || 1) + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute right-0 top-0">
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(product.id)}
                    className="-mr-2 inline-flex p-2"
                  >
                    <span className="sr-only">Remove</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

