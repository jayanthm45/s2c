'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { ishtaDevataAction, type FormState } from '@/app/tools/ishta-devata-finder/actions';
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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Find My Ishta Devata
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function IshtaDevataFinderForm() {
  const [state, formAction] = useActionState(ishtaDevataAction, initialState);
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
            placeholder="e.g., New York, USA"
            required
          />
        </div>
        <SubmitButton />
      </form>
      {state.result && (
        <ReportDisplay title="Ishta Devata Report" fileName="ishta-devata-report">
            <Card className="mt-6 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-primary font-headline">Your Guiding Deity</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Atmakaraka</p>
                      <p className="text-xl font-bold text-primary">{state.result.atmakaraka}</p>
                  </div>
                   <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Ishta Devata</p>
                      <p className="text-xl font-bold text-primary">{state.result.ishtaDevata}</p>
                  </div>
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
