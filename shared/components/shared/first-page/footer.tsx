"use client";

import React from "react";
import Link from "next/link";
import { Send, Youtube, Instagram } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

type SocialItem = {
  icon: React.ReactNode;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Главная", href: "#" },
  { label: "Тарифы", href: "#" },
  { label: "FAQ", href: "#" },
];

const buttons = [
  { label: "Личный кабинет", href: "/login" },
  { label: "Тех. Поддержка", href: "/login" },
];

const socials: SocialItem[] = [
  { icon: <Send size={22} />, href: "#" },
  { icon: <Youtube size={22} />, href: "#" },
  { icon: <span className="font-bold text-base">VK</span>, href: "#" },
  { icon: <Instagram size={22} />, href: "#" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 px-4 md:px-6">
      <div className="rounded-[40px] md:rounded-[60px] p-8 md:p-12 lg:p-16 text-white bg-gradient-to-r from-[#0f0f10] via-[#1b1b1d] to-[#2a1d33]">

        {/* Верхний блок */}
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">

          {/* Меню */}
          <nav className="flex flex-wrap gap-6 text-xl md:text-2xl font-semibold">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Адрес + соцсети */}
          <div className="flex flex-col lg:items-end gap-6">

            <p className="text-sm md:text-lg opacity-80 text-left lg:text-right">
              📍 г. Москва, Пресненская наб., д. 10 стр. 2, этаж 11 пом.97
            </p>

            <div className="flex gap-4">
              {socials.map((social, index) => (
                <SocialButton key={index} href={social.href}>
                  {social.icon}
                </SocialButton>
              ))}
            </div>

          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          {buttons.map((button) => (
            <Link
              key={button.label}
              href={button.href}
              className="px-8 py-4 border border-white rounded-xl text-base md:text-lg hover:bg-white hover:text-black transition text-center"
            >
              {button.label}
            </Link>
          ))}
        </div>

        {/* Нижняя строка */}
        <div className="flex flex-col md:flex-row gap-4 md:justify-between mt-12 text-sm opacity-80">

          <p>© 2026, YOURTUNES</p>

          <div className="flex gap-6">
            <Link href="#">Публичная оферта</Link>
            <Link href="#">Политика конфиденциальности</Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

type SocialButtonProps = {
  href: string;
  children: React.ReactNode;
};

const SocialButton: React.FC<SocialButtonProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-xl flex items-center justify-center hover:scale-110 transition"
    >
      {children}
    </a>
  );
};