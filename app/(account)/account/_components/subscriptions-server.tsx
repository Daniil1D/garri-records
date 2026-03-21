import { Container } from "@/shared/components/shared"
import { getUserSession } from "@/shared/lib/get-user-session"
import { getUserSubscriptions } from "@/shared/lib/get-user-subscriptions"
import { redirect } from "next/navigation"

export async function SubscriptionsServer() {
  const session = await getUserSession()
  if (!session) redirect("/not-auth")

  const subscriptions = await getUserSubscriptions(String(session.id))

  return (
    <Container>
      <div className="bg-white border rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          Мои тарифы
        </h2>

        {!subscriptions.length && (
          <p className="text-gray-500 text-sm sm:text-base">
            Активных тарифов нет
          </p>
        )}

        <div className="space-y-3">
          {subscriptions.map(sub => (
            <div
              key={sub.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <div>
                <p className="font-bold text-sm sm:text-base">
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
  )
}