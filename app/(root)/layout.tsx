import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'yourtunes-clone',
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{ 
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        {children}
      </div>
      {modal}
    </main>
  );
}