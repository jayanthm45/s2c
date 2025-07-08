
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import {
  Gem,
  Heart,
  Shield,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const categories = [
  { name: 'Bracelets', icon: Gem, href: '/astro-shop/category/bracelets' },
  { name: 'Rudraksha', icon: Sparkles, href: '/astro-shop/category/rudraksha' },
  { name: 'Yantras', icon: Shield, href: '/astro-shop/category/yantras' },
  { name: 'Gemstones', icon: Gem, href: '/astro-shop/category/gemstones' },
  { name: 'Pendants', icon: Heart, href: '/astro-shop/category/pendants' },
  { name: 'Dome Trees', icon: Sparkles, href: '/astro-shop/category/dome-trees' },
];

const purposes = [
    { name: 'Money Magnet', href: '/astro-shop/purpose/money', icon: Sparkles },
    { name: 'Healing', href: '/astro-shop/purpose/healing', icon: Heart },
    { name: 'Love & Relationship', href: '/astro-shop/purpose/love', icon: Heart },
    { name: 'Protection', href: '/astro-shop/purpose/protection', icon: ShieldCheck },
];

export default function AstroShopPage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="bg-muted/20">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Hero Section */}
        <section className="mb-12">
          <Card className="relative overflow-hidden group border-none shadow-lg">
            <Image
              src="/mc.jpg"
              alt="Siddh From Kashi"
              width={1200}
              height={400}
              className="object-cover w-full h-[250px] md:h-[400px] transition-transform duration-300"
              data-ai-hint="spiritual products"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 font-headline">
                Siddh From Kashi
              </h1>
              <p className="mb-4 max-w-lg">
                with 11,000 Mahamrityunjay Jaap. Energized items for spiritual growth and well-being.
              </p>
              <Button size="lg">Shop Now</Button>
            </div>
          </Card>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-headline">
            Shop by Category
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link href={category.href} key={category.name}>
                <Card className="text-center hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col justify-center items-center p-4 aspect-square">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-semibold">{category.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Shop by Purpose Section */}
        <section className="mb-12">
           <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-headline">
            Shop by Purpose
          </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {purposes.map((purpose) => (
                    <Link href={purpose.href} key={purpose.name} className="block">
                        <Card className="flex items-center gap-4 p-4 hover:shadow-xl hover:border-primary transition-all duration-300">
                           <div className="p-2 bg-primary/10 rounded-full">
                                <purpose.icon className="w-6 h-6 text-primary"/>
                           </div>
                           <p className="font-semibold">{purpose.name}</p>
                        </Card>
                    </Link>
                ))}
           </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Featured Products
            </h2>
            <Button variant="ghost">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
