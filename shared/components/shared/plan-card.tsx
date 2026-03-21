'use client';

import React from 'react'
import { Button } from '@/shared/components/ui';
import { useCartStore } from '@/shared/store/cart-store';
import { Spinner } from './spinner';

interface PlanCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  highlighted?: boolean;
  features: { text: string }[];
}

export const PlanCard: React.FC<PlanCardProps> = ({ id, title, price, oldPrice, features}) => {
  const { addCartItem, items } = useCartStore();
  
  const [loading, setLoading] = React.useState(false)

  const isInCart = items.some(item => item.planId === id);

  const onAddToCart = async () => {
    if (isInCart) return
    try {
      setLoading(true)
      await addCartItem({ planId: id })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="border rounded-2xl p-4 sm:p-6 bg-white flex flex-col h-full">
      <h3 className="text-lg sm:text-xl font-bold mb-1">{title}</h3>

      <div className="mb-4">
        <span className="text-2xl sm:text-3xl font-bold">{price}₽</span>
        <span className="text-gray-400 ml-1 text-sm">/ мес</span>
        {oldPrice && (
          <div className="line-through text-sm text-gray-400">
            {oldPrice}₽
          </div>
        )}
      </div>

      <ul className="space-y-2 mb-6 text-sm sm:text-base">
        {features.map((f, i) => (
          <li key={i}>• {f.text}</li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          onClick={onAddToCart}
          disabled={isInCart}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading && <Spinner />}
          {isInCart ? 'Выбран' : loading ? 'Добавляем…' : 'Выбрать'}
        </Button>
      </div>
    </div>
  );
};