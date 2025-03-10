"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/commonComponents/ProductCard";
import { useProduct } from "../context/ProductContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { products } = useProduct();
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-75"></div>
          <Image
            width={1920}
            height={1080}
            src="/hero-image.jpg"
            alt="Luxury Shopping Experience"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Your Premier <span className="text-primary">Shopping</span> Destination
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Discover an exclusive collection of premium products, curated just for you. Experience luxury shopping like never before.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => router.push('/products')} 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/signup')} 
                className="bg-white/10 text-white hover:bg-white/20 border-2 border-white/50 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Join Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our handpicked selection of premium products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={() => router.push('/products')} 
              className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Stay Connected
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter for exclusive updates, new arrivals, and special offers tailored just for you.
            </p>
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary"
              />
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>    
    </div>
  );
}

