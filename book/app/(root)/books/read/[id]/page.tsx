
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <>
      <div className="book-details">
        <div className="flex flex-col md:flex-row gap-10 mt-4">
          {/* Summary */}
          <section className="flex-1 flex flex-col gap-4 justify-center items-center">
            <h3 className="font-semibold text-light-200 text-5xl p-4">{bookDetails.title}</h3>
            <div className="space-y-4 text-light-100 text-2xl p-4">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/*  SIMILAR*/}
      </div>
    </>
  );
};
export default Page;
