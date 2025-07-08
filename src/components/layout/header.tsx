'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '@/lib/icons';
import { useState } from 'react';
import { CartIcon } from '@/components/cart-icon';

const navLinks = [
 { href: '/', label: 'Dashboard' },
  { href: '/astrologers', label: 'Talk to Astrologer' },
  { href: '/live-sessions', label: 'Live Sessions' },
  { href: '/astro-shop', label: 'Astro Shop' },
  { href: '/tools', label: 'Calculators' },
];

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
 <header className="sticky top-0 z-50 pl-6 pr-6 pt-1 pb-1 md:pt-2 md:pb-2 w-full border-b bg-[#042338] text-white backdrop-blur supports-[backdrop-filter]:bg-[#042338]">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
  <img
    src="https://seabed2crest.com/wp-content/uploads/2025/01/screenshot.png"
    alt="Seabed2Crest Astrotalk Logo"
    className="h-8 w-8 object-contain"
  />
  <span className="hidden font-bold sm:inline-block font-headline text-white">
    Seabed2Crest Astrotalk
  </span>
</Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-[white]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
           <Button variant="ghost" size="icon">
  <Menu style={{ width: "24px", height: "24px" }} className="text-2xl" />
  <span className="sr-only">Open Menu</span>
</Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setSheetOpen(false)}>
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Seabed2Crest Astrotalk</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'transition-colors hover:text-primary',
                         pathname.startsWith(link.href) && link.href !== '/' || pathname === link.href
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Link
                      href='/wallet'
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'transition-colors hover:text-primary',
                         pathname.startsWith('/wallet')
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      Wallet
                    </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add search here later */}
          </div>
          <nav className="flex items-center gap-2">
            <CartIcon />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
