import Link from 'next/link';
import { Logo } from '@/lib/icons';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#042338] text-[white]">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
    src="https://seabed2crest.com/wp-content/uploads/2025/01/screenshot.png"
    alt="Seabed2Crest Astrotalk Logo"
    className="h-8 w-8 object-contain"
  />
              <span className="font-bold text-xl font-headline">
                Seabed2Crest Astrotalk
              </span>
            </Link>
            <p className="text-sm text-footer-foreground/80">
              Your trusted guide to the cosmos. Find clarity and direction with
              our expert astrologers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
             <ul className="space-y-2 text-sm">
              <li><Link href="/astrologers" className="text-footer-foreground/80 hover:text-primary transition-colors">Talk to an Astrologer</Link></li>
              <li><Link href="/horoscope" className="text-footer-foreground/80 hover:text-primary transition-colors">Daily Horoscope</Link></li>
              <li><Link href="/astro-shop" className="text-footer-foreground/80 hover:text-primary transition-colors">Astro Shop</Link></li>
              <li><Link href="/tools" className="text-footer-foreground/80 hover:text-primary transition-colors">Astrology Tools</Link></li>
              <li><Link href="/wallet" className="text-footer-foreground/80 hover:text-primary transition-colors">Wallet</Link></li>
              <li><Link href="/referral" className="text-footer-foreground/80 hover:text-primary transition-colors">Refer a Friend</Link></li>
              <li><Link href="/karma-points" className="text-footer-foreground/80 hover:text-primary transition-colors">Karma Points</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider ">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors"><Facebook  className="h-6 w-6" /></Link>
              <Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></Link>
              <Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></Link>
              <Link href="#" className="text-footer-foreground/80 hover:text-primary transition-colors"><Youtube className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-footer-foreground/20 pt-6 text-center text-sm text-footer-foreground/60">
          <p>&copy; {new Date().getFullYear()} Seabed2Crest Astrotalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
