import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
	const { cart } = useCart();
	const subtotal = cart.items.reduce(
		(sum, item) => sum + item.quantity * item.price,
		0
	);
	const total = subtotal;

	return (
		<Card className="dark:bg-gray-800">
			<CardHeader>
				<CardTitle className="dark:text-gray-100">Order Summary</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="dark:text-gray-300">Product</TableHead>
							<TableHead className="dark:text-gray-300">Quantity</TableHead>
							<TableHead className="dark:text-gray-300">Price</TableHead>
							<TableHead className="dark:text-gray-300">Total</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{cart.items.map((item) => (
							<TableRow key={item.name}>
								<TableCell className="dark:text-gray-300">
									{item.name}
								</TableCell>
								<TableCell className="dark:text-gray-300">
									{item.quantity}
								</TableCell>
								<TableCell className="dark:text-gray-300">
									₹{item.price.toFixed(2)}
								</TableCell>
								<TableCell className="dark:text-gray-300">
									₹{(item.quantity * item.price).toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className="mt-4 space-y-2">
					<div className="flex justify-between dark:text-gray-300">
						<span>Subtotal:</span>
						<span>₹{subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between dark:text-gray-300">
						<span>Shipping:</span>
						<span>Free</span>
					</div>
					<div className="flex justify-between font-semibold dark:text-gray-200">
						<span>Total:</span>
						<span>₹{total.toFixed(2)}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
