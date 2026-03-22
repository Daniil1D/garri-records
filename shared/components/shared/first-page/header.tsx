"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { Title } from "../title";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full rounded-2xl backdrop-blur-md bg-white/70 border-b border-gray-200">

      <div className="flex items-center justify-between py-4 md:py-5 p-6">

        <Title text="Garri Records" size="lg" />

        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-base lg:text-xl font-semibold">
          <Link href="/" className="text-gray-700 hover:text-black transition">
            Главная
          </Link>

          <Link
            href="/#tariffs"
            className="text-gray-700 hover:text-black transition"
          >
            Тарифы
          </Link>

          <Link
            href="/faq"
            className="text-gray-700 hover:text-black transition"
          >
            FAQ
          </Link>
        </nav>

        <Link href="/login">
          <Button
            className=" rounded-full border-2 border-black bg-transparent h-[40px] md:h-[44px] px-5 md:px-6 text-sm md:text-base text-black hover:bg-black hover:text-white transition">
            Войти
          </Button>
        </Link>
      </div>
    </header>
  );
};