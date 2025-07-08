import { DailyHoroscopeForm } from '@/components/tools/daily-horoscope-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function DailyHoroscopeToolPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Sparkles className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Your Daily Horoscope</CardTitle>
            <CardDescription>
              Enter your birth details for a personalized daily reading.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DailyHoroscopeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
