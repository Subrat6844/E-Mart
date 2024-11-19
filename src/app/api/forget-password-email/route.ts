import nodemailer from "nodemailer";
import crypto from "crypto";
import { dbConnect } from "@/lib/dbConnect"; // Database connection helper
import UserModel from "@/models/User"; // User model

export default async function POST(req: Request) {
	const { email } = await req.json();

	if (!email) {
		return Response.json({ message: "Email is required" }, { status: 400 });
	}

	try {
		await dbConnect();
		const user = await UserModel.findOne({ email });
		if (!user) {
			return Response.json({ message: "User not found" }, { status: 404 });
		}
		const resetToken = crypto.randomBytes(32).toString("hex");
		user.token = resetToken;
		user.tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
		await user.save();
		const resetUrl = `${process.env.DOMAIN}/forgot-password?token=${resetToken}`;
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Password Reset Request",
			html: `
        <p>Hello,</p>
        <p>You requested a password reset. Please use the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
		};
		await transporter.sendMail(mailOptions);
		return Response.json(
			{ message: "Reset email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending reset email:", error);
		return Response.json(
			{ message: "Error sending reset email" },
			{ status: 500 }
		);
	}
}
