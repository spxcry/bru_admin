import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Customer from "@/lib/models/Customer"; // เปลี่ยนเป็น Customer

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { title, description, image } = await req.json();

    const existingCustomer = await Customer.findOne({ title }); // เปลี่ยนเป็น Customer

    if (existingCustomer) {
      return new NextResponse("Customer already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    const newCustomer = await Customer.create({ // เปลี่ยนเป็น Customer
      title,
      description,
      image,
    });

    await newCustomer.save();

    return NextResponse.json(newCustomer, { status: 200 });
  } catch (err) {
    console.log("[customer_POST]", err); // แก้ไขการ log message
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const customers = await Customer.find().sort({ createdAt: "desc" }); // เปลี่ยนเป็น Customer

    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.log("[customers_GET]", err); // แก้ไขการ log message
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
