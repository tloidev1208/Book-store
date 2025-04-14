import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Table from "./table/table";

const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Tất cả sách</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Thêm sách mới
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
      <Table />
      </div>
    </section>
  );
};

export default Page;