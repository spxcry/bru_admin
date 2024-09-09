import { connectToDB } from "@/lib/mongoDB";
import Customer from "@/lib/models/Customer"; // เปลี่ยนจาก Collection เป็น Customer
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const customers = await Customer.find().sort({ createdAt: "desc" }); // เปลี่ยนเป็น Customer

    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.log("[customers_GET]", err); // เปลี่ยนข้อความ log ให้ตรงกับ Customer
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextResponse,
  { params }: { params: { customerId: string } } // เปลี่ยนจาก collectionId เป็น customerId
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let customer = await Customer.findById(params.customerId); // เปลี่ยนเป็น Customer

    if (!customer) {
      return new NextResponse("Customer not found", { status: 404 }); // เปลี่ยนข้อความแสดงผล
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    customer = await Customer.findByIdAndUpdate( // เปลี่ยนเป็น Customer
      params.customerId, // ใช้ customerId แทน collectionId
      { title, description, image },
      { new: true }
    );

    await customer.save();

    return NextResponse.json(customer, { status: 200 });
  } catch (err) {
    console.log("customerId_POST", err); // เปลี่ยนข้อความ log
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextResponse,
  { params }: { params: { customerId: string } } // เปลี่ยนจาก collectionId เป็น customerId
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    await Customer.findByIdAndDelete(params.customerId); // เปลี่ยนเป็น Customer
    return new NextResponse("Customer is deleted", { status: 200 }); // เปลี่ยนข้อความแสดงผล
  } catch (err) {
    console.log("[customerId_DELETE]", err); // เปลี่ยนข้อความ log
    return new NextResponse("Internal error", { status: 500 });
  }
};