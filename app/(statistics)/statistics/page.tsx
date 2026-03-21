import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { Container, Title } from "@/shared/components/shared";
import { StaticsClient } from "./_components/statics-client";

export default async function StatisticsPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <Container className="mt-10 px-4 sm:px-6">
        <Title text="Вы не авторизованы" size="2xl" className="font-bold" />
      </Container>
    );
  }

  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  });

  const hasSubscription = Boolean(activeSubscription);

  return (
    <Container className="space-y-8 sm:space-y-10 mt-8 sm:mt-10 px-4 sm:px-6">
      <StaticsClient hasSubscription={hasSubscription} />
    </Container>
  );
}