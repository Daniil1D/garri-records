"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { Title } from "../title";

export const HeroSection: React.FC = () => {
  return (
    <section className="mt-6 md:mt-10">

      <div className="bg-gradient-to-r from-[#00063a] via-[#0319dd] to-[#01109a] rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">

        <Title
          text="Цифровой дистрибьютор музыки"
          size="4xl"
          className="max-w-[500px] font-black text-white sm:text-[80px]"
        />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mt-8">

          <p className="max-w-[720px] text-white text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Загружайте свои релизы и распространяйте музыку на Spotify, Apple
            Music, YouTube Music и десятки других платформ. Контролируйте доходы,
            аналитику и выплаты в одном месте.
          </p>

          <Link href="/login" className="w-full sm:w-auto">
            <Button
              className="
              w-full
              sm:w-[260px]
              lg:w-[320px]
              h-[56px]
              md:h-[72px]
              lg:h-[80px]
              rounded-3xl
              border-2
              border-white
              bg-transparent
              text-base
              md:text-lg
              lg:text-xl
              hover:bg-white
              hover:text-black
              transition
            "
            >
              Выпустить релиз
            </Button>
          </Link>

        </div>
      </div>

    </section>
  );
};