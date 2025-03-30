"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <span className="text-white">Qizapy</span>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-yellow-400" : "text-gray-400"
            )}
          >
            Thư viện
          </Link>
        </li>
        <li>
          <div className="flex flex-row items-center gap-2">
            <Link href="/my-profile" className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-amber-100">
                  {getInitials(session.user?.name || "IN")}
                </AvatarFallback>
              </Avatar>
              <span className="text-base text-white">
                Xin chào, {session.user?.name}!
              </span>
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
