"use client";
import DashboardShell from "@/components/DashboardShell";
import PageLoader from "@/components/Loader";
import { useEffect, useState } from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <DashboardShell>{children}</DashboardShell>;
}
