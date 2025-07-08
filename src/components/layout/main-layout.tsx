'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith('/chat');

  if (isChatPage) {
    // For the chat page, we want a full-screen layout with no header or footer
    return <main className="h-screen">{children}</main>;
  }

  // For all other pages, render the standard layout
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
