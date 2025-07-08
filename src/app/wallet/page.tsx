'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

function WalletContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');
  const [amount, setAmount] = React.useState(
    amountParam ? Number(amountParam) : 100
  );
  const [isOfferVisible, setIsOfferVisible] = React.useState(true);

  const gst = amount * 0.18;
  const payableAmount = amount + gst;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure value is non-negative and handle empty input
    const newAmount = value ? Math.max(0, Number(value)) : 0;
    setAmount(newAmount);
  };

  return (
    <div className="bg-background lg:bg-muted/30 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto max-w-5xl lg:py-8">
        <div className="lg:hidden">
          <div className="flex items-center gap-4 p-4 bg-background border-b sticky top-0 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ArrowLeft />
            </Button>
            <h1 className="text-lg font-bold">Payment Information</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 p-4 lg:p-0">
          <div className="lg:col-span-2">
            <Card className="shadow-none lg:shadow-md border-0 lg:border lg:rounded-xl">
              <CardHeader className="hidden lg:block">
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="p-0 lg:p-6 space-y-6">
                <div className="p-4 lg:p-6 border-b lg:border lg:rounded-xl">
                  <h3 className="font-semibold mb-4">Pay with UPI apps</h3>
                  <div className="flex justify-around items-center">
                    {[
                       {
                        name: 'PhonePe',
                        logo: '/G2.png',
                        hint: 'PhonePe logo',
                      },
                      {
                        name: 'GPay',
                        logo: '/g.jfif',
                        hint: 'GPay logo',
                      },
                      {
                        name: 'Paytm',
                        logo: '/g3.jfif',
                        hint: 'Paytm logo',
                      },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex flex-col items-center gap-2 text-center"
                      >
                        <button className="p-1 border-2 border-primary rounded-xl transition-all hover:scale-105">
                          <Image
                            src={item.logo}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="rounded-lg"
                            data-ai-hint={item.hint}
                          />
                        </button>
                        <span className="text-xs font-medium">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full flex justify-between items-center mt-4 text-sm p-3 hover:bg-muted rounded-lg">
                    <span>Pay with other UPI apps</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <Card className="shadow-none border-0 lg:border lg:rounded-xl">
                  <CardHeader className="p-4 lg:p-6">
                    <CardTitle className="text-base font-semibold">
                      Other Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
                    <RadioGroup defaultValue="upi" className="space-y-3">
                      <Label
                        htmlFor="upi"
                        className="flex items-center justify-between p-4 border rounded-lg has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src="https://placehold.co/40x40/EFEFEF/777777/png?text=UPI"
                            width={24}
                            height={24}
                            alt="UPI"
                            data-ai-hint="UPI logo"
                          />
                          <span className="font-medium">UPI</span>
                        </div>
                        <RadioGroupItem value="upi" id="upi" />
                      </Label>
                      <Label
                        htmlFor="card"
                        className="flex items-center justify-between p-4 border rounded-lg has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src="https://placehold.co/40x40/EFEFEF/777777/png?text=Card"
                            width={24}
                            height={24}
                            alt="Card"
                            data-ai-hint="credit card"
                          />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <RadioGroupItem value="card" id="card" />
                      </Label>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-none lg:shadow-md border-0 lg:border lg:rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Recharge Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Recharge Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount || ''}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className="text-base"
                  />
                </div>
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Amount</span>
                    <span>₹{amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>GST (18%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Payable Amount</span>
                  <span>₹{payableAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {isOfferVisible && (
              <div className="p-3 border-2 border-dashed border-green-500 bg-green-500/10 rounded-lg text-sm">
                <div className="flex justify-between items-center font-semibold text-green-700">
                  <span>100% extra on recharge of ₹{amount}</span>
                  <button onClick={() => setIsOfferVisible(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-black/10">
                    <X className="w-4 h-4"/>
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <p>
                    ₹{amount} Cashback in Astrotalk wallet with this recharge
                  </p>
                </div>
              </div>
            )}
            
            <div className="hidden lg:block">
              <Button className="w-full h-12 text-lg font-bold">
                  PROCEED TO PAY
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Secured by Trusted Indian Banks</span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 left-0 right-0 lg:hidden p-4 bg-background border-t">
            <Button className="w-full h-12 text-base font-bold">
              PROCEED TO PAY - ₹{payableAmount.toFixed(2)}
            </Button>
        </div>
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <WalletContent />
    </Suspense>
  );
}
