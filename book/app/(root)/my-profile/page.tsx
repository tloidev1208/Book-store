"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const Page = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOut({ callbackUrl: `${window.location.origin}/sign-in` });
    });
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); handleSignOut(); }} className="mb-10">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
        </Button>
      </form>

      <BookList title="Sách mượn" books={sampleBooks} />
    </>
  );
};

export default Page;