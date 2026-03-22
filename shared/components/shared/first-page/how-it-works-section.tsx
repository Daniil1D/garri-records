"use client";

import React from "react";
import { Title } from "../title";

const steps = [
  {
    title: "Загружай свою музыку",
    text: "Загружай свою музыку в личном кабинете и выбирай дату релиза.",
  },
  {
    title: "Модерация",
    text: "Минимальный срок публикации релиза — 24 часа. Убедись, что контент не нарушает авторских прав.",
  },
  {
    title: "День релиза",
    text: "В день выхода релиза ты получишь универсальную ссылку на все площадки.",
  },
  {
    title: "Статистика прослушиваний",
    text: "Следи за статистикой прослушиваний. Данные от 15 площадок обновляются ежедневно.",
  },
  {
    title: "Получай прибыль",
    text: "Получай выплаты от стриминговых площадок каждый месяц на банковскую карту.",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="mt-16 md:mt-24">

      <Title
        text="Схема работы сервиса"
        size="4xl"
        className="font-black mb-10"
      />

      <div className="flex flex-col gap-8">

        {steps.map((step, index) => (
          <div
            key={index}
            className=" sticky top-20 bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <div className="flex items-center justify-between gap-4">

              <Title text={step.title} size="2xl" className="font-black" />

              <div className="bg-black text-white h-[56px] w-[56px] md:h-[64px] md:w-[64px] flex items-center justify-center rounded-full font-black text-xl md:text-2xl">
                {index + 1}
              </div>

            </div>

            <p className="font-semibold mt-6 text-base md:text-lg lg:text-xl max-w-[720px]">
              {step.text}
            </p>

            <div className="bg-black h-[200px] md:h-[260px] lg:h-[320px] mt-8 rounded-2xl" />

          </div>
        ))}

      </div>

    </section>
  );
};