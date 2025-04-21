
import BookList from "@/components/BookList"
import React from "react"
import {db} from "@/database/drizzle";
import {books} from "@/database/schema";
import {auth} from "@/auth";
import {desc} from "drizzle-orm";

const Search = async () => {
    const session = await auth();
    
      const latestBooks = (await db
        .select()
        .from(books)
        .limit(10)
        .orderBy(desc(books.createdAt))) as Book[];
  return (
    <form className=" mx-auto">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-100 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-50 border border-gray-300 rounded-lg 
          bg-gray-700 focus:ring-blue-500 focus:border-blue-500 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tìm kiếm sách, tác giả..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
          rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 
          dark:focus:ring-blue-800"
        >
          Tìm
        </button>
      </div>
      <BookList
        title="Sách mới cập nhật"
        books={latestBooks.slice(0, 10)}
        containerClassName="mt-28"
      />
    </form>
  )
}

export default Search
