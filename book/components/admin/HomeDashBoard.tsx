import React from "react";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import DashboardLatestBooks from "./DashboardLatestBooks";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import DashboardChart from "./DashboardChart";

function groupByMonth(items: { createdAt: Date | null }[]) {
  const stats: Record<string, number> = {};

  items.forEach((item) => {
    if (item.createdAt) {
      const month = format(item.createdAt, "MM/yyyy", { locale: vi });
      stats[month] = (stats[month] || 0) + 1;
    }
  });

  return stats;
}
export default async function HomeDashBoard() {
  // 🔢 Lấy tổng số sách
  const totalBooksResult = await db.select().from(books);
  const totalBooks = totalBooksResult.length;

    // 🔢 Lấy tổng số yêu cầu
    const totalBooksRequest = await db.select().from(borrowRecords);
    const totalRequest = totalBooksRequest.length;

  // 👤 Lấy tổng số người dùng
  const totalUsersResult = await db.select().from(users);
  const totalUsers = totalUsersResult.length;
  const booksData = await db.select().from(books);
  const usersData = await db.select().from(users);

  const booksPerMonth = groupByMonth(booksData);
  const usersPerMonth = groupByMonth(usersData);

  // Gộp lại các tháng có trong cả hai
  const allMonths = Array.from(new Set([...Object.keys(booksPerMonth), ...Object.keys(usersPerMonth)])).sort();

  const chartData = allMonths.map((month) => ({
    month,
    books: booksPerMonth[month] || 0,
    users: usersPerMonth[month] || 0,
  }));

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
          <p className="text-3xl font-semibold">{totalRequest}</p>
        </div>
      </div>
      <DashboardLatestBooks />
      <DashboardChart data={chartData} />
    </div>
  );
}
