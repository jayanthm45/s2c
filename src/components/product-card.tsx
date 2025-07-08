'use client';

import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <Link href={`/astro-shop/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
            data-ai-hint="product photo"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/astro-shop/${product.id}`} className="block">
            <h3 className="font-semibold text-base line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 text-sm mt-1 text-muted-foreground">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-2">
            <span className="text-lg font-bold">₹{product.price}</span>
            {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                ₹{product.originalPrice}
                </span>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-2">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
