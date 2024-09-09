'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns"; // เปลี่ยนจาก CollectionColumns เป็น CustomerColumns
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Customers = () => { // เปลี่ยนจาก Collections เป็น Customers
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]); // เปลี่ยนจาก collections เป็น customers

  const getCustomers = async () => { // เปลี่ยนจาก getCollections เป็น getCustomers
    try {
      const res = await fetch("/api/customers", { // เปลี่ยนจาก /api/collections เป็น /api/customers
        method: "GET",
      });

      const data = await res.json();
      setCustomers(data); // เปลี่ยนจาก setCollections เป็น setCustomers
      setLoading(false);
    } catch (err) {
      console.log("[customers_GET]", err); // เปลี่ยนจาก collections_GET เป็น customers_GET
    }
  };
  
  useEffect(() => {
    getCustomers(); // เปลี่ยนจาก getCollections เป็น getCustomers
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Customers</p> {/* เปลี่ยนจาก Collections เป็น Customers */}
        <Button 
          className="bg-pink-500 text-white p-3 shadow-lg transition-all duration-300 ease-in-out" 
          onClick={() => router.push("customers/new")}
          style={{ 
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)', // เพิ่มเงาดำ
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0, 0, 0, 0.8)'; // เพิ่มแสงเมื่อเมาส์ชี้
            e.currentTarget.style.backgroundColor = '#ff66b2'; // เพิ่มเอฟเฟกต์เปลี่ยนสีปุ่มเมื่อชี้
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.4)'; // กลับมาเป็นเงาปกติ
            e.currentTarget.style.backgroundColor = '#ec4899'; // กลับมาที่สีชมพูเดิมเมื่อออกจากปุ่ม
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Customer {/* เปลี่ยนจาก Create Collection เป็น Create Customer */}
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4"/>
      <DataTable columns={columns} data={customers} searchKey="title" /> {/* เปลี่ยนจาก collections เป็น customers */}
    </div>
  );
};

export default Customers; // เปลี่ยนจาก Collections เป็น Customers
