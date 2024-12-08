"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Menu, Moon, Search, ShoppingBag, Sun, UserPen, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export default function Navbar() {
	const pathname = usePathname()
	const { data: session } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const isAuthenticated = session?.user;
	const isAdmin = session?.user?.role === "admin";
	const { cart } = useCart();
	const getTotalItems = () => {
		return cart.items.reduce((total, item) => total + item.quantity, 0);
	};
	const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode
	const [hydrated, setHydrated] = useState(false); // Prevent hydration mismatch

	useEffect(() => {
		const storedDarkMode = localStorage.getItem("darkMode");
		setIsDarkMode(storedDarkMode ? JSON.parse(storedDarkMode) : false);
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (hydrated) {
			if (isDarkMode) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
		}
	}, [isDarkMode, hydrated]);
	if (pathname.startsWith("/dashboard")) {
		return null
	}
	return (
		<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						<span className="text-gray-900 dark:text-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" fill="none" viewBox="0 0 176 40"><path fill={!isDarkMode?"#283841":"#fff"} fill-rule="evenodd" d="M15 28a5 5 0 0 1-5-5V0H0v23c0 8.284 6.716 15 15 15h11V28H15ZM45 10a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-19 9C26 8.507 34.507 0 45 0s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM153 10a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-19 9c0-10.493 8.507-19 19-19s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM85 0C74.507 0 66 8.507 66 19s8.507 19 19 19h28c1.969 0 3.868-.3 5.654-.856L124 40l5.768-10.804A19.007 19.007 0 0 0 132 20.261V19c0-10.493-8.507-19-19-19H85Zm37 19a9 9 0 0 0-9-9H85a9 9 0 1 0 0 18h28a9 9 0 0 0 9-8.93V19Z" clip-rule="evenodd"></path><path fill={!isDarkMode?"#283841":"#fff"} d="M176 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg></span>
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
								className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative"
							>
								<ShoppingBag className="h-5 w-5" />
								<span className="sr-only">Cart</span>
								{getTotalItems() > 0 && (
									<span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
										{getTotalItems()}
									</span>
								)}
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
