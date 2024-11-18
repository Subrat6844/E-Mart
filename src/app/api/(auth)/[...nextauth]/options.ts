import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any): Promise<any> {
				await dbConnect();
				try {
					const user = await UserModel.findOne({
						$or: [
							{ email: credentials.identifier },
							{ username: credentials.identifier },
						],
					});
					if (!user) {
						throw new Error("No user found with this email");
					}
					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (isPasswordCorrect) {
						return user;
					} else {
						throw new Error("Incorrect password");
					}
				} catch (err: any) {
					throw new Error(err);
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		// Handles the JWT token generation and enrichment
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id?.toString();
				token.role = user.role; // 'customer', 'admin', or 'seller'
				token.email = user.email; // Add email for additional context
				token.firstName = user.firstName;
				token.lastName = user.lastName;
			}
			return token;
		},

		// Enriches the session object with additional user-specific data
		async session({ session, token }) {
			if (token) {
				session.user = {
					...session.user,
					_id: token._id,
					role: token.role,
					email: token.email,
					firstName: token.firstName,
					lastName: token.lastName,
				};
			}
			return session;
		},
	},

	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: "/sign-in",
	},
};
