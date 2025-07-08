'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { ageCalculatorAction, type FormState } from '@/app/tools/age-calculator/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calculator } from 'lucide-react';
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
          <Calculator className="mr-2 h-4 w-4" /> Calculate Age
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function AgeCalculatorForm() {
  const [state, formAction] = useActionState(ageCalculatorAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.age) {
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
      {state.age && (
        <ReportDisplay title="Age Calculation Report" fileName="age-report">
            <Card className="mt-6 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary font-headline text-center">Your Age Is</h3>
                <div className="text-center">
                    <p className="text-4xl font-bold">{state.age.years} <span className="text-2xl font-medium text-muted-foreground">Years</span></p>
                    <p className="text-2xl font-bold">{state.age.months} <span className="text-xl font-medium text-muted-foreground">Months</span></p>
                    <p className="text-2xl font-bold">{state.age.days} <span className="text-xl font-medium text-muted-foreground">Days</span></p>
                </div>
                {state.nextBirthday && (
                    <div className="mt-4 pt-4 border-t text-center">
                        <h4 className="font-semibold text-primary">Your Next Birthday</h4>
                        <p className="text-muted-foreground">{state.nextBirthday.daysUntil} days to go!</p>
                    </div>
                )}
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
