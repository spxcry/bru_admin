import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";

// POST API สำหรับการสร้างสินค้าใหม่
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { title, description, media, category, tags, sizes, colors, price, expense } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

// GET API สำหรับการดึงข้อมูลสินค้า (เพิ่มการแบ่งหน้า)
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({ products, totalPages }, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";