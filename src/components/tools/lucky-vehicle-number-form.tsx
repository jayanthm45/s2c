'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { luckyVehicleNumberAction, type FormState } from '@/app/tools/lucky-vehicle-number/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calculator, CheckCircle, XCircle } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
        </>
      ) : (
        <>
          <Calculator className="mr-2 h-4 w-4" /> Check Luck
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export function LuckyVehicleNumberForm() {
  const [state, formAction] = useActionState(luckyVehicleNumberAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.isLucky === undefined) {
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
         <div className="space-y-2">
          <Label htmlFor="vehicleNumber">Vehicle Number</Label>
          <Input id="vehicleNumber" name="vehicleNumber" type="text" placeholder="e.g. DL 1C AB 1234" required />
        </div>
        <SubmitButton />
      </form>
      {state.isLucky !== undefined && (
        <ReportDisplay title="Lucky Vehicle Number Report" fileName="lucky-vehicle-number-report">
            <Card className="mt-6 bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-center text-primary font-headline">Your Result</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-card rounded-lg">
                        <p className="text-sm text-muted-foreground">Your Psychic Number</p>
                        <p className="text-2xl font-bold text-primary">{state.psychicNumber}</p>
                    </div>
                     <div className="p-3 bg-card rounded-lg">
                        <p className="text-sm text-muted-foreground">Vehicle's Number</p>
                        <p className="text-2xl font-bold text-primary">{state.vehicleSingleDigit}</p>
                    </div>
                </div>

                <div className={`p-4 rounded-lg text-center ${state.isLucky ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    <div className={`flex items-center justify-center gap-2 font-bold ${state.isLucky ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {state.isLucky ? <CheckCircle className="h-6 w-6"/> : <XCircle className="h-6 w-6" />}
                        <span className="text-lg">
                            {state.isLucky ? 'This is a lucky number for you!' : 'This number may not be ideal.'}
                        </span>
                    </div>
                </div>

                <div className="text-center p-3 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground">Based on your Psychic Number, your lucky numbers are:</p>
                    <p className="text-xl font-bold text-primary">{state.luckyNumbers?.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
