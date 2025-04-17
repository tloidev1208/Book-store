import React from "react";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { desc } from "drizzle-orm";
import { Book, User } from "lucide-react"; // ✅ import icon

export default async function DashboardLatestBooks() {
  const latestBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(5);

  const latestUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(5);

  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {/* Sách */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
            <Book className="w-5 h-5 text-red-500" /> Sách mới thêm
          </h2>
        </div>
        <ul className="space-y-2">
          {latestBooks.map((book) => (
            <li key={book.id} className="flex items-center space-x-4 bg-[#F8F8FF] p-4 rounded-md">
              <img
                src={
                  book.coverUrl
                    ? `${baseUrl}${book.coverUrl}`
                    : "https://via.placeholder.com/50"
                }
                alt={book.title}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-sm text-gray-600">Tác giả: {book.author}</p>
                <p className="text-sm text-gray-600">Ngày thêm: {book.createdAt?.toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Người dùng */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
            <User className="w-5 h-5 text-green-500" /> Người dùng mới
          </h2>
        </div>
        <ul className="space-y-2">
          {latestUsers.map((user) => (
            <li key={user.id} className="flex items-center space-x-4 bg-[#F8F8FF] p-4 rounded-md">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`}
                alt={user.fullName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
