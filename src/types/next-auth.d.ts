
import { DefaultSession, DefaultUser } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      role: "customer" | "admin"; // Role-based access
      firstName?: string; // User's first name
      lastName?: string; // User's last name
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    _id: string;
    role: "customer" | "admin";
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: "customer" | "admin";
    firstName?: string;
    lastName?: string;
  }
}
