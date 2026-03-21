import { SideMenu } from '@/shared/components/shared';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'yourtunes-clone',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="min-h-screen flex flex-col lg:flex-row">
        
        <Suspense>
          <SideMenu />
        </Suspense>

      <div className="flex-1 flex justify-center">
        <div
          className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          {children}
        </div>
      </div>
    </main>
  );
}