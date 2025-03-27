"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react"; // Đúng cách
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const Page = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut(); // Đăng xuất đúng cách
    });
  };

  return (
    <>
      <form action={handleSignOut} className="mb-10">
        {/* <Button disabled={isPending}>{isPending ? "Đang đăng xuất..." : "Đăng xuất"}</Button> */}
      </form>

      <BookList title="Sách mượn" books={sampleBooks} />
    </>
  );
};

export default Page;
