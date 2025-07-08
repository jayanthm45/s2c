'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { sadeSatiAction, type FormState } from '@/app/tools/sade-sati-calculator/actions';
import type { SadeSatiOutput } from '@/ai/flows/sade-sati-calculator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Scale, ListOrdered, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <Scale className="mr-2 h-4 w-4" /> Calculate Sade Sati
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

function ResultDisplay({ result }: { result: SadeSatiOutput }) {
    return (
        <ReportDisplay title="Sade Sati Analysis" fileName="sade-sati-report">
            <div className="space-y-6">
                <div className={`p-4 rounded-lg text-center ${result.isCurrentlyInSadeSati ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                    <div className={`flex items-center justify-center gap-2 font-bold ${result.isCurrentlyInSadeSati ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
                        {result.isCurrentlyInSadeSati ? <ShieldAlert className="h-6 w-6"/> : <ShieldCheck className="h-6 w-6" />}
                        <span className="text-lg">
                            {result.isCurrentlyInSadeSati ? 'You are currently in Sade Sati' : 'You are not in Sade Sati'}
                        </span>
                    </div>
                    {result.isCurrentlyInSadeSati && result.currentSadeSatiDetails && (
                        <p className="text-sm mt-1">{result.currentSadeSatiDetails.startDate} - {result.currentSadeSatiDetails.endDate}</p>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Analysis for Moon Sign: {result.moonSign}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.description}</p>
                    </CardContent>
                </Card>

                {result.pastSadeSatiPeriods.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Sade Sati Periods</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.pastSadeSatiPeriods.map((p, i) => (
                                        <TableRow key={`past-${i}`}>
                                            <TableCell>{p.startDate}</TableCell>
                                            <TableCell>{p.endDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {result.futureSadeSatiPeriods.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Future Sade Sati Periods</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Start Date</TableHead>
                                        <TableHead>End Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.futureSadeSatiPeriods.map((p, i) => (
                                        <TableRow key={`future-${i}`}>
                                            <TableCell>{p.startDate}</TableCell>
                                            <TableCell>{p.endDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {result.remedies.length > 0 && (
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ListOrdered/> Suggested Remedies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                {result.remedies.map((remedy, index) => (
                                    <li key={index}>{remedy}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </ReportDisplay>
    );
}

export function SadeSatiCalculatorForm() {
  const [state, formAction] = useActionState(sadeSatiAction, initialState);
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
      {state.result && <ResultDisplay result={state.result} />}
    </div>
  );
}
