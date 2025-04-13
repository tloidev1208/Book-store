"use server";
import { InferInsertModel } from "drizzle-orm";
type BookParams = InferInsertModel<typeof books>;
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { PgInsertBase } from "drizzle-orm/pg-core";

const createBook = async(params: BookParams)=>{
    try{
        const newBook = await db.insert(books).values({...params,
            availableCopies: params.totalCopies,


        })
        .returning();
        return{
            success:true,
            data:JSON.parse(JSON.stringify(newBook[0])),
        };
    }catch(error){
        console.log(error);
        return {
            success: false,
            message:"An error occurred while crateing the book"
        }
    }
}
export { createBook };