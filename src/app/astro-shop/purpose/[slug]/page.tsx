
'use client';

import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

const purposeDisplayNames: Record<string, string> = {
    money: 'Money Magnet',
    healing: 'Healing',
    love: 'Love & Relationship',
    protection: 'Protection',
};

export default function PurposePage({ params }: { params: { slug: string } }) {
  const purposeName = purposeDisplayNames[params.slug];

  if (!purposeName) {
      notFound();
  }

  const filteredProducts = products.filter(
    (product) => product.purpose?.some(p => p.toLowerCase() === params.slug)
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center mb-6">
          <Link href="/astro-shop">
              <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft />
              </Button>
          </Link>
          <h1 className="text-3xl font-bold font-headline">Shop by Purpose: {purposeName}</h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No products found for the purpose "{purposeName}".</p>
            <Link href="/astro-shop" className="mt-4 inline-block">
                <Button>Back to Shop</Button>
            </Link>
        </div>
      )}
    </div>
  );
}
