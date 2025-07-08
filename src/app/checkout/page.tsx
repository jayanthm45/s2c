'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PaymentStatus } from '@/components/payment-status';

export default function CheckoutPage() {
  const { cart, totalAmount, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success'>('idle');

  if (itemCount === 0 && paymentState !== 'success') {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Add items to your cart to proceed to checkout.
        </p>
        <Link href="/astro-shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  const handlePayment = () => {
    setPaymentState('processing');
  };

  const handlePaymentSuccess = () => {
    setPaymentState('success');
    // In a real app, you'd save the order here
    clearCart();
    setTimeout(() => {
        router.push('/order-confirmation');
    }, 1500); // Give user a moment to see success message
  };

  const shippingCost = 0;
  const grandTotal = totalAmount + shippingCost;

  if (paymentState === 'processing' || paymentState === 'success') {
    return <PaymentStatus status={paymentState} onSuccess={handlePaymentSuccess} />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-headline">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Shipping Address */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Cosmic Lane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Starlight City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pin Code</Label>
                  <Input id="pincode" placeholder="110001" />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="p-4 border rounded-lg flex items-center justify-between bg-secondary/30">
                    <div className="flex items-center gap-3">
                         <CreditCard className="h-6 w-6 text-primary"/>
                         <span className="font-semibold">Credit/Debit Card</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Dummy Payment</span>
                </div>
                <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600"/>
                    <span>Your payment information is safe with our secure gateway.</span>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pt-3 first:pt-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg border"
                      data-ai-hint="product photo"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2">
                 <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
                 <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button onClick={handlePayment} size="lg" className="w-full mt-6">
                Pay ₹{grandTotal.toFixed(2)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
