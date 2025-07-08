'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { kundliGeneratorAction, type FormState } from '@/app/tools/kundli/actions';
import type { KundliGeneratorOutput } from '@/ai/flows/kundli-generator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Orbit } from 'lucide-react';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Chart...
        </>
      ) : (
        <>
          <Orbit className="mr-2 h-4 w-4" /> Generate Kundli
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

function ResultDisplay({ result }: { result: KundliGeneratorOutput }) {
    return (
        <ReportDisplay title="Vedic Kundli Report" fileName="kundli-report">
            <div className="space-y-6">
                <Card className="bg-primary/5">
                    <CardHeader>
                        <CardTitle className="text-center text-primary font-headline">Core Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-sm text-muted-foreground">Ascendant</p>
                                <p className="font-bold text-primary">{result.ascendant}</p>
                            </div>
                            <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-sm text-muted-foreground">Sun Sign</p>
                                <p className="font-bold text-primary">{result.sunSign}</p>
                            </div>
                            <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-sm text-muted-foreground">Moon Sign</p>
                                <p className="font-bold text-primary">{result.moonSign}</p>
                            </div>
                            <div className="p-2 bg-secondary rounded-lg">
                                <p className="text-sm text-muted-foreground">Nakshatra</p>
                                <p className="font-bold text-primary">{result.nakshatra}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Planetary Positions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Planet</TableHead>
                                    <TableHead>Sign</TableHead>
                                    <TableHead>House</TableHead>
                                    <TableHead className="text-right">Degrees</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.planetaryPositions.map((p) => (
                                    <TableRow key={p.planet}>
                                        <TableCell className="font-medium">{p.planet} {p.isRetrograde ? '(R)' : ''}</TableCell>
                                        <TableCell>{p.sign}</TableCell>
                                        <TableCell>{p.house}</TableCell>
                                        <TableCell className="text-right">{p.degrees.toFixed(2)}°</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>House (Bhava) Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>House</TableHead>
                                    <TableHead>Sign</TableHead>
                                    <TableHead>Planets</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.housePositions.map((h) => (
                                    <TableRow key={h.house}>
                                        <TableCell className="font-medium">{h.house}</TableCell>
                                        <TableCell>{h.sign}</TableCell>
                                        <TableCell>{h.planets.join(', ') || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Vimshottari Dasha Periods</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Dasha Lord</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.vimshottariDasha.map((d) => (
                                    <TableRow key={d.planet}>
                                        <TableCell className="font-medium">{d.planet}</TableCell>
                                        <TableCell>{d.startDate}</TableCell>
                                        <TableCell>{d.endDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Basic Interpretation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.basicInterpretation}</p>
                    </CardContent>
                </Card>
            </div>
        </ReportDisplay>
    )
}

export function KundliGeneratorForm() {
  const [state, formAction] = useActionState(kundliGeneratorAction, initialState);
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
