"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/shared/components/ui";

import { Button, Input } from "@/shared/components/ui";
import { createBalanceTopUp } from "@/app/actions/index";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const TopUpDialog = ({ open, setOpen }: Props) => {
  const [amount, setAmount] = useState("");

  const onSubmit = async () => {
    try {
      const value = Number(amount);
      const url = await createBalanceTopUp(value);

      toast.success("Переходим к оплате...");
      window.location.href = url;
    } catch (e) {
      toast.error("Ошибка пополнения");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogOverlay className="fixed inset-0 bg-black/40" />

      <AlertDialogContent className="w-[92vw] sm:max-w-xl lg:max-w-2xl rounded-3xl p-5 sm:p-8 lg:p-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Пополнить
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="mt-6 sm:mt-8 space-y-2">
          <p className="font-semibold text-base sm:text-lg">
            Сумма пополнения
          </p>

          <Input
            placeholder="Введите сумму ₽"
            className="h-12 sm:h-14 text-base sm:text-lg rounded-2xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button
          className="mt-6 sm:mt-8 h-12 sm:h-14 rounded-2xl text-base sm:text-lg w-full sm:w-40"
          onClick={onSubmit}
        >
          Пополнить
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};