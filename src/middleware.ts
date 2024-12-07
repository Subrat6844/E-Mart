import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});
	const { pathname } = request.nextUrl;

	// Define routes for public and protected access
	const publicRoutes = ["/", "/login", "/signup"];
	const protectedRoutes = ["/admin"];

	// Redirect authenticated users away from public routes
	if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Redirect unauthenticated users trying to access protected routes
	if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Allow requests to proceed if they don't match any of the above conditions
	return NextResponse.next();
}
