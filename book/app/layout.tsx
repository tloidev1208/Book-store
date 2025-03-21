import type { Metadata } from "next";
import { Big_Shoulders_Display } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const bigShoulders = Big_Shoulders_Display({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["400", "700"], // Chọn các trọng số cần thiết
});

export const metadata: Metadata = {
  title: "Book",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${bigShoulders.variable} antialiased`}>
        {children}

        <Toaster/>
      </body>
    </html>
  );
};

export default RootLayout;
