"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
	const pathname = usePathname();
	if (pathname.startsWith("/dashboard")) {
		return null;
	}
	return (
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
						<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/products"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
								>
									Our Products
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
							Legal
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/privacy"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/returns"
									className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition duration-300"
								>
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
	);
}
