"use client";
import {FIELD_TYPES} from "@/constants";
import {FIELD_NAMES} from "@/constants";
import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";

import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  Path,
} from "react-hook-form";
import {z, ZodType} from "zod";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Files} from "lucide-react";
import ImageUpload from "./ui/ImageUpload";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{success: boolean; error: string}>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {};

  return (
    <div className=" flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-whiet">
        {isSignIn ? "Chào mừng bạn trở lại với Thư viện thông minh! " : "Tạo tài khoản thư viện của bạn"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Đăng nhập"
          : "Vui lòng điền đầy đủ thông tin và tải ảnh thẻ sinh viên của bạn để truy cập vào thư viện"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({field}) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange}/>
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "Bạn là thành viên mới?" : "Bạn đã có tài khoản?"}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Hãy đăng ký tài khoản" : "Đăng nhập"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
