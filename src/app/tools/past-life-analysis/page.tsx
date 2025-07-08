import { PastLifeAnalysisForm } from '@/components/tools/past-life-analysis-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hourglass } from 'lucide-react';

export default function PastLifeAnalysisPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Hourglass className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Past Life Analysis</CardTitle>
            <CardDescription>
              Enter your birth details to uncover the story of your past life and its karmic lessons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PastLifeAnalysisForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
