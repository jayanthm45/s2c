'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { zodiacCompatibilityAction, type FormState } from '@/app/tools/zodiac-compatibility/actions';
import type { ZodiacCompatibilityOutput } from '@/ai/flows/zodiac-compatibility';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Heart, Handshake, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ReportDisplay } from '@/components/tools/report-display';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

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
          <Heart className="mr-2 h-4 w-4" /> Check Compatibility
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

function ResultDisplay({ result, inputSigns }: { result: ZodiacCompatibilityOutput, inputSigns: { sign1: string, sign2: string } }) {
    const scorePercentage = result.score;
    let scoreColor = 'text-green-500';
    if (scorePercentage < 70) scoreColor = 'text-yellow-500';
    if (scorePercentage < 40) scoreColor = 'text-red-500';

    return (
        <ReportDisplay title={`Compatibility Report: ${inputSigns.sign1} & ${inputSigns.sign2}`} fileName={`${inputSigns.sign1}-${inputSigns.sign2}-compatibility`}>
            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary font-headline">
                            {inputSigns.sign1} &amp; {inputSigns.sign2}
                        </CardTitle>
                        <CardDescription className="text-center">Overall Compatibility Score</CardDescription>
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
                                    className={`${scoreColor} stroke-current`}
                                    strokeDasharray={`${scorePercentage}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeWidth="3"
                                    transform="rotate(-90 18 18)"
                                />
                            </svg>
                            <div className={`absolute text-center ${scoreColor}`}>
                                <span className="text-4xl font-bold">{result.score}</span>
                                <span className="text-lg">/100</span>
                            </div>
                        </div>
                         <p className="text-muted-foreground mt-4 text-sm max-w-md mx-auto">{result.summary}</p>
                    </CardContent>
                </Card>

                <Accordion type="single" collapsible defaultValue="love" className="w-full">
                    <AccordionItem value="love">
                        <AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <Heart className="text-red-500"/>
                                <span className="font-semibold text-lg">Love & Romance</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground p-2">{result.love}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="friendship">
                        <AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <Handshake className="text-blue-500"/>
                                 <span className="font-semibold text-lg">Friendship</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground p-2">{result.friendship}</AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="communication">
                        <AccordionTrigger>
                            <div className="flex items-center gap-3">
                                <Briefcase className="text-gray-500"/>
                                 <span className="font-semibold text-lg">Communication & Work</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground p-2">{result.communication}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ReportDisplay>
    )
}

export function ZodiacCompatibilityForm() {
  const [state, formAction] = useActionState(zodiacCompatibilityAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.result) {
      toast({
        title: 'Heads up!',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sign1">First Sign</Label>
            <Select name="sign1" required>
                <SelectTrigger id="sign1">
                    <SelectValue placeholder="Select a sign" />
                </SelectTrigger>
                <SelectContent>
                    {zodiacSigns.map(sign => (
                        <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sign2">Second Sign</Label>
             <Select name="sign2" required>
                <SelectTrigger id="sign2">
                    <SelectValue placeholder="Select a sign" />
                </SelectTrigger>
                <SelectContent>
                    {zodiacSigns.map(sign => (
                        <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center pt-4">
            <div className="w-full md:w-1/2">
                <SubmitButton />
            </div>
        </div>
      </form>
      {state.result && state.inputSigns && <ResultDisplay result={state.result} inputSigns={state.inputSigns} />}
    </div>
  );
}
