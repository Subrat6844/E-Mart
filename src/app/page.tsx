import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from '@/commonComponents/Navbar'
import ProductCard from '@/commonComponents/ProductCard'

const products = [
  { id: 1, name: "Leather Weekender Bag", price: 299.99, image: "https://images.unsplash.com/photo-1731370963535-aa6e57ed40f6?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0"},
  { id: 2, name: "Cashmere Sweater", price: 199.99, image: "/placeholder.svg?height=300&width=300" },
  { id: 3, name: "Automatic Chronograph Watch", price: 1299.99, image: "/placeholder.svg?height=300&width=300" },
  { id: 4, name: "Italian Leather Shoes", price: 349.99, image: "/placeholder.svg?height=300&width=300" },
]

export default function Home() {
 

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Discover Luxury</h1>
          <p className="text-xl mb-8 text-purple-200">Elevate your lifestyle with our curated collection</p>
          <Button className="bg-white text-purple-600 hover:bg-purple-100 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700 px-8 py-3 rounded-full text-lg">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Join Our Exclusive List</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">Be the first to know about new collections and exclusive offers</p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="max-w-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400" 
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600 px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-purple-600 dark:text-purple-400">LUXE</span>
              <span className="text-gray-900 dark:text-gray-100">SHOP</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">© 2023 LUXESHOP. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Terms of Service</Link>
            <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

