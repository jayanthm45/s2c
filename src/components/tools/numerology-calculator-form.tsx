'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import {
  calculateNameNumberAction,
  calculateDestinyNumberAction,
  calculatePsychicNumberAction,
  type NameNumberFormState,
  type DestinyNumberFormState,
  type PsychicNumberFormState,
} from '@/app/tools/numerology-calculator/actions';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
          <Calculator className="mr-2 h-4 w-4" /> Calculate
        </>
      )}
    </Button>
  );
}

// Name Number Form
const initialNameState: NameNumberFormState = { message: '' };
function NameNumberForm() {
    const [state, formAction] = useActionState(calculateNameNumberAction, initialNameState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message && state.nameNumber === undefined) {
            toast({ title: 'Error', description: state.message, variant: 'destructive' });
        }
    }, [state, toast]);

    return (
        <div>
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" type="text" placeholder="E.g., John Smith" required />
                </div>
                <SubmitButton />
            </form>
            {state.nameNumber !== undefined && state.name && (
                <ReportDisplay title={`Name Number for ${state.name}`} fileName="name-number-report">
                    <Card className="mt-6 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-center text-primary font-headline">Name Number</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-center">
                            <p className="text-sm font-medium text-muted-foreground">The Name Number for</p>
                            <p className="text-lg font-semibold">{state.name}</p>
                            <div className="my-4">
                                <div className="text-7xl font-bold text-primary">{state.nameNumber}</div>
                            </div>
                        </CardContent>
                    </Card>
                </ReportDisplay>
            )}
        </div>
    );
}

// Destiny Number Form
const initialDestinyState: DestinyNumberFormState = { message: '' };
function DestinyNumberForm() {
    const [state, formAction] = useActionState(calculateDestinyNumberAction, initialDestinyState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message && state.destinyNumber === undefined) {
            toast({ title: 'Error', description: state.message, variant: 'destructive' });
        }
    }, [state, toast]);

    return (
        <div>
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="birthDate_destiny">Date of Birth</Label>
                    <Input id="birthDate_destiny" name="birthDate" type="date" required max={new Date().toISOString().split("T")[0]} />
                </div>
                <SubmitButton />
            </form>
            {state.destinyNumber !== undefined && (
                <ReportDisplay title="Destiny Number Report" fileName="destiny-number-report">
                    <Card className="mt-6 bg-primary/5">
                         <CardHeader>
                            <CardTitle className="text-center text-primary font-headline">Destiny Number</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-center">
                            <div className="my-4">
                                <div className="text-7xl font-bold text-primary">{state.destinyNumber}</div>
                            </div>
                        </CardContent>
                    </Card>
                </ReportDisplay>
            )}
        </div>
    );
}


// Psychic Number Form
const initialPsychicState: PsychicNumberFormState = { message: '' };
function PsychicNumberForm() {
    const [state, formAction] = useActionState(calculatePsychicNumberAction, initialPsychicState);
    const { toast } = useToast();

    useEffect(() => {
        if (state.message && state.psychicNumber === undefined) {
            toast({ title: 'Error', description: state.message, variant: 'destructive' });
        }
    }, [state, toast]);

    return (
        <div>
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="birthDate_psychic">Date of Birth</Label>
                    <Input id="birthDate_psychic" name="birthDate" type="date" required max={new Date().toISOString().split("T")[0]} />
                </div>
                <SubmitButton />
            </form>
            {state.psychicNumber !== undefined && (
                <ReportDisplay title="Psychic Number (Moolank) Report" fileName="psychic-number-report">
                    <Card className="mt-6 bg-primary/5">
                         <CardHeader>
                            <CardTitle className="text-center text-primary font-headline">Psychic Number (Moolank)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 text-center">
                            <div className="my-4">
                                <div className="text-7xl font-bold text-primary">{state.psychicNumber}</div>
                            </div>
                        </CardContent>
                    </Card>
                </ReportDisplay>
            )}
        </div>
    );
}

export function NumerologyCalculatorForm() {
  return (
    <Tabs defaultValue="name" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="name">Name</TabsTrigger>
        <TabsTrigger value="destiny">Destiny</TabsTrigger>
        <TabsTrigger value="psychic">Moolank</TabsTrigger>
      </TabsList>
      <TabsContent value="name" className="mt-6">
        <CardDescription className="text-center mb-4">
            Calculate your Name Number based on Pythagorean numerology.
        </CardDescription>
        <NameNumberForm />
      </TabsContent>
      <TabsContent value="destiny" className="mt-6">
        <CardDescription className="text-center mb-4">
            Your Destiny Number, from your full date of birth.
        </CardDescription>
        <DestinyNumberForm />
      </TabsContent>
      <TabsContent value="psychic" className="mt-6">
        <CardDescription className="text-center mb-4">
            Your Psychic Number (Moolank), from your day of birth.
        </CardDescription>
        <PsychicNumberForm />
      </TabsContent>
    </Tabs>
  );
}
