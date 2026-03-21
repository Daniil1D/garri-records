import React from "react";
import { Title } from "../title";

interface Feature {
  title: string;
  text: string;
  size?: "normal" | "large";
  layout: "left" | "right" | "bottom";
}

const features: Feature[] = [
  {
    title: "Статистика прослушиваний",
    text: "Получай ежедневную статистику прослушиваний на стриминговых площадках. Следи за ростом аудитории и оценивай результаты промо-кампаний.",
    layout: "left",
  },
  {
    title: "Финансовая аналитика",
    text: "Данный инструмент позволяет наглядно понять с каких стран и платформ формируется твой доход.",
    layout: "left",
  },
  {
    title: "Выплаты",
    text: "Выводи заработанные деньги на свою банковскую карту без сторонних сервисов и платежных систем.",
    size: "large",
    layout: "right",
  },
  {
    title: "Более 50 площадок во всем мире",
    text: "Выбирай цифровые площадки, где ты хочешь опубликовать свою музыку.",
    layout: "bottom",
  },
  {
    title: "Контролируй публикацию",
    text: "Управляй своим каталогом и следи за ходом публикации релизов.",
    layout: "bottom",
  },
];

export const FeaturesSection: React.FC = () => {
  const leftFeatures = features.filter(f => f.layout === "left");
  const rightFeature = features.find(f => f.layout === "right");
  const bottomFeatures = features.filter(f => f.layout === "bottom");

  return (
    <section className="bg-white rounded-3xl mt-6 px-4 md:px-6 pt-6">
      <div className="max-w-7xl mx-auto">
        <Title
          text="Удобство и прозрачность"
          size="4xl"
          className="font-black mb-5"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          
          <div className="lg:col-span-2 flex flex-col gap-5">
            {leftFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          {rightFeature && (
            <div className="lg:col-span-1">
              <FeatureCard {...rightFeature} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
          {bottomFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  text: string;
  size?: "normal" | "large";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  text,
  size = "normal",
}) => {
  return (
    <div
      className={`bg-[#211f1f] rounded-3xl p-10 text-white flex flex-col justify-between ${
        size === "large" ? "h-full min-h-[420px]" : "min-h-[300px]"
      }`}
    >
      <div className="max-w-sm">
        <Title
          text={title}
          size="2xl"
          className="font-bold leading-tight mb-4 text-white"
        />
        <p className="text-white/80">{text}</p>
      </div>
    </div>
  );
};