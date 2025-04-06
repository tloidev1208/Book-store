import React from "react";
import { Button } from "@/components/ui/button";
import { signOut, auth } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  // 🟢 Lấy session người dùng
  const session = await auth();
  const email = session?.user?.email;

  // 🟢 Lấy thông tin người dùng từ database
  const user = email
    ? await db.select().from(users).where(eq(users.email, email)).limit(1)
    : null;

  // 🟢 Lấy đường dẫn ảnh từ ImageKit
  const universityCardPath = user?.[0]?.universityCard;
  const imagekitBaseURL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const universityCardURL = universityCardPath
    ? `${imagekitBaseURL}${universityCardPath}`
    : null;

  return (
    <div className="mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* 🟢 Cột trái: Thông tin sinh viên */}
<div className="relative bg-gray-900 text-white p-6 rounded-xl shadow-lg">
  {/* 🟢 "Băng keo" phía trên */}
  <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-14 h-20 bg-gray-700 rounded-b-3xl p-2">
  <div className="p-2 bg-gray-900 mt-10 rounded-4xl"></div>
  </div>

{/* 🟢 Header */}
<div className="flex flex-row items-center space-x-4">
  {/* 🟢 Avatar */}
  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">
    {user?.[0]?.fullName?.charAt(0)}
  </div>

  {/* 🟢 Thông tin tên & email */}
  <div className="flex flex-col">
    <h2 className="text-2xl font-semibold">{user?.[0]?.fullName || "Tên không xác định"}</h2>
    <p className="text-gray-400">{user?.[0]?.email || "Không có email"}</p>
  </div>
</div>

  {/* 🟢 Thông tin sinh viên */}
  <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold">Thông tin sinh viên</h3>
    <p className="mt-1 text-gray-300">
      <span className="font-bold">Mã sinh viên:</span> {user?.[0]?.universityId || "N/A"}
    </p>
    <p className="mt-1 text-gray-300">
      <span className="font-bold">Email:</span> {user?.[0]?.email || "N/A"}
    </p>
  </div>

  {/* 🟢 Thẻ sinh viên */}
  {universityCardURL ? (
    <div className="mt-6 flex justify-center">
      <img
        src={universityCardURL}
        alt="University Card"
        className="w-full max-w-xs rounded-lg shadow-lg border border-gray-700"
      />
    </div>
  ) : (
    <p className="text-gray-500 mt-4 text-center">Không có thẻ sinh viên</p>
  )}

  {/* 🟢 Form đăng xuất */}
  <form
    action={async () => {
      "use server";
      await signOut();
    }}
    className="mt-6"
  >
    <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full cursor-pointer">
      Đăng xuất
    </Button>
  </form>
</div>


      {/* 🟢 Cột phải: Danh sách sách đã mượn */}
      <div className="bg-gray-900 p-3 rounded-xl shadow-lg">
        <BookList  title="📚 Sách đã mượn" books={sampleBooks} />
      </div>
    </div>
  );
};

export default Page;
