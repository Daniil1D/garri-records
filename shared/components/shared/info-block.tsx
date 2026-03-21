import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface Props {
  title: string;
  text: string;
  className?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text }) => {
  return (
    <div
      className={cn(
        className,
        'flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-6 lg:gap-12'
      )}
    >
      <div className="flex flex-col w-full max-w-full lg:max-w-[500px]">
        <Title size="lg" text={title} className="font-extrabold" />

        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
          {text}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-8 md:mt-11">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <ArrowLeft />
              На главную
            </Button>
          </Link>

          <a href="">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-gray-500 border-gray-400 hover:bg-gray-50"
            >
              Обновить
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};