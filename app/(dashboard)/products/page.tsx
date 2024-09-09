'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/products/ProductColumns";

const Products = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data.products);  // ตรวจสอบให้แน่ใจว่า data.products เป็น array ที่มีข้อมูลสินค้าถูกต้อง
      setLoading(false);
    } catch (err) {
      console.log("[getProducts]", err);
    }
  };

  useEffect(() => {
    getProducts();  // ดึงข้อมูลเมื่อโหลดหน้า
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-pink-500 text-white p-3 shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => router.push("/products/new")}
          style={{
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)', // เพิ่มเงาดำให้กับปุ่ม
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, 0.8)'; // เพิ่มแสงและเงาเมื่อเม้าส์ชี้
            e.currentTarget.style.backgroundColor = '#ff66b2'; // เปลี่ยนสีพื้นหลังเมื่อเม้าส์ชี้
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.4)'; // กลับมาเป็นค่าเงาเดิมเมื่อเม้าส์ออก
            e.currentTarget.style.backgroundColor = '#ec4899'; // กลับมาที่สีพื้นหลังเดิม
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
