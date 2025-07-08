"use client";
import { MoonSignCalculatorForm } from '@/components/tools/moon-sign-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Cake, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MoonSignCalculatorPage() {
   const router = useRouter();
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center relative">
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
                <Moon className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Moon Sign Calculator</CardTitle>
            <CardDescription>
              Find your Rashi (Moon Sign) based on your birth details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MoonSignCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
