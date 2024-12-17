"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Dummy data
const initialOrders = [
	{
		_id: "orderId123",
		user: {
			name: "John Doe",
			email: "john@example.com",
		},
		status: "pending",
		paymentStatus: "paid",
		paymentProvider: "Stripe",
		paymentTransactionId: "txn123",
		total: 59.97,
		address: {
			street: "123 Main St",
			city: "New York",
			state: "NY",
			zip: "10001",
		},
		items: [
			{
				product: {
					name: "T-shirt",
					price: 19.99,
					images: ["image1.jpg"],
				},
				quantity: 3,
				size: "M",
				price: 19.99,
				total: 59.97,
			},
		],
		createdAt: "2024-12-01T12:00:00Z",
		updatedAt: "2024-12-01T12:00:00Z",
	},
	{
		_id: "orderId124",
		user: {
			name: "John Doe",
			email: "john@example.com",
		},
		status: "pending",
		paymentStatus: "paid",
		paymentProvider: "Stripe",
		paymentTransactionId: "txn123",
		total: 59.97,
		address: {
			street: "123 Main St",
			city: "New York",
			state: "NY",
			zip: "10001",
		},
		items: [
			{
				product: {
					name: "T-shirt",
					price: 19.99,
					images: ["image1.jpg"],
				},
				quantity: 3,
				size: "M",
				price: 19.99,
				total: 59.97,
			},
		],
		createdAt: "2024-12-01T12:00:00Z",
		updatedAt: "2024-12-01T12:00:00Z",
	},
];

async function updateOrderAPI(
	orderId: string,
	status: string,
	paymentStatus: string
) {
	console.log(orderId, status, paymentStatus);

	const response = await fetch(`/api/order/${orderId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ status, paymentStatus }),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Failed to update order");
	}

	return response.json();
}

export default function OrdersPage() {
	const { toast } = useToast();
	const [currentPage, setCurrentPage] = useState(1);
	const [orders, setOrders] = useState(initialOrders);
	const [isUpdating, setIsUpdating] = useState(false);
	const ordersPerPage = 10;
	const totalPages = Math.ceil(orders.length / ordersPerPage);

	const indexOfLastOrder = currentPage * ordersPerPage;
	const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
	const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

	const updateOrder = async (
		orderId: string,
		newStatus: string,
		newPaymentStatus: string
	) => {
		setIsUpdating(true);
		try {
			await updateOrderAPI(orderId, newStatus, newPaymentStatus);
			setOrders(
				orders.map((order) =>
					order._id === orderId
						? { ...order, status: newStatus, paymentStatus: newPaymentStatus }
						: order
				)
			);
			toast({
				title: "Order Updated",
				description: "The order has been successfully updated.",
			});
		} catch (error) {
			console.error("Error updating order:", error);
			toast({
				title: "Error",
				description:
					error instanceof Error ? error.message : "Failed to update order",
				variant: "destructive",
			});
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Orders</h2>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Customer</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Payment Status</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentOrders.map((order) => (
							<TableRow key={order._id}>
								<TableCell className="font-medium">{order._id}</TableCell>
								<TableCell>{order.user.name}</TableCell>
								<TableCell>{order.status}</TableCell>
								<TableCell>{order.paymentStatus}</TableCell>
								<TableCell>${order.total.toFixed(2)}</TableCell>
								<TableCell>
									{format(new Date(order.createdAt), "PPP")}
								</TableCell>
								<TableCell className="text-right">
									<Dialog>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DialogTrigger asChild>
													<DropdownMenuItem>Update status</DropdownMenuItem>
												</DialogTrigger>
											</DropdownMenuContent>
										</DropdownMenu>
										<DialogContent className="sm:max-w-[425px]">
											<DialogHeader>
												<DialogTitle>Update Order Status</DialogTitle>
												<DialogDescription>
													Change the status of order {order._id}
												</DialogDescription>
											</DialogHeader>
											<form
												onSubmit={(e) => {
													e.preventDefault();
													const formData = new FormData(e.currentTarget);
													const newStatus = formData.get("status") as string;
													const newPaymentStatus = formData.get(
														"paymentStatus"
													) as string;
													updateOrder(order._id, newStatus, newPaymentStatus);
												}}
											>
												<div className="grid gap-4 py-4">
													<div className="grid grid-cols-4 items-center gap-4">
														<Select name="status" defaultValue={order.status}>
															<SelectTrigger className="col-span-3">
																<SelectValue placeholder="Select order status" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="pending">Pending</SelectItem>
																<SelectItem value="processing">
																	Processing
																</SelectItem>
																<SelectItem value="shipped">Shipped</SelectItem>
																<SelectItem value="delivered">
																	Delivered
																</SelectItem>
																<SelectItem value="cancelled">
																	Cancelled
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="grid grid-cols-4 items-center gap-4">
														<Select
															name="paymentStatus"
															defaultValue={order.paymentStatus}
														>
															<SelectTrigger className="col-span-3">
																<SelectValue placeholder="Select payment status" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="pending">Pending</SelectItem>
																<SelectItem value="paid">Paid</SelectItem>
																<SelectItem value="failed">Failed</SelectItem>
																<SelectItem value="refunded">
																	Refunded
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
												<DialogFooter>
													<Button type="submit" disabled={isUpdating}>
														{isUpdating ? "Updating..." : "Update Order"}
													</Button>
												</DialogFooter>
											</form>
										</DialogContent>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
				>
					<ChevronLeftIcon className="h-4 w-4" />
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Next
					<ChevronRightIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
