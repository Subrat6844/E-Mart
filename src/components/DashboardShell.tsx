import { AppSidebar } from "@/components/Sidebar";

export default function DashboardShell({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen overflow-hidden">
			<AppSidebar />
			<main className="flex-1 overflow-y-auto bg-background">{children}</main>
		</div>
	);
}
