import { dbConnect } from "@/lib/dbConnect";
import AddressModel from "@/models/Address";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const address = await AddressModel.findOne({
			_id: params.id,
			user: session.user._id,
		});

		if (!address) {
			return NextResponse.json(
				{ message: "Address not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Address fetched successfully", address },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching address:", error);
		return NextResponse.json(
			{ message: "Error fetching address" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
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

		const address = await AddressModel.findOneAndUpdate(
			{ _id: params.id, user: session.user._id },
			{
				addressLine1,
				addressLine2,
				city,
				state,
				country,
				postalCode,
				type,
			},
			{ new: true }
		);

		if (!address) {
			return NextResponse.json(
				{ message: "Address not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(
			{ message: "Address updated successfully", address },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating address:", error);
		return NextResponse.json(
			{ message: "Error updating address" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		await dbConnect();
		const session = await getServerSession();

		if (!session || !session.user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const address = await AddressModel.findOneAndDelete({
			_id: params.id,
			user: session.user._id,
		});

		if (!address) {
			return NextResponse.json(
				{ message: "Address not found" },
				{ status: 404 }
			);
		}
		await UserModel.findOneAndUpdate(
			{ _id: session.user._id },
			{ $pull: { userAddress: params.id } },
			{ new: true }
		);
		return NextResponse.json(
			{ message: "Address deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting address:", error);
		return NextResponse.json(
			{ message: "Error deleting address" },
			{ status: 500 }
		);
	}
}
