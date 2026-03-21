"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoginForm } from "@/shared/components/shared/modals/auth-modal/forms/login-form";
import { RegisterForm } from "@/shared/components/shared/modals/auth-modal/forms/register-form";
import { useSession } from "next-auth/react";
import { SideMenu } from "@/shared/components/shared/side-menu";

export function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(true);

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, { duration: 3000 });
      }, 1000);
    }
  }, []);

  if (session?.user) {
    return <SideMenu />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-xl 
        p-4 sm:p-6 
        border rounded-xl shadow-md bg-white"
      >
        {showLogin ? (
          <LoginForm />
        ) : (
          <div className="w-full">
            <RegisterForm onClickLogin={() => setShowLogin(true)} />
          </div>
        )}

        <div className="mt-4 text-center text-sm sm:text-base">
          {showLogin ? (
            <p>
              Нет аккаунта?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setShowLogin(false)}
              >
                Зарегистрироваться
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{" "}
              <button
                className="text-blue-500 underline"
                onClick={() => setShowLogin(true)}
              >
                Войти
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}