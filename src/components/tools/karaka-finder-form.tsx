'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { karakaFinderAction, type FormState } from '@/app/tools/karaka-finder/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Gem } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding Karakas...
        </>
      ) : (
        <>
          <Gem className="mr-2 h-4 w-4" /> Find My Karakas
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function KarakaFinderForm() {
  const [state, formAction] = useActionState(karakaFinderAction, initialState);
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
        <ReportDisplay title="Jaimini Karakas Report" fileName="karakas-report">
            <Card className="mt-6 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-primary font-headline">Your Jaimini Karakas</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-bold text-lg text-primary">Atmakaraka: {state.result.atmakaraka}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{state.result.atmakarakaDescription}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-bold text-lg text-primary">Darakaraka: {state.result.darakaraka}</h4>
                    <p className="text-sm text-muted-foreground mt-2">{state.result.darakarakaDescription}</p>
                </div>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
