"use client";

import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import {
  User,
  Music,
  LayoutGrid,
  CreditCard,
  Banknote,
  Briefcase,
  HelpCircle,
  LifeBuoy,
  Menu,
  X,
} from "lucide-react";

import { useSideMenuStore } from "@/shared/store/side-menu";
import Link from "next/link";

interface Props {
  className?: string;
}

const menu = [
  { id: 1, icon: User, label: "Профиль", href: "/account" },
  { id: 2, icon: Music, label: "Релизы", href: "/releases" },
  { id: 3, icon: Music, label: "Топ чарты", href: "/charts" },
  { id: 4, icon: LayoutGrid, label: "Статистика", href: "/statistics" },
  { id: 5, icon: CreditCard, label: "Баланс", href: "/balance" },
  { id: 6, icon: Banknote, label: "Финансы", href: "/finans-analitica" },
  { id: 7, icon: Briefcase, label: "Услуги", href: "/dop-uslugi" },
  { id: 8, icon: HelpCircle, label: "Помощь", href: "/help" },
  { id: 9, icon: LifeBuoy, label: "Поддержка", href: "/support" },
];

export const SideMenu: React.FC<Props> = ({ className }) => {
  const sideMenuActiveId = useSideMenuStore((state) => state.activeId);
  const setSideMenuActiveId = useSideMenuStore((state) => state.setActiveId);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        <span className="font-bold">Меню</span>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={cn(
          `
          fixed lg:static
          top-0 left-0
          h-full
          w-[260px]
          bg-white border
          rounded-none lg:rounded-2xl
          flex flex-col
          py-6 px-4 gap-2
          transform transition-transform duration-300
          z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          `,
          "lg:m-8",
          className
        )}
      >
        <div className="lg:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {menu.map(({ id, icon: Icon, href, label }) => (
          <Link
            key={id}
            href={href}
            onClick={() => {
              setSideMenuActiveId(id);
              setOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-black hover:bg-gray-50 transition",
              sideMenuActiveId === id &&
                "text-black bg-gray-100 font-medium"
            )}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base">{label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};