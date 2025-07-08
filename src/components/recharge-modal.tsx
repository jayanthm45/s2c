'use client';

import type { Astrologer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { X, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: Astrologer;
}

const rechargeOptions = [
  { amount: 50, extra: '100% Extra' },
  { amount: 100, extra: '100% Extra' },
  { amount: 200, extra: '50% Extra' },
  { amount: 500, extra: '50% Extra' },
  { amount: 1000, extra: '5% Extra' },
  { amount: 2000, extra: '10% Extra' },
  { amount: 3000, extra: '10% Extra' },
  { amount: 4000, extra: '12% Extra' },
];

export function RechargeModal({ isOpen, onClose, astrologer }: RechargeModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const router = useRouter();

  const minimumBalance = (5 * astrologer.price).toFixed(2);
  
  const handleProceedToPay = () => {
    onClose();
    router.push(`/wallet?amount=${selectedAmount}`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card">
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-start">
                <p className="font-semibold text-red-600 dark:text-red-500 text-sm leading-tight pr-4">
                    Minimum balance of 5 minutes (₹ {minimumBalance}) is required to continue chat with {astrologer.name}.
                </p>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-muted -mt-2 -mr-2">
                    <span className="sr-only">Close</span>
                </button>
            </div>

            <h3 className="font-bold text-lg text-card-foreground">Recharge Now</h3>
            <div className="flex items-center gap-2 bg-primary/10 text-primary text-xs p-2 rounded-md">
                <Lightbulb className="h-4 w-4 shrink-0"/>
                <p>Tip: 90% of users recharge for 10 mins or more.</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {rechargeOptions.map((option) => (
                    <div key={option.amount} className="relative">
                        <button 
                            onClick={() => setSelectedAmount(option.amount)}
                            className={cn(
                                "w-full border rounded-lg p-3 text-center transition-colors h-full flex items-center justify-center font-semibold text-card-foreground",
                                selectedAmount === option.amount 
                                    ? 'border-primary bg-primary/20'
                                    : 'border-border bg-card hover:border-primary/50'
                            )}
                        >
                           ₹{option.amount}
                        </button>
                         <div className="absolute top-0 left-0 text-[10px] bg-primary text-primary-foreground px-1 py-0.5 rounded-tl-lg rounded-br-lg">
                            {option.extra}
                        </div>
                    </div>
                ))}
            </div>
             <Button onClick={handleProceedToPay} className="w-full h-11 text-lg font-bold">
                Proceed to Pay
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
