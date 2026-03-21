"use client";

import { Container } from "@/shared/components/shared";
import { getUserSession } from "@/shared/lib/get-user-session";
import { getUserSubscriptions } from "@/shared/lib/get-user-subscriptions";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export async function SubscriptionsSection() {
  const session = await getUserSession();
  if (!session) redirect("/not-auth");

  const user = await prisma.user.findFirst({
    where: { id: String(session.id) },
  });
  if (!user) redirect("/not-auth");

  const subscriptions = await getUserSubscriptions(user.id);

  return (
    <Container className="px-3 sm:px-4 md:px-6">
      <div
        className="bg-white border rounded-2xl p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          Мои тарифы
        </h2>

        {!subscriptions.length && (
          <p className="text-gray-500 text-sm sm:text-base">
            Активных тарифов нет
          </p>
        )}

        <div className="space-y-3">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-rowsm:justify-between sm:items-center gap-2 sm:gap-0">
              <div>
                <p className="font-bold text-sm sm:text-base md:text-lg">
                  {sub.plan.title}
                </p>

                {sub.expiresAt && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    Активен до{" "}
                    <b>
                      {new Date(sub.expiresAt).toLocaleDateString()}
                    </b>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}