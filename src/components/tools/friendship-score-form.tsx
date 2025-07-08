'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { friendshipScoreAction, type FriendshipFormState } from '@/app/tools/friendship-score/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Users } from 'lucide-react';
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
          <Users className="mr-2 h-4 w-4" /> Calculate Score
        </>
      )}
    </Button>
  );
}

const initialState: FriendshipFormState = {
  message: '',
};

const getFriendshipMessage = (score?: number): string => {
    if (score === undefined) return '';
    if (score > 85) return 'Best friends forever! Your bond is incredibly strong.';
    if (score > 70) return 'A great friendship! You two get along very well.';
    if (score > 50) return 'A solid friendship. You have a good connection.';
    return 'A fine friendship with potential to grow even stronger.';
}

export function FriendshipScoreForm() {
  const [state, formAction] = useActionState(friendshipScoreAction, initialState);
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
          <Label htmlFor="name1_friend">First Name</Label>
          <Input id="name1_friend" name="name1" type="text" placeholder="E.g., Alex" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name2_friend">Second Name</Label>
          <Input id="name2_friend" name="name2" type="text" placeholder="E.g., Sam" required />
        </div>
        <SubmitButton />
      </form>
      {state.score !== undefined && state.names && (
        <ReportDisplay title="Friendship Score Result" fileName="friendship-score-report">
            <Card className="mt-6 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-center text-primary font-headline">Your Result</CardTitle>
                </CardHeader>
              <CardContent className="p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Friendship between</p>
                <p className="text-lg font-semibold">{state.names.name1} & {state.names.name2}</p>
                
                <div className="my-4">
                     <div className="text-7xl font-bold text-primary">{state.score}%</div>
                </div>

                <p className="text-muted-foreground font-medium">{getFriendshipMessage(state.score)}</p>
              </CardContent>
            </Card>
        </ReportDisplay>
      )}
    </div>
  );
}
