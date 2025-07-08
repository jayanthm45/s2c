'use client';

import { products } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  Package,
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';

export default function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = products.find((p) => p.id === params.productId);
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div>
          <Card className="overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full"
              data-ai-hint="product photo"
            />
          </Card>
          {/* Add thumbnails here if multiple images */}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              ({product.reviews} reviews)
            </span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through ml-3">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <div className="mt-6">
            <Button size="lg" className="w-full" onClick={() => addToCart(product)}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
          <Card className="mt-6 p-4 bg-secondary/30">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span>7 Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                <span>Secure Packaging</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* More Details Tabs */}
      <div className="mt-12">
        <Card>
            <CardContent className="p-6">
                 <h2 className="text-xl font-bold mb-4 font-headline">Product Details</h2>
                 <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-primary mb-2">Benefits</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            {product.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-primary mb-2">How to Wear/Use</h3>
                        <p className="text-muted-foreground">{product.howToWear}</p>
                    </div>
                 </div>
            </CardContent>
        </Card>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
         <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 font-headline">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(related => (
                    <Link href={`/astro-shop/${related.id}`} key={related.id}>
                        <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                            <Image
                                src={related.images[0]}
                                alt={related.name}
                                width={300}
                                height={300}
                                className="object-cover w-full h-40 group-hover:scale-105 transition-transform"
                                data-ai-hint="product photo"
                            />
                            <CardContent className="p-3">
                                <h3 className="font-semibold text-sm line-clamp-2">{related.name}</h3>
                                <p className="font-bold mt-1">₹{related.price}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
         </div>
      )}
    </div>
  );
}
