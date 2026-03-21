'use client';

import { Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { useRouter } from "next/navigation";

interface Props {
  hasSubscription: boolean;
}

export function StaticsClient({ hasSubscription }: Props) {
  const router = useRouter();

  if (!hasSubscription) {
    return (
      <div className="space-y-6 sm:space-y-10 text-center sm:text-left">
        <Title
          text="Оплатите подписку, чтобы раздел со статистикой был доступен"
          size="2xl"
          className="font-bold text-lg sm:text-xl md:text-2xl"
        />

        <Button
          className="w-full sm:w-auto"
          onClick={() => router.push('/account')}
        >
          Оплатить
        </Button>
      </div>
    );
  }

  return (
    <Title
      text="Теперь страница доступна"
      size="2xl"
      className="font-bold text-lg sm:text-xl md:text-2xl"
    />
  );
}