'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/collections/CollectionColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button 
          className="bg-pink-500 text-white p-3 shadow-lg transition-all duration-300 ease-in-out" 
          onClick={() => router.push("collections/new")}
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
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4"/>
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
