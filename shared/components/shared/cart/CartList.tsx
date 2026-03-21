'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/shared/store/cart-store';
import { CartCard } from './CartCard';
import { Container } from '../container';
import { CheckoutButton } from '../checkout-button';

export const CartList: React.FC = () => {
  const { items, totalAmount, fetchCartItems, removeCartItem } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  if (!items.length)
    return (
      <Container className="my-6 sm:my-10">
        <p className="text-center text-gray-500">Корзина пуста</p>
      </Container>
    );

  return (
    <Container className="my-6 sm:my-10">
      <div className="border rounded-2xl bg-white p-4 sm:p-6 space-y-4">
        <h3 className="font-bold text-base sm:text-lg">Корзина</h3>

        <div className="space-y-3">
          {items.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onRemove={removeCartItem}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4 mt-4">
          <span className="text-base sm:text-lg font-bold">
            Итого: {totalAmount} ₽
          </span>
          <CheckoutButton />
        </div>
      </div>
    </Container>
  );
};