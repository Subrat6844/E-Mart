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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-70"></div>
          <Image
            src="https://img.freepik.com/free-photo/coquettish-lovely-cheerful-pretty-redhead-woman-with-blue-eyes-freckles-wearing-white-large-head_1258-132705.jpg?t=st=1734418479~exp=1734422079~hmac=a66b56a2cdc45bd08ca9cf6d396b30af6ee8048c7648045402c7066e7813fcf1&w=1380"
            alt="Luxury items"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Elevate Your Style with Curated Luxury
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Discover a world of premium products tailored to your refined taste
            </p>
            <Button onClick={() => router.push('/products')} className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
            Recent Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => router.push('/products')} className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-8 py-3 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Stay in the Loop
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive updates, new arrivals, and special offers tailored just for you.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            />
            <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-8 transition duration-300 ease-in-out">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold">
                <span className="text-gray-900 dark:text-gray-100">E-</span>
                <span className="text-gray-500 dark:text-gray-400">MART</span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Elevating your lifestyle with curated luxury.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300">
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300">
                    Returns Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2023 LUXESHOP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

