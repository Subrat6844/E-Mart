"use client";
import DashboardShell from "@/components/DashboardShell";
import PageLoader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		// Simulate a delay to mimic data fetching or server-side processing
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 2000); // Adjust the time as needed

		return () => clearTimeout(timeout); // Cleanup timeout when the component unmounts
	}, []);

	if (loading) {
		return <PageLoader />;
	}
	return <DashboardShell>{children}</DashboardShell>;
}
