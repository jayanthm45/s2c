import { KundliMatchingForm } from '@/components/tools/kundli-matching-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';

export default function KundliMatchingPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-4xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <HeartHandshake className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Kundli Matching (Matchmaking)</CardTitle>
            <CardDescription>
              Check marriage compatibility based on Vedic Astrology's Ashtakoota Milan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KundliMatchingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
