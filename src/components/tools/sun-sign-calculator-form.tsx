'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { sunSignAction, type FormState } from '@/app/tools/sun-sign-calculator/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sun } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
        </>
      ) : (
        <>
          <Sun className="mr-2 h-4 w-4" /> Find My Sun Sign
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function SunSignCalculatorForm() {
  const [state, formAction] = useActionState(sunSignAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.zodiacInfo) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate">Your Date of Birth</Label>
          <Input id="birthDate" name="birthDate" type="date" required max={new Date().toISOString().split("T")[0]}/>
        </div>
        <SubmitButton />
      </form>
      {state.zodiacInfo && (
        <ReportDisplay title="Sun Sign Report" fileName="sun-sign-report">
            <Card className="mt-6 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary font-headline text-center">Your Sun Sign Is</h3>
                <div className="text-center flex flex-col items-center">
                    <p className="text-6xl font-bold">{state.zodiacInfo.symbol}</p>
                    <p className="text-4xl font-bold mt-2">{state.zodiacInfo.sign}</p>
                    <p className="text-md font-medium text-muted-foreground mt-1">{state.zodiacInfo.dateRange}</p>
                </div>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
