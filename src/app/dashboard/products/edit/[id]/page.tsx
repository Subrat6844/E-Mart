'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'

// Define Product Schema with Zod
const productSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().optional(),
  sku: z.string().min(1, { message: 'SKU is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  price: z.number().min(0, { message: 'Price must be a positive number.' }),
  status: z.enum(['active', 'inactive']),
  variants: z.array(
    z.object({
      size: z.string(),
      stock: z.number().int().min(0),
    })
  ),
  images: z.array(z.instanceof(File)).optional(),
})

// Type derived from Zod Schema
export type ProductType = z.infer<typeof productSchema>

// Main Component
export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // State for fetched product and variants
  const [product, setProduct] = useState<ProductType | null>(null)
  const [variants, setVariants] = useState<ProductType['variants']>([])

  // Initialize React Hook Form
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      sku: '',
      category: '',
      price: 0,
      status: 'active',
      variants: [{ size: '', stock: 0 }],
      images: [],
    },
  })

  // Fetch Product Data
  useEffect(() => {
    const fetchProduct = async () => {
      const response: ProductType = {
        name: 'Sample Product',
        description: 'This is a sample product description',
        sku: 'SAMPLE001',
        category: 'electronics',
        price: 99.99,
        status: 'active',
        variants: [{ size: 'M', stock: 50 }],
        images: [],
      }

      setProduct(response)
      form.reset(response) // Reset form with fetched data
      setVariants(response.variants)
    }

    fetchProduct()
  }, [params.id, form])

  // Form Submit Handler
  function onSubmit(values: ProductType) {
    console.log(values)
    alert('Product updated successfully!')
    router.push('/dashboard/products/list')
  }

  // Add New Variant
  const addVariant = () => {
    setVariants([...variants, { size: '', stock: 0 }])
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SKU Field */}
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="SKU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Variants Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Variants</h3>
            {variants.map((variant, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <FormField
                  control={form.control}
                  name={`variants.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Input placeholder="Size" {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button type="button" onClick={addVariant} variant="outline">
              Add Variant
            </Button>
          </div>

          <Button type="submit">Update Product</Button>
        </form>
      </Form>
    </div>
  )
}
