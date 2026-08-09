"use client";

import { BookOpen, GraduationCap, Library, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Course", icon: GraduationCap },
  { href: "/bible", label: "Bible", icon: BookOpen },
  { href: "/flashcards", label: "Flashcards", icon: Library }
];

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8faf7] text-[#18211d]">
      <header className="sticky top-0 z-20 border-b border-[#dce5d8] bg-[#fbfdf9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#1f4f35] text-white">
              <Sparkles size={19} aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-semibold">Supernatural Upgrade</span>
              <span className="block text-xs font-semibold text-[#66736a]">No-login discipleship course</span>
            </span>
          </Link>

          <nav className="grid grid-cols-3 gap-2 sm:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/" ? pathname === "/" || pathname.startsWith("/lessons") : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-[#1f4f35] bg-[#1f4f35] text-white"
                      : "border-[#d5dfd1] bg-white text-[#28352d] hover:border-[#91ad86]"
                  }`}
                >
                  <Icon size={16} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {children}
    </main>
  );
}

