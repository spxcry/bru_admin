"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { usecheckRole } from "@/utils/roles";

const LeftSideBar = () => {
  const { user } = useUser();
  const isAdmin = usecheckRole("admin");

  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-pink-400 shadow-lg max-lg:hidden text-white">
      <Image src="/logo.png" alt="logo" width={300} height={70} />

      <div className="flex flex-col gap-8">
        {navLinks
          .filter((link) => link.label !== "Customers" || isAdmin)
          .filter((link) => link.label !== "Orders") // เอา "Orders" ออก
          .map((link) => (
            <Link
              href={link.url}
              key={link.label}
              className={`flex items-center gap-4 text-body-medium ${
                pathname === link.url
                  ? "text-white font-semibold"
                  : "text-pink-200"
              } hover:bg-pink-300 hover:text-white p-2 rounded-lg transition-all duration-300 shadow-sm`}
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }} // เพิ่มเงาสีดำให้ข้อความ
            >
              {link.icon} <p>{link.label}</p>
            </Link>
          ))}
      </div>

      <div className="flex gap-4 items-center mt-auto">
        <UserButton />
        <p
          className="text-sm text-pink-200"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          Edit Profile
        </p>
      </div>
    </div>
  );
};

export default LeftSideBar;
