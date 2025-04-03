"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon mũi tên

const Sidebar = ({ session }: { session: Session }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Tự động thu gọn khi màn hình nhỏ hơn 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Gọi ngay khi component mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cn("admin-sidebar transition-all", isCollapsed ? "w-20" : "w-64")}>
      {/* Nút thu gọn */}
      <button
        className="absolute top-20 right-[-10px] p-1 rounded-sm bg-gray-200 hover:bg-gray-100 transition border border-gray-300 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div>
        <div className="logo flex items-center gap-3">
          <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
          {!isCollapsed && <h1 className="text-lg font-semibold">QIZAPY</h1>}
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route} className="block">
                <div
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition",
                    isSelected
                      ? "bg-primary-admin shadow-sm text-white"
                      : "text-dark hover:bg-gray-200"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt={link.text}
                      fill
                      className={cn("object-contain", { "brightness-0 invert": isSelected })}
                    />
                  </div>
                  {!isCollapsed && <p>{link.text}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User info */}
      <div className="user flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        {!isCollapsed && (
          <div className="flex flex-col max-md:hidden">
            <p className="font-semibold text-dark-200">{session?.user?.name}</p>
            <p className="text-xs text-light-500">{session?.user?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
