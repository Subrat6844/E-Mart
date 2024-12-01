"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CartSummary() {
	const [subtotal, setSubtotal] = useState(0);
	const shippingEstimate = 5.0;
	const taxEstimate = subtotal * 0.1;

	useEffect(() => {
		// In a real app, this would be calculated based on the actual cart items
		setSubtotal(64.0);
	}, []);

	const total = subtotal + shippingEstimate + taxEstimate;

	return (
		<div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:p-8">
			<h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
				Order summary
			</h2>

			<dl className="mt-6 space-y-4">
				<div className="flex items-center justify-between">
					<dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
					<dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
						${subtotal.toFixed(2)}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
					<dt className="text-sm text-gray-600 dark:text-gray-400">
						Shipping estimate
					</dt>
					<dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
						${shippingEstimate.toFixed(2)}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
					<dt className="text-sm text-gray-600 dark:text-gray-400">
						Tax estimate
					</dt>
					<dd className="text-sm font-medium text-gray-900 dark:text-gray-100">
						${taxEstimate.toFixed(2)}
					</dd>
				</div>
				<div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
					<dt className="text-base font-medium text-gray-900 dark:text-gray-100">
						Order total
					</dt>
					<dd className="text-base font-medium text-gray-900 dark:text-gray-100">
						${total.toFixed(2)}
					</dd>
				</div>
			</dl>

			<div className="mt-6">
				<Button className="w-full">Checkout</Button>
			</div>
		</div>
	);
}
