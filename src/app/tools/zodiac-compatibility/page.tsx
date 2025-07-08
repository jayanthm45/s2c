import { ZodiacCompatibilityForm } from '@/components/tools/zodiac-compatibility-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function ZodiacCompatibilityPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-3xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Heart className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Zodiac Compatibility</CardTitle>
            <CardDescription>
              Find out how well your zodiac signs match for love, friendship, and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ZodiacCompatibilityForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
