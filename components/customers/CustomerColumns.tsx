"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<CustomerTypes>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/customers/${row.original._id}`} // เปลี่ยนจาก collections เป็น customers
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="customer" id={row.original._id} />, // เปลี่ยนจาก collection เป็น customer
  },
];