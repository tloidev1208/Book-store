import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import {db} from "@/database/drizzle";
import {books} from "@/database/schema";
import {auth} from "@/auth";
import {desc} from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} />

      <BookList
        title="Sách mới cập nhật"
        books={latestBooks.slice(0, 10)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
