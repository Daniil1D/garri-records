'use client';

import React from 'react';
import { createOrder } from '@/app/actions/index';
import { Button } from '@/shared/components/ui';
import { Loader2, CreditCard } from 'lucide-react';

export const CheckoutButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const onCheckout = async () => {
    try {
      setLoading(true);
      const paymentUrl = await createOrder();
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (err) {
      console.error('Ошибка оплаты', err);
      alert('Не удалось создать оплату');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onCheckout}
      disabled={loading}
      className="
        flex items-center justify-center gap-2
        w-full sm:w-auto
        bg-black text-white
        hover:bg-neutral-800
        transition-all
        px-4 sm:px-6 py-3
        rounded-xl
        text-sm sm:text-base font-semibold
      "
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Переход к оплате…
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4" />
          Оплатить по карте
        </>
      )}
    </Button>
  );
};
