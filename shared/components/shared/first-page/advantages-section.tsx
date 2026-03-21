"use client";

import React from "react";
import { Title } from "../title";
import {
  Youtube,
  Music,
  Zap,
  Brain,
  Repeat,
  Gamepad2,
  Megaphone,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    title: "100%",
    text: "дохода в пользу артиста",
    color: "text-green-500",
  },
  {
    title: "100%",
    text: "авторских прав за артистом",
    color: "text-yellow-400",
  },
];

const card = [
  {
    title: "YouTube Content ID",
    text: "Получай доход от использования твоей музыки в видео, которые монетизируются в YouTube",
    icon: Youtube,
  },
  {
    title: "UGC платформы",
    text: "Получай доход от использования твоей музыки в коротких видео опубликованных в социальных сетях.",
    icon: Music,
  },
  {
    title: "Питчинг релизов",
    text: "Продвигай свою музыку через официальный плейлисты стриминговых площадок.",
    icon: TrendingUp,
  },
  {
    title: "Быстрая публикация",
    text: "Выпусти свой релиз на все площадки всего за 24 часа.",
    icon: Zap,
  },
  {
    title: "Публикация AI-контента",
    text: "Публикуй музыку сгенерированную ИИ на стриминговые площадки.",
    icon: Brain,
  },
  {
    title: "Re-delivery",
    text: "Перенесем твои релизы с другого дистрибьютора за пару кликов.",
    icon: Repeat,
  },
  {
    title: "YT Play",
    text: "Наш мини-апп в Telegram: стриминг с вовлечённой аудиторией.",
    icon: Gamepad2,
  },
  {
    title: "Промо поддержка релиза",
    text: "Расширяем охваты и узнаваемость твоей музыки.",
    icon: Megaphone,
  },
];

export const AdvantagesSection: React.FC = () => {
  return (
    <section className="bg-[#211f1f] rounded-3xl mt-10 py-10 md:py-16 p-5">

      <Title
        text="С нами артист всегда в выигрыше"
        size="4xl"
        className="max-w-[700px] font-black text-white leading-tight"
      />

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-16">

        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-8">

            <p className={`${step.color} text-[70px] md:text-[100px] lg:text-[100px] font-extrabold`}>
              {step.title}
            </p>

            <p className="text-white text-lg md:text-xl lg:text-2xl max-w-[220px]">
              {step.text}
            </p>

          </div>
        ))}

      </div>

      <div className="h-[2px] w-full bg-white mt-16" />

      <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mt-12">
        Больше возможностей
      </h2>

      <p className="text-white text-lg md:text-xl lg:text-2xl max-w-[520px] mt-6">
        Публикуй свою музыку прямо сейчас. Аккаунт активируется сразу после
        завершения регистрации.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

        {card.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group bg-white rounded-3xl min-h-[260px] p-6 transition hover:bg-[#181717]"
            >
              <Icon
                size={40}
                className="text-black group-hover:text-white transition"
              />

              <p className="text-xl font-extrabold mt-6 text-black group-hover:text-white">
                {item.title}
              </p>

              <p className="text-sm mt-4 font-semibold text-gray-700 group-hover:text-gray-300">
                {item.text}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
};