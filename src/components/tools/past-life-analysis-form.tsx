'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { pastLifeAnalysisAction, type FormState } from '@/app/tools/past-life-analysis/actions';
import type { PastLifeAnalysisOutput } from '@/ai/flows/past-life-analysis-flow';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Hourglass } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Past Life...
        </>
      ) : (
        <>
          <Hourglass className="mr-2 h-4 w-4" /> Reveal My Past Life
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

function ResultDisplay({ result }: { result: PastLifeAnalysisOutput }) {
    return (
        <ReportDisplay title="Past Life Analysis" fileName="past-life-analysis-report">
            <div className="space-y-6">
                <Card className="bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-center text-primary font-headline">Your Previous Incarnation</CardTitle>
                        <CardDescription className="text-center">
                            In the {result.era} in {result.location}, you were a {result.profession}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.story}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Karmic Lesson</CardTitle>
                        <CardDescription>This is the primary lesson your soul is working to resolve in this lifetime.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.karmicLesson}</p>
                    </CardContent>
                </Card>
            </div>
        </ReportDisplay>
    )
}

export function PastLifeAnalysisForm() {
  const [state, formAction] = useActionState(pastLifeAnalysisAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.result) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div>
      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input id="birthDate" name="birthDate" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthTime">Birth Time</Label>
          <Input id="birthTime" name="birthTime" type="time" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthLocation">Birth Location</Label>
          <Input
            id="birthLocation"
            name="birthLocation"
            type="text"
            placeholder="e.g., New Delhi, India"
            required
          />
        </div>
        <SubmitButton />
      </form>
      {state.result && <ResultDisplay result={state.result} />}
    </div>
  );
}
