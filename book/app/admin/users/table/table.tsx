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
import { users } from "@/database/schema";
import { desc } from "drizzle-orm";

export default async function UserTable() {
  // Lấy tất cả dữ liệu từ bảng users
  const allUsers = (await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))) as {
    id: string;
    fullName: string;
    email: string;
    universityId: number;
    role: "USER" | "ADMIN" | null;
    lastActivityDate: string | null;
    createdAt: Date | null;
  }[];

  return (
    <Table>
      <TableCaption>Danh sách người dùng trong hệ thống.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Họ và tên</TableHead>
          <TableHead className="w-[200px]">Email</TableHead>
          <TableHead>MSSV</TableHead>
          <TableHead>Vai trò</TableHead>
          <TableHead>Hoạt động cuối</TableHead>
          <TableHead className="text-right">Ngày tạo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allUsers.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    user.role === "ADMIN"
                      ? "text-red-400 bg-red-100 border-red-200"
                      : "text-green-400 bg-green-100 border-green-200"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>

              <TableCell>
                {user.lastActivityDate
                  ? new Date(user.lastActivityDate).toLocaleDateString("vi-VN")
                  : "Không có"}
              </TableCell>
              <TableCell className="text-right">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                  : "Không rõ"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
