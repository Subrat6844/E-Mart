"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Search, ShoppingBag, Sun, X } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchDialog } from "@/components/SearchDialog";

export default function Navbar() {
	const pathname = usePathname();
	const { data: session } = useSession();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const isAuthenticated = session?.user;
	const isAdmin = session?.user?.role === "admin";
	const { cart } = useCart();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [hydrated, setHydrated] = useState(false);

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

	const getTotalItems = () => {
		return cart.items.reduce((total, item) => total + item.quantity, 0);
	};


	if (pathname.startsWith("/dashboard")) {
		return null;
	}

	return (
		<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
			<div className="container mx-auto px-4 py-3">
				<div className="flex justify-between items-center">
					<Link href="/" className="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 176 40"
							className="fill-current text-gray-900 dark:text-white"
						>
							<path
								fillRule="evenodd"
								d="M15 28a5 5 0 0 1-5-5V0H0v23c0 8.284 6.716 15 15 15h11V28H15ZM45 10a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-19 9C26 8.507 34.507 0 45 0s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM153 10a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-19 9c0-10.493 8.507-19 19-19s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM85 0C74.507 0 66 8.507 66 19s8.507 19 19 19h28c1.969 0 3.868-.3 5.654-.856L124 40l5.768-10.804A19.007 19.007 0 0 0 132 20.261V19c0-10.493-8.507-19-19-19H85Zm37 19a9 9 0 0 0-9-9H85a9 9 0 1 0 0 18h28a9 9 0 0 0 9-8.93V19Z"
								clipRule="evenodd"
							/>
							<path d="M176 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
						</svg>
					</Link>

					<div className="hidden md:flex items-center space-x-6">
						<NavLink href="/" active={pathname === "/"}>
							Home
						</NavLink>
						<NavLink href="/products" active={pathname === "/products"}>
							Products
						</NavLink>
						<NavLink href="/about" active={pathname === "/about"}>
							About
						</NavLink>
						{!isAuthenticated && (
							<>
								<NavLink href="/signup" active={pathname === "/signup"}>
									Sign Up
								</NavLink>
								<NavLink href="/login" active={pathname === "/login"}>
									Login
								</NavLink>
							</>
						)}
						{isAuthenticated && (
							<NavLink href="/orders" active={pathname === "/orders"}>
								My Orders
							</NavLink>
						)}
						{isAdmin && (
							<NavLink
								href="/dashboard"
								active={pathname.startsWith("/dashboard")}
							>
								Dashboard
							</NavLink>
						)}
					</div>

					<div className="flex items-center space-x-4">
						<SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
						<Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
							<Search className="h-5 w-5" />
							<span className="sr-only">Search</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsDarkMode(!isDarkMode)}
							className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
						>
							{isDarkMode ? (
								<Sun className="h-5 w-5" />
							) : (
								<Moon className="h-5 w-5" />
							)}
							<span className="sr-only">Toggle Dark Mode</span>
						</Button>

						<Link href="/cart">
							<Button
								variant="ghost"
								size="icon"
								className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary relative"
							>
								<ShoppingBag className="h-5 w-5" />
								<span className="sr-only">Cart</span>
								{getTotalItems() > 0 && (
									<span className="absolute -top-1 -right-1 bg-primary text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
										{getTotalItems()}
									</span>
								)}
							</Button>
						</Link>

						{isAuthenticated && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
									>
										<Avatar className="h-9 w-9">
											<AvatarImage src={`/avatars.png`} alt="Avatar" />
											<AvatarFallback>
												{"Subrat Chaudhary"
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<span className="sr-only">User Menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem asChild>
										<Link href="/orders">My Orders</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/logout">Logout</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						<Button
							variant="ghost"
							size="icon"
							className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
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
							<NavLink href="/" active={pathname === "/"}>
								Home
							</NavLink>
							<NavLink href="/products" active={pathname === "/products"}>
								Products
							</NavLink>
							<NavLink href="/about" active={pathname === "/about"}>
								About
							</NavLink>
							{!isAuthenticated && (
								<>
									<NavLink href="/signup" active={pathname === "/signup"}>
										Sign Up
									</NavLink>
									<NavLink href="/login" active={pathname === "/login"}>
										Login
									</NavLink>
								</>
							)}
							{isAuthenticated && (
								<NavLink href="/orders" active={pathname === "/orders"}>
									My Orders
								</NavLink>
							)}
							{isAdmin && (
								<NavLink
									href="/dashboard"
									active={pathname.startsWith("/dashboard")}
								>
									Dashboard
								</NavLink>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

function NavLink({
	href,
	active,
	children,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className={`text-sm font-medium transition-colors hover:text-primary ${
				active
					? "text-primary"
					: "text-muted-foreground"
			}`}
		>
			{children}
		</Link>
	);
}

