import { Container, Title } from "@/shared/components/shared";
import { BalanceActions } from "./_components/balance-actions";
import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export const dynamic = "force-dynamic";

export default async function BalancePage() {
  const session = await getUserSession();
  if (!session) return null; 

  const user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  const balance = user?.balance ?? 0;

  const transactions = await prisma.transaction.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <Container className="my-6 sm:my-8 lg:my-10">
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        <Title text="Баланс" size="xl" />

        <div className="rounded-3xl bg-white p-4 sm:p-6 lg:p-8 shadow-sm space-y-4 sm:space-y-6">
          <p className="text-gray-500 text-sm">Текущий баланс:</p>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold break-all">
            {balance.toFixed(2)} ₽
          </h2>

          <BalanceActions />
        </div>

        <div className="rounded-3xl bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
            Транзакции
          </h2>

          {transactions.length === 0 ? (
            <div className="h-[150px] sm:h-[200px] flex items-center justify-center text-gray-500 text-sm sm:text-base">
              Транзакций пока нет
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 max-h-[420px] overflow-y-auto pr-1 sm:pr-2">
              {transactions.map((t) => {
                const isWithdraw = t.type === "WITHDRAW";

                return (
                  <div
                    key={t.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-2xl p-3 sm:p-4 hover:bg-gray-50 transition gap-3"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-lg sm:text-xl font-bold ${
                          isWithdraw
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {isWithdraw ? "↓" : "↑"}
                      </div>

                      <div>
                        <p className="font-medium text-sm sm:text-lg">
                          {isWithdraw ? "Вывод средств" : "Пополнение баланса"}
                        </p>

                        <p className="text-xs sm:text-sm text-gray-400">
                          {new Date(t.createdAt).toLocaleString("ru-RU")}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-base sm:text-xl font-bold ${
                        isWithdraw ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {isWithdraw ? "-" : "+"}
                      {t.amount.toFixed(2)} ₽
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}