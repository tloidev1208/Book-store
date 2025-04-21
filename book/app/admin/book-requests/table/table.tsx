import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

import { db } from "@/database/drizzle";
import { borrowRecords, users, books } from "@/database/schema";
import { desc, eq } from "drizzle-orm";

export default async function BorrowTable() {
  // 🟢 Truy vấn dữ liệu từ bảng borrowRecords + users + books
  const borrowData = await db
    .select({
      id: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      userName: users.fullName,
      userEmail: users.email,
      bookTitle: books.title,
    })
    .from(borrowRecords)
    .leftJoin(users, eq(borrowRecords.userId, users.id))
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .orderBy(desc(borrowRecords.borrowDate));

  return (
    <Table>
      <TableCaption>Danh sách lịch sử mượn sách.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Người mượn</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Sách</TableHead>
          <TableHead>Ngày mượn</TableHead>
          <TableHead>Hạn trả</TableHead>
          <TableHead>Ngày trả</TableHead>
          <TableHead className="text-right">Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.userName}</TableCell>
            <TableCell>{item.userEmail}</TableCell>
            <TableCell className="font-semibold">{item.bookTitle}</TableCell>
            <TableCell>
              {item.borrowDate
                ? new Date(item.borrowDate).toLocaleDateString("vi-VN")
                : "Không rõ"}
            </TableCell>
            <TableCell>
              {item.dueDate
                ? new Date(item.dueDate).toLocaleDateString("vi-VN")
                : "Không rõ"}
            </TableCell>
            <TableCell>
              {item.returnDate
                ? new Date(item.returnDate).toLocaleDateString("vi-VN")
                : "Chưa trả"}
            </TableCell>
            <TableCell className="text-right">
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  item.status === "BORROWED"
                    ? "text-yellow-600 bg-yellow-100"
                    : item.status === "RETURNED"
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {item.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
