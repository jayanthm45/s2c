'use client';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { CheckCircle, Gift, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function AddToCartModal({ isOpen, onClose, product }: AddToCartModalProps) {
  const router = useRouter();
  
  if (!product) return null;

  const handleViewCart = () => {
    onClose();
    router.push('/cart');
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Successfully Added to Cart</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-lg border"
              data-ai-hint="product photo"
            />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-muted-foreground">1 x ₹{product.price}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm p-3 rounded-lg">
            <Gift className="h-5 w-5 shrink-0" />
            <p>Congratulations! You get a FREE surprise gift with this order.</p>
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">
            ✓ 7 Day Return/Exchange Policy
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </DialogClose>
          <Button onClick={handleViewCart}>
            View Cart <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
