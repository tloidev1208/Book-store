"use client";
import Image from "next/image";
import React, {useState} from "react";
import {Button} from "./ui/button";
import {borrowBook} from "@/lib/actions/book";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}
const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: {isEligible, message},
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error("Lỗi không xác định xảy ra");
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({bookId, userId});

      if (result.success) {
        toast.success("Thành công!");

        router.push("/");
      } else {
        toast.error("Lỗi không xác định xảy ra");
      }
    } catch (error) {
      toast.error("Lỗi không xác định xảy ra");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overivew_btn cursor-pointer"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />{" "}
      <p className="font-bebas-neue text-xl text-dark-100 ml-2">
        {" "}
        {borrowing ? "đang mượn sách ..." : "Mượn sách"}
      </p>
    </Button>
  );
};

export default BorrowBook;
