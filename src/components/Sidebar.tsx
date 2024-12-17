"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	ShoppingCart,
	Package,
	List,
	Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
const menuItems = [
	{ title: "Analytics", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
	{ title: "Products", href: "/dashboard/products/list", icon: Package },
	{ title: "Categories", href: "/dashboard/categories", icon: List },
];

export function AppSidebar() {
	const pathname = usePathname();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const SidebarContent = () => (
		<div className="flex bg-background textfor h-full flex-col py-4">
			<div className="px-3 py-2">
				<h2 className="mb-2 px-4 font-semibold">
					<Link href="/" className="text-2xl font-bold">
						<span className="text-gray-900 dark:text-gray-100">
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
						</span>
					</Link>
				</h2>
				<div className="space-y-1">
					{menuItems.map((item) => (
						<Button
							key={item.href}
							asChild
							variant={pathname === item.href ? "secondary" : "ghost"}
							className="w-full justify-start"
						>
							<Link href={item.href}>
								<item.icon className="mr-2 h-4 w-4" />
								{item.title}
							</Link>
						</Button>
					))}
				</div>
			</div>
			<div className="mt-auto px-3 py-2">
				<Button asChild variant="ghost" className="w-full justify-start">
					<Link href="/">
						<Home className="mr-2 h-4 w-4" />
						Return to Home Page
					</Link>
				</Button>
			</div>
		</div>
	);

	if (isMobile) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
				<div className="max-w-md rounded-lg border bg-card p-8 shadow-lg">
					<h2 className="mb-4 text-2xl font-bold">Screen Too Small</h2>
					<p className="mb-4">
						Please open the dashboard on a larger screen for the best
						experience.
					</p>
					<Button asChild>
						<Link href="/">Return to Home Page</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="hidden border-r bg-gray-100/40 md:block md:w-64 lg:w-72">
			<SidebarContent />
		</div>
	);
}
