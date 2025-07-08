'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { loShuGridAction, type FormState } from '@/app/tools/lo-shu-grid/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
          <Calculator className="mr-2 h-4 w-4" /> Calculate Grid
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function LoShuGridForm() {
  const [state, formAction] = useActionState(loShuGridAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.grid) {
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
      {state.grid && (
        <ReportDisplay title="Lo Shu Grid Report" fileName="lo-shu-grid-report">
            <Card className="mt-6 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-primary font-headline">Your Lo Shu Grid</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-6">
                <div className="grid grid-cols-3 gap-1 w-48 h-48 mx-auto border-2 border-primary rounded-lg">
                  {state.grid.flat().map((cellContent, index) => (
                    <div key={index} className="flex items-center justify-center text-xl font-bold text-foreground border border-primary/20">
                      {cellContent || <span className="text-muted-foreground/50">-</span>}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Psychic Number</p>
                        <p className="text-2xl font-bold text-primary">{state.psychicNumber}</p>
                    </div>
                     <div className="p-3 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Destiny Number</p>
                        <p className="text-2xl font-bold text-primary">{state.destinyNumber}</p>
                    </div>
                </div>

                {state.missingNumbers && state.missingNumbers.length > 0 && (
                    <div className="text-center p-3 bg-secondary rounded-lg">
                        <p className="text-sm text-muted-foreground">Missing Numbers</p>
                        <p className="text-xl font-bold text-destructive">{state.missingNumbers.join(', ')}</p>
                    </div>
                )}
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
