import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import AddressModel from "@/models/Address";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const {
			addressLine1,
			addressLine2,
			city,
			state,
			country,
			postalCode,
			type,
		} = await req.json();

		const address = await AddressModel.create({
			user: session.user._id,
			addressLine1,
			addressLine2,
			city,
			state,
			country,
			postalCode,
			type,
		});
		await UserModel.findOneAndUpdate(
			{ _id: session.user._id },
			{ $push: { userAddress: address._id } }
		);
		return NextResponse.json(
			{ message: "Address added successfully", address },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating address:", error);
		return NextResponse.json(
			{ message: "Error creating address" },
			{ status: 500 }
		);
	}
}

export async function GET(req: Request) {
	try {
		await dbConnect();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const addresses = await AddressModel.find({ user: session.user._id });

		return NextResponse.json(
			{ message: "Addresses fetched successfully", addresses },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching addresses:", error);
		return NextResponse.json(
			{ message: "Error fetching addresses" },
			{ status: 500 }
		);
	}
}
