'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { nakshatraAction, type FormState } from '@/app/tools/nakshatra-finder/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Star } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding...
        </>
      ) : (
        <>
          <Star className="mr-2 h-4 w-4" /> Find My Nakshatra
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function NakshatraFinderForm() {
  const [state, formAction] = useActionState(nakshatraAction, initialState);
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
        <ReportDisplay title="Nakshatra (Birth Star) Report" fileName="nakshatra-report">
            <Card className="mt-6 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-primary font-headline">Your Birth Star</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                    <p className="text-4xl font-bold">{state.result.nakshatra}</p>
                    <p className="text-lg font-medium text-muted-foreground mt-1">Pada: {state.result.pada}</p>
                </div>
                <div>
                    <p className="text-muted-foreground whitespace-pre-wrap">{state.result.description}</p>
                </div>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
