import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await dbConnect();
	try {
		const { firstName, lastName, email, password, username } = await req.json();

		if (!firstName || !lastName || !email || !password || !username) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}
		const existingUserByEmail = await UserModel.findOne({ email });
		if (existingUserByEmail) {
			return NextResponse.json(
				{ message: "Email already exists" },
				{ status: 400 }
			);
		}
		const existingUserByUsername = await UserModel.findOne({ username });
		if (existingUserByUsername) {
			return NextResponse.json(
				{ message: "Username already exists" },
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await UserModel.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			username,
			role: "customer",
		});
		return NextResponse.json(
			{ message: "User created successfully" },
			{ status: 201 }
		);
	} catch (error) {
		console.log("signup-error", error);
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
