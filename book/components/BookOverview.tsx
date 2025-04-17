"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "./BookCover";
import Link from "next/link";

type BookOverviewProps = Book & {
  id: string;
  userId?: string;
};

const BookOverview = ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: BookOverviewProps) => {
  return (
    <section className="book-overview">
      {/* LEFT SIDE */}
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            Tác giả{" "}
            <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p>
            Thể loại{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Tổng số sách: <span>{totalCopies}</span>
          </p>
          <p>
            Số lượng sách có sẵn: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        <div className="flex gap-4 mt-6">
          {/* Nút mượn sách */}
          <Button className="book-overivew_btn cursor-pointer">
            <Image src="/icons/book.svg" alt="book" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100 ml-2">
              Mượn sách
            </p>
          </Button>

          {/* Nút đọc sách */}
          <Link href={`/books/read/${id}`} passHref>
            <Button className="relative book-overivew_btn bg-blue-500 hover:bg-blue-600 cursor-pointer">
              {/* Nhãn BETA */}
              <div className="absolute -top-2 -right-2 bg-yellow-300 text-[12px] font-bold px-1 py-[1px] rounded">
                BETA
              </div>

              <Image src="/icons/book.svg" alt="book" width={20} height={20} />
              <p className="font-bebas-neue text-xl text-black ml-2">
                Đọc sách
              </p>
            </Button>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE - Book cover */}
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
