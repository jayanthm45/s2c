'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { mangalDoshaAction, type FormState } from '@/app/tools/mangal-dosha-calculator/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Swords, ShieldCheck, ShieldAlert, ListOrdered } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <Swords className="mr-2 h-4 w-4" /> Check for Mangal Dosha
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function MangalDoshaCalculatorForm() {
  const [state, formAction] = useActionState(mangalDoshaAction, initialState);
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
      {state.result && (
        <ReportDisplay title="Mangal Dosha Report" fileName="mangal-dosha-report">
            <Card className="mt-6 bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-center text-primary font-headline">Your Mangal Dosha Report</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className={`p-4 rounded-lg text-center ${state.result.hasDosha ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                    <div className={`flex items-center justify-center gap-2 font-bold ${state.result.hasDosha ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
                        {state.result.hasDosha ? <ShieldAlert className="h-6 w-6"/> : <ShieldCheck className="h-6 w-6" />}
                        <span className="text-lg">
                            {state.result.hasDosha ? 'Mangal Dosha is Present' : 'No Mangal Dosha Found'}
                        </span>
                    </div>
                </div>

                <div className="p-4 bg-card rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Analysis</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{state.result.description}</p>
                </div>
                
                {state.result.hasDosha && state.result.remedies.length > 0 && (
                     <div className="p-4 bg-card rounded-lg">
                        <h4 className="font-semibold text-primary mb-2 flex items-center gap-2"><ListOrdered/> Suggested Remedies</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {state.result.remedies.map((remedy, index) => (
                                <li key={index}>{remedy}</li>
                            ))}
                        </ul>
                    </div>
                )}
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
