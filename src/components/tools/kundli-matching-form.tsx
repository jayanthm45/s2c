'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { kundliMatchingAction, type FormState } from '@/app/tools/kundli-matching/actions';
import type { KundliMatchingOutput } from '@/ai/flows/kundli-matching';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Loader2, HeartHandshake, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Matching...
        </>
      ) : (
        <>
          <HeartHandshake className="mr-2 h-4 w-4" /> Match Kundli
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

function ResultDisplay({ result }: { result: KundliMatchingOutput }) {
    const scorePercentage = (result.totalScore / 36) * 100;

    return (
        <ReportDisplay title="Kundli Matching Report" fileName="kundli-matching-report">
            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary font-headline">Compatibility Score</CardTitle>
                        <CardDescription className="text-center">{result.compatibilityMessage}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-primary/10 stroke-current"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeWidth="3"
                                />
                                <path
                                    className="text-primary stroke-current"
                                    strokeDasharray={`${scorePercentage}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                    transform="rotate(-90 18 18)"
                                />
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-4xl font-bold text-primary">{result.totalScore}</span>
                                <span className="text-lg text-muted-foreground">/ 36</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ashtakoota Milan Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Koota</TableHead>
                                    <TableHead>Boy</TableHead>
                                    <TableHead>Girl</TableHead>
                                    <TableHead className="text-right">Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.kootaScores.map((k) => (
                                    <TableRow key={k.name}>
                                        <TableCell className="font-medium">{k.name}</TableCell>
                                        <TableCell>{k.boyKoota}</TableCell>
                                        <TableCell>{k.girlKoota}</TableCell>
                                        <TableCell className="text-right font-semibold">{k.receivedPoints} / {k.totalPoints}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {result.mangalDoshaAnalysis.isCancelled || (!result.mangalDoshaAnalysis.boyHasDosha && !result.mangalDoshaAnalysis.girlHasDosha) ? <ShieldCheck className="text-green-500" /> : <ShieldAlert className="text-red-500" />}
                            Mangal Dosha Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.mangalDoshaAnalysis.conclusion}</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Final Conclusion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.conclusion}</p>
                    </CardContent>
                </Card>
            </div>
        </ReportDisplay>
    )
}

export function KundliMatchingForm() {
  const [state, formAction] = useActionState(kundliMatchingAction, initialState);
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
      <form ref={formRef} action={formAction} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Boy's Details */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Boy's Details</h3>
            <div className="space-y-2">
              <Label htmlFor="boyName">Name</Label>
              <Input id="boyName" name="boyName" type="text" placeholder="e.g., Ram" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boyBirthDate">Birth Date</Label>
              <Input id="boyBirthDate" name="boyBirthDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boyBirthTime">Birth Time</Label>
              <Input id="boyBirthTime" name="boyBirthTime" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boyBirthLocation">Birth Location</Label>
              <Input id="boyBirthLocation" name="boyBirthLocation" type="text" placeholder="e.g., Ayodhya, India" required />
            </div>
          </div>
          {/* Girl's Details */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Girl's Details</h3>
            <div className="space-y-2">
              <Label htmlFor="girlName">Name</Label>
              <Input id="girlName" name="girlName" type="text" placeholder="e.g., Sita" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="girlBirthDate">Birth Date</Label>
              <Input id="girlBirthDate" name="girlBirthDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="girlBirthTime">Birth Time</Label>
              <Input id="girlBirthTime" name="girlBirthTime" type="time" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="girlBirthLocation">Birth Location</Label>
              <Input id="girlBirthLocation" name="girlBirthLocation" type="text" placeholder="e.g., Janakpur, Nepal" required />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
            <div className="w-full md:w-1/3">
                <SubmitButton />
            </div>
        </div>
      </form>
      {state.result && <ResultDisplay result={state.result} />}
    </div>
  );
}
