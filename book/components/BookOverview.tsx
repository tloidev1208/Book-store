import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "./BookCover";


const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title} </h1>
        <div className="book-info">
          <p>
            Tác giả <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p>
            Thể loại {" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row  gap-1">
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

       <Button className="book-overivew_btn">
        <Image src="/icons/book.svg" alt="book" width={20} height={20} />
        <p className="font-bebas-neue text-xl text-dark-100">Mượn sách</p>
        </Button>



      </div>
      
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
           variant="wide" coverColor={coverColor} coverImage={coverUrl} />

           </div>
        </div>

      </div>

    </section>
  );
};

export default BookOverview;
