'use client';

import { useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentStatusProps {
  status: 'processing' | 'success';
  onSuccess: () => void;
}

export function PaymentStatus({ status, onSuccess }: PaymentStatusProps) {
  useEffect(() => {
    if (status === 'processing') {
      const timer = setTimeout(() => {
        onSuccess();
      }, 2500); // Simulate processing time
      return () => clearTimeout(timer);
    }
  }, [status, onSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {status === 'processing' && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
            <p className="text-lg font-semibold text-muted-foreground">
              Processing Payment...
            </p>
          </div>
        )}
        {status === 'success' && (
          <div className="flex flex-col items-center gap-4 animate-scaleIn">
            <CheckCircle2 className="w-24 h-24 text-green-500" />
            <p className="text-lg font-semibold text-green-500">
              Payment Successful!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
