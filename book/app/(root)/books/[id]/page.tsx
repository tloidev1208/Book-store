import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  // Fetch data based on id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  const idBorrow = bookDetails.id;
  return (
    <>
           <BookOverview {...bookDetails} userId={session?.user?.id as string} idBorrow={idBorrow} />


      <div className="book-details">
        
        <div className="flex flex-col md:flex-row gap-10 mt-4">
          {/* Summary */}
          <section className="flex-1 flex flex-col gap-4">
            <h3 className="font-semibold text-light-200 text-2xl">Tóm tắt</h3>
            <div className="space-y-4 text-base text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
          {/* Video */}
          <section className="flex-1 flex flex-col gap-4">
            <h3 className="font-semibold text-2xl text-light-200">Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
        </div>

        {/*  SIMILAR*/}
      </div>
    </>
  );
};
export default Page;
