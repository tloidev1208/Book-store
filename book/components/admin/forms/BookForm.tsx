"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
} from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props extends Partial<Book> {
    type?: " create" | "update";
}

const BookForm = ({ type,...book}: Props) => {
  const router = useRouter();

  const form= useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues:{
        title: "",
        description: "",
        author: "",
        genre: "",
        rating: 1,
        totalCopies: 1,
        coverColor: "",
        videoUrl: "",
        summary: "",
    

    }
});
    const onSubmit= async (values: z.infer<typeof bookSchema>) => {};

  return (
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}className="space-y-8">
            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Tên sách
                  </FormLabel>
                  <FormControl>  
                      <Input
                        required
                        placeholder="Nhập tên sách"
                        {...field}
                        className="form-input"
                      />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"author"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Tác giả
                  </FormLabel>
                  <FormControl>  
                      <Input
                        required
                        placeholder="Nhập tên tác giả"
                        {...field}
                        className="form-input"
                      />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"genre"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Thể loại
                  </FormLabel>
                  <FormControl>  
                      <Input
                        required
                        placeholder="Thể loại sách"
                        {...field}
                        className="form-input"
                      />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"rating"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Đánh giá
                  </FormLabel>
                  <FormControl>  
                      <Input
                        type="number"
                          min={1}
                          max={5}
                        placeholder="Nhập đánh giá từ 1 đến 5"
                        {...field}
                        className="form-input"
                      />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"totalCopies"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Tổng số bản sao
                  </FormLabel>
                  <FormControl>  
                      <Input
                        type="number"
                          min={1}
                          max={10000}
                        placeholder="Nhập tổng số bản sao"
                        {...field}
                        className="form-input"
                      />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"coverUrl"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                     Ảnh bìa sách
                  </FormLabel>
                  <FormControl>{/* File Upload*/}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name={"coverColor"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                     Màu bìa sách
                  </FormLabel>
                  <FormControl>{/*Color Picker*/}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Mô tả sách
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả sách"
                    {...field}
                     rows={10} 
                     className="book-form input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"videoUrl"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Video giới thiệu sách
                  </FormLabel>
                  <FormControl>{/* File Upload*/}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"summary"}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-normal text-dark-500">
                    Tóm tắt sách
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tóm tắt sách"
                    {...field}
                     rows={5} 
                     className="book-form input"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="book-form-btn text-white">
                Add Book to Library

            </Button>
        </form>
      </Form>
  );
};
export default BookForm;