import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	await dbConnect();
	try {
		const { newPassword, token } = await req.json();
		if (!newPassword || !token) {
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);
		}
		const user = await UserModel.findOne({ token });
		if (!user) {
			return NextResponse.json({ message: "Invalid token" }, { status: 400 });
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		user.token = undefined;
		user.tokenExpiry = undefined;
		await user.save();
		return NextResponse.json(
			{ message: "Password reset successful" },
			{ status: 200 }
		);
	} catch (err) {
		console.log("Error while setting new password", err);
		return NextResponse.json({ message:"Something went wrong" }, { status: 500 });
	}
}
