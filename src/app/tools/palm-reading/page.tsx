import { PalmReadingForm } from '@/components/tools/palm-reading-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hand } from 'lucide-react';

export default function PalmReadingPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Hand className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">AI Palm Reading</CardTitle>
            <CardDescription>
              Scan your palm to reveal the secrets hidden in your hand.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PalmReadingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
