import { FaceReadingForm } from '@/components/tools/face-reading-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile } from 'lucide-react';

export default function FaceReadingPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Smile className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">AI Face Reading</CardTitle>
            <CardDescription>
              Upload or take a photo to get an instant personality analysis based on physiognomy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FaceReadingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
