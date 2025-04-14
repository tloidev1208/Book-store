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
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
export default async function BookTable() {
  // Lấy tất cả dữ liệu từ bảng books
  const allBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  // URL endpoint của ImageKit
  const imagekitBaseURL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  return (
    <Table>
      <TableCaption>Danh sách các đầu sách trong thư viện.</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead>Ảnh bìa</TableHead>
          <TableHead className="w-[200px]">Tiêu đề</TableHead>
          <TableHead>Tác giả</TableHead>
          <TableHead>Thể loại</TableHead>
          <TableHead>Xếp hạng</TableHead>
          <TableHead>Số bản có sẵn</TableHead>
          <TableHead className="text-right">Ngày thêm</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allBooks.map((book) => {
          // 🟢 Lấy đường dẫn ảnh từ ImageKit
          const coverImagePath = book.coverUrl;
          const coverImageURL = coverImagePath
            ? `${imagekitBaseURL}${coverImagePath}`
            : null;

          return (
            <TableRow key={book.id}>
              <TableCell>
                {coverImageURL ? (
                  <img
                    src={coverImageURL}
                    alt={book.title}
                    className="w-[50px] h-[70px] object-cover"
                  />
                ) : (
                  <span>Ảnh không có sẵn</span>
                )}
              </TableCell>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.rating}</TableCell>
              <TableCell>{book.availableCopies}</TableCell>
              <TableCell className="text-right">
                {new Date(book.createdAt ?? new Date()).toLocaleDateString(
                  "vi-VN"
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
