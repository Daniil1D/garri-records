import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'garri-records',
};

export default function HomeLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        {children}
      </div>
    </main>
  );
}