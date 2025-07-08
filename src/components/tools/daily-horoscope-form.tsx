'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getHoroscopeAction, type FormState } from '@/app/tools/daily-horoscope/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Get My Horoscope
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function DailyHoroscopeForm() {
  const [state, formAction] = useActionState(getHoroscopeAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.horoscope) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
    if (state.horoscope) {
      formRef.current?.reset();
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
            placeholder="e.g., New York, USA"
            required
          />
        </div>
        <SubmitButton />
      </form>
      {state.horoscope && (
        <ReportDisplay title="Personal Daily Horoscope" fileName="daily-horoscope-report">
            <Card className="mt-6 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-center text-primary font-headline">Your Personal Horoscope</CardTitle>
                </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {state.horoscope}
                </p>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
