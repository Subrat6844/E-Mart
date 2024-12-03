"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Moon, Search, ShoppingBag, Sun, UserPen, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const { data: session } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const isAuthenticated = session?.user;
	const isAdmin = session?.user?.role === "admin";
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);
	return (
		<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						<span className="text-purple-600 dark:text-purple-400">LUXE</span>
						<span className="text-gray-900 dark:text-gray-100">SHOP</span>
					</Link>
					<div className="hidden md:flex space-x-8">
						<Link
							href="/"
							className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
						>
							Home
						</Link>
						<Link
							href="/products"
							className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
						>
							Products
						</Link>
						<Link
							href="/about"
							className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
						>
							About
						</Link>
						{!isAuthenticated && (
							<>
								<Link
									href="/signup"
									className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
								>
									Sign Up
								</Link>
								<Link
									href="/login"
									className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
								>
									Login
								</Link>
							</>
						)}
						{isAuthenticated && (
							<>
								<Link
									href="/orders"
									className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
								>
									My Orders
								</Link>
							</>
						)}
						{isAdmin && (
							<Link
								href="/dashboard"
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Dashboard
							</Link>
						)}
					</div>
					<div className="flex items-center space-x-1">
						<Button
							variant="ghost"
							size="icon"
							className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<Search className="h-5 w-5" />
							<span className="sr-only">Toggle Search</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							onClick={() => setIsDarkMode(!isDarkMode)}
						>
							{isDarkMode ? (
								<Sun className="h-5 w-5" />
							) : (
								<Moon className="h-5 w-5" />
							)}
							<span className="sr-only">Toggle Dark Mode</span>
						</Button>
						<Link href={"/cart"}>
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								<ShoppingBag className="h-5 w-5" />
								<span className="sr-only">Cart</span>
							</Button>
						</Link>
						{isAuthenticated && (
							<Link href={"/user-profile"}>
								<Button
									variant="ghost"
									size="icon"
									className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
								>
									<UserPen className="h-5 w-5" />
									<span className="sr-only">Profile</span>
								</Button>
							</Link>
						)}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
							<span className="sr-only">Menu</span>
						</Button>
					</div>
				</div>
				{isMenuOpen && (
					<div className="mt-4 md:hidden">
						<div className="flex flex-col space-y-4">
							<Link
								href="/"
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Home
							</Link>
							<Link
								href="/products"
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Products
							</Link>
							<Link
								href="/about"
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								About
							</Link>
							<Link
								href="/contact"
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Contact
							</Link>
						</div>
					</div>
				)}
			</div>
			{isSearchOpen && (
				<div className="border-t border-gray-200 dark:border-gray-800">
					<div className="container mx-auto px-4 py-3">
						<form className="flex items-center">
							<Input
								type="search"
								placeholder="Search for luxury items..."
								className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
							/>
							<Button
								type="submit"
								variant="ghost"
								size="icon"
								className="ml-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
							>
								<Search className="h-5 w-5" />
								<span className="sr-only">Search</span>
							</Button>
						</form>
					</div>
				</div>
			)}
		</nav>
	);
}
