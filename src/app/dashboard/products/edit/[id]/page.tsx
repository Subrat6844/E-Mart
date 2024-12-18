"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ProductPreview } from "@/components/ProductPreview";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/context/ProductContext";

// Zod schema for product validation
const productSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	description: z.string().optional(),
	sku: z.string().min(1, { message: "SKU is required." }),
	category: z.string().min(1, { message: "Category is required." }),
	price: z.number().min(0, { message: "Price must be a positive number." }),
	status: z.enum(["active", "inactive"]),
	variants: z
		.array(
			z.object({
				size: z.string().min(1, { message: "Size is required." }),
				stock: z
					.number()
					.int()
					.min(0, { message: "Stock must be a positive number." }),
			})
		)
		.min(1, { message: "At least one variant is required." }),
	images: z
		.array(z.string())
		.min(1, { message: "At least one image is required." }),
});

export default function EditProductPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	const [product, setProduct] = useState<z.infer<typeof productSchema> | null>(
		null
	);
	const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	// React Hook Form setup
	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			description: "",
			sku: "",
			category: "",
			price: 0,
			status: "active",
			variants: [{ size: "", stock: 0 }],
			images: [],
		},
	});

	// Fetch product details
	useEffect(() => {
		const fetchProduct = async () => {
			// Simulate API call
			const response = await new Promise((resolve) =>
				setTimeout(
					() =>
						resolve({
							id: params.id,
							name: "Sample Product",
							description: "This is a sample product description.",
							sku: "SAMPLE001",
							category: "electronics",
							price: 99.99,
							status: "active",
							variants: [{ size: "M", stock: 50 }],
							images: ["/placeholder.svg"],
						}),
					1000
				)
			);

			setProduct(response as z.infer<typeof productSchema>);
			form.reset(response as z.infer<typeof productSchema>);
		};

		fetchProduct();
	}, [params.id, form]);

	// Generate preview product data
	const getPreviewProduct = () => {
		const values = form.getValues();
		return {
			...values,
			_id: params.id,
			category: { name: values.category }, // Convert category to the expected object format
			avgRating: 0,
			reviewCount: 0,
		};
	};

	// Handle preview
	const handlePreviewOpen = () => {
		const previewData = getPreviewProduct();
		setPreviewProduct(previewData as Product);
		setIsPreviewOpen(true);
	};
	const handleRefreshPreview = () => {
		const previewData = getPreviewProduct();
		setPreviewProduct(previewData as Product);
	};

	// Submit form data
	const onSubmit = (values: z.infer<typeof productSchema>) => {
		console.log("Updated Product Data:", values);
		alert("Product updated successfully!");
		router.push("/dashboard/products/list");
	};

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
				<div className="flex space-x-2">
					<Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" onClick={handlePreviewOpen}>
								Preview
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle>Product Preview</DialogTitle>
								<DialogDescription>
									This is how your product will appear on the storefront.
								</DialogDescription>
							</DialogHeader>
							{previewProduct && <ProductPreview product={previewProduct} />}
						</DialogContent>
					</Dialog>
					<Button
						variant="outline"
						onClick={handleRefreshPreview}
						disabled={isPreviewOpen}
					>
						Refresh Preview
					</Button>
				</div>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Product name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Product description"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* SKU */}
					<FormField
						control={form.control}
						name="sku"
						render={({ field }) => (
							<FormItem>
								<FormLabel>SKU</FormLabel>
								<FormControl>
									<Input placeholder="SKU" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Category */}
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="electronics">Electronics</SelectItem>
										<SelectItem value="clothing">Clothing</SelectItem>
										<SelectItem value="books">Books</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Price */}
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0.00"
										{...field}
										onChange={(e) => field.onChange(+e.target.value)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Variants */}
					<div>
						<h3 className="mb-4 text-lg font-medium">Variants</h3>
						{product.variants?.map((variant, index) => (
							<div key={index} className="mb-4 flex space-x-4">
								<Input
									placeholder="Size"
									defaultValue={variant.size}
									onChange={(e) =>
										form.setValue(`variants.${index}.size`, e.target.value)
									}
								/>
								<Input
									type="number"
									placeholder="Stock"
									defaultValue={variant.stock}
									onChange={(e) =>
										form.setValue(`variants.${index}.stock`, +e.target.value)
									}
								/>
							</div>
						))}
					</div>

					{/* Images */}
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<Input
										type="file"
										multiple
										accept="image/*"
										onChange={(e) => {
											const files = Array.from(e.target.files || []);
											const urls = files.map((file) =>
												URL.createObjectURL(file)
											);
											field.onChange(urls);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit */}
					<Button type="submit">Update Product</Button>
				</form>
			</Form>
		</div>
	);
}
