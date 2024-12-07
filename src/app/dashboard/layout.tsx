import { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Admin dashboard for e-commerce platform",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DashboardShell>{children}</DashboardShell>;
}
