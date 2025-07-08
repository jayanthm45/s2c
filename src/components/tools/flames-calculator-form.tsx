'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import * as React from 'react';
import { flamesAction, type FlamesFormState } from '@/app/tools/flames-calculator/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Flame, Heart, Handshake, Diamond, UserX, Users } from 'lucide-react';
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
          <Flame className="mr-2 h-4 w-4" /> Calculate FLAMES
        </>
      )}
    </Button>
  );
}

const initialState: FlamesFormState = {
  message: '',
};

const resultIcons: Record<string, React.ElementType> = {
    Friendship: Handshake,
    Love: Heart,
    Affection: Heart,
    Marriage: Diamond,
    Enemy: UserX,
    Siblings: Users,
}

export function FlamesCalculatorForm() {
  const [state, formAction] = useActionState(flamesAction, initialState);
  const { toast } = useToast();

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
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name1_flames">First Name</Label>
          <Input id="name1_flames" name="name1" type="text" placeholder="E.g., Chris" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name2_flames">Second Name</Label>
          <Input id="name2_flames" name="name2" type="text" placeholder="E.g., Pat" required />
        </div>
        <SubmitButton />
      </form>
      {state.result && state.names && (
        <ReportDisplay title="FLAMES Game Result" fileName="flames-report">
            <Card className="mt-6 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-center text-primary font-headline">Your FLAMES Result</CardTitle>
                </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Relationship between</p>
                <p className="text-lg font-semibold">{state.names.name1} & {state.names.name2}</p>
                
                <div className="my-4 flex flex-col items-center gap-2">
                     {resultIcons[state.result] && (
                        <div className="p-4 bg-primary/10 rounded-full">
                            {React.createElement(resultIcons[state.result], { className: "w-10 h-10 text-primary" })}
                        </div>
                     )}
                     <div className="text-4xl font-bold text-primary">{state.result}</div>
                </div>

              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
