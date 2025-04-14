import React from "react";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import DashboardLatestBooks from "./DashboardLatestBooks";
export default async function HomeDashBoard() {
  // 🔢 Lấy tổng số sách
  const totalBooksResult = await db.select().from(books);
  const totalBooks = totalBooksResult.length;

  // 👤 Lấy tổng số người dùng
  const totalUsersResult = await db.select().from(users);
  const totalUsers = totalUsersResult.length;

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-left">
          <h2 className="text-lg font-sans text-gray-600">Tổng số sách</h2>
          <p className="text-3xl font-semibold">{totalBooks}</p>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-md text-left">
          <h2 className="text-lg font-sans text-gray-600">Người dùng</h2>
          <p className="text-3xl font-semibold">{totalUsers}</p>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-md text-left">
          <h2 className="text-lg font-sans text-gray-600">Yêu cầu mượn sách</h2>
          <p className="text-3xl font-semibold">--</p>
        </div>
      </div>
      <DashboardLatestBooks />
    </div>
  );
}
