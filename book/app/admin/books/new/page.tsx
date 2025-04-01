import { Button } from "@/components/ui/button";
import React from "react";
import  Link  from "next/link";
const Page = () => {
    return (
     <>
        <Button asChild className="back-btn">
            <Link href="/admin/books">Go Back</Link>

        </Button>

        <section className="w-full max-w-2xl">
            <p>Book Form</p>
        </section>
      </>
    );
};
export default Page;