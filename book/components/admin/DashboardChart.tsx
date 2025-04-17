"use client";

import { ChartArea } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyStats {
  month: string;
  books: number;
  users: number;
}

export default function DashboardChart({ data }: { data: MonthlyStats[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
      <ChartArea className="w-5 h-5 text-red-500" />  Biểu đồ thống kê theo tháng
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="books" stroke="#8884d8" name="Sách" />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#82ca9d"
            name="Người dùng"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
