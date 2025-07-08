'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { loveCompatibilityAction, type LoveFormState } from '@/app/tools/love-compatibility/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Heart } from 'lucide-react';
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
          <Heart className="mr-2 h-4 w-4" /> Calculate
        </>
      )}
    </Button>
  );
}

const initialState: LoveFormState = {
  message: '',
};

const getCompatibilityMessage = (score?: number): string => {
    if (score === undefined) return '';
    if (score > 85) return 'An outstanding match! You two are meant for each other.';
    if (score > 70) return 'A very strong connection. This looks promising!';
    if (score > 50) return 'Good compatibility. There is definite potential here.';
    return 'An interesting match. Relationships take work, and this one is worth exploring.';
}


export function LoveCompatibilityForm() {
  const [state, formAction] = useActionState(loveCompatibilityAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.score) {
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
          <Label htmlFor="name1">First Name</Label>
          <Input id="name1" name="name1" type="text" placeholder="E.g., John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name2">Second Name</Label>
          <Input id="name2" name="name2" type="text" placeholder="E.g., Jane" required />
        </div>
        <SubmitButton />
      </form>
      {state.score !== undefined && state.names && (
        <ReportDisplay title="Love Compatibility Score" fileName="love-score-report">
            <Card className="mt-6 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-center text-primary font-headline">Your Result</CardTitle>
                </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Compatibility between</p>
                <p className="text-lg font-semibold">{state.names.name1} & {state.names.name2}</p>
                
                <div className="my-4">
                     <div className="text-7xl font-bold text-primary">{state.score}%</div>
                </div>

                <p className="text-muted-foreground font-medium">{getCompatibilityMessage(state.score)}</p>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
