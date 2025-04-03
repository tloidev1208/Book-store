import type { Metadata } from "next";
import { Big_Shoulders_Display } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
const bigShoulders = Big_Shoulders_Display({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["400", "700"], // Chọn các trọng số cần thiết
});

export const metadata: Metadata = {
  title: "QIZAPY Library",
  description: "Khám phá những cuốn sách tuyệt vời nhất",
  icons: "/icons/logo.svg", // Đường dẫn tới icon của bạn
};


const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en">
        <SessionProvider session={session}>
      <body className={`${bigShoulders.variable} antialiased`}>
        {children}

        <Toaster position="bottom-right" richColors />
      </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
