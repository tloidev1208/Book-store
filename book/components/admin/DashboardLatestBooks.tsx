import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

export default async function DashboardLatestBooks() {
  // 🔄 Lấy 5 sách mới nhất từ DB
  const latestBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Sách mới thêm</h2>
      <ul className="space-y-4">
        {latestBooks.map((book) => (
          <li key={book.id} className="flex items-center space-x-4">
            <img
              src={
                book.coverUrl
                  ? `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${book.coverUrl}`
                  : "https://via.placeholder.com/50"
              }
              alt={book.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-gray-600">Tác giả: {book.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
