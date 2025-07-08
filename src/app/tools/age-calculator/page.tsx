'use client';

import { useRouter } from 'next/navigation';
import { AgeCalculatorForm } from '@/components/tools/age-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cake, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AgeCalculatorPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center relative">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="absolute top-4 left-0 flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>

      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Cake className="w-12 h-12 text-primary" />
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Age Calculator</CardTitle>
            <CardDescription>
              Enter your date of birth to find out your exact age.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgeCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
