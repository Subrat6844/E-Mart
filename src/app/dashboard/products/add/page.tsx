"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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

const productSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	description: z.string().optional(),
	sku: z.string().min(1, {
		message: "SKU is required.",
	}),
	category: z.string().min(1, {
		message: "Category is required.",
	}),
	price: z.number().min(0, {
		message: "Price must be a positive number.",
	}),
	status: z.enum(["active", "inactive"]),
	variants: z.array(
		z.object({
			size: z.string(),
			stock: z.number().int().min(0),
		})
	),
	images: z.array(z.string()).min(1, {
		message: "At least one image is required.",
	}),
});

export default function AddProductPage() {
	const router = useRouter();
	const [variants, setVariants] = useState([{ size: "", stock: 0 }]);
	const [previewProduct, setPreviewProduct] = useState(null as Product | null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

	function onSubmit(values: z.infer<typeof productSchema>) {
		console.log(values);
		// Here you would typically send this data to your API
		alert("Product added successfully!");
		router.push("/dashboard/products/list");
	}

	const addVariant = () => {
		setVariants([...variants, { size: "", stock: 0 }]);
	};

	const getPreviewProduct = () => ({
		...form.getValues(),
		_id: "preview",
		category: { name: form.getValues().category },
		avgRating: 0,
		reviewCount: 0,
	});

	const handlePreviewOpen = () => {
		setPreviewProduct(getPreviewProduct() as Product);
		setIsPreviewOpen(true);
	};

	const handleRefreshPreview = () => {
		setPreviewProduct(getPreviewProduct() as Product);
	};

	return (
		<div className="space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
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
									This is how your product will look on the store front.
								</DialogDescription>
							</DialogHeader>
							{previewProduct && (
								<ProductPreview product={previewProduct as Product} />
							)}
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
										<SelectItem value="clothing">Clothing</SelectItem>
										<SelectItem value="electronics">Electronics</SelectItem>
										<SelectItem value="books">Books</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<h3 className="mb-4 text-lg font-medium">Variants</h3>
						{variants.map((variant, index) => (
							<div
								key={index}
								className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
							>
								<FormField
									control={form.control}
									name={`variants.${index}.size`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Size</FormLabel>
											<FormControl>
												<Input placeholder="Size" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`variants.${index}.stock`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Stock</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="0"
													{...field}
													onChange={(e) => field.onChange(+e.target.value)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
						<Button type="button" variant="outline" onClick={addVariant}>
							Add Variant
						</Button>
					</div>
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
											const imageUrls = files.map((file) =>
												URL.createObjectURL(file)
											);
											field.onChange(imageUrls);
										}}
									/>
								</FormControl>
								<FormDescription>
									Upload one or more product images.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Add Product</Button>
				</form>
			</Form>
		</div>
	);
}
