'use client';

import { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getGeneralHoroscope } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { notFound } from 'next/navigation';

const zodiacSigns: Record<string, { symbol: string; name: string }> = {
  aries: { symbol: '♈', name: 'Aries' },
  taurus: { symbol: '♉', name: 'Taurus' },
  gemini: { symbol: '♊', name: 'Gemini' },
  cancer: { symbol: '♋', name: 'Cancer' },
  leo: { symbol: '♌', name: 'Leo' },
  virgo: { symbol: '♍', name: 'Virgo' },
  libra: { symbol: '♎', name: 'Libra' },
  scorpio: { symbol: '♏', name: 'Scorpio' },
  sagittarius: { symbol: '♐', name: 'Sagittarius' },
  capricorn: { symbol: '♑', name: 'Capricorn' },
  aquarius: { symbol: '♒', name: 'Aquarius' },
  pisces: { symbol: '♓', name: 'Pisces' },
};

const periods = ['Yesterday', 'Today', 'Tomorrow', 'Weekly', 'Monthly', 'Yearly'];

export default function SignHoroscopePage({ params }: { params: { sign: string } }) {
  const signInfo = zodiacSigns[params.sign];
  const [isPending, startTransition] = useTransition();
  const [horoscope, setHoroscope] = useState('');
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [isLove, setIsLove] = useState(false);

  useEffect(() => {
    if (signInfo) {
      fetchHoroscope(selectedPeriod, isLove);
    }
  }, [selectedPeriod, isLove, params.sign, signInfo]);

  const fetchHoroscope = (period: string, love: boolean) => {
    if (!signInfo) return;
    startTransition(async () => {
      setError('');
      setHoroscope('');
      const result = await getGeneralHoroscope({
        sign: signInfo.name,
        period,
        type: love ? 'Love' : 'General',
      });
      if (result.horoscope) {
        setHoroscope(result.horoscope);
      } else {
        setError(result.message || 'Failed to fetch horoscope.');
      }
    });
  };

  if (!signInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <div className="text-7xl text-primary">{signInfo.symbol}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 font-headline">
          {signInfo.name} Horoscope
        </h1>
      </header>

      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
            <Label htmlFor="horoscope-type" className={cn(!isLove && "text-primary")}>General</Label>
            <Switch
                id="horoscope-type"
                checked={isLove}
                onCheckedChange={setIsLove}
            />
            <Label htmlFor="horoscope-type" className={cn(isLove && "text-primary")}>Love</Label>
        </div>
      </div>

      <Tabs defaultValue="Today" onValueChange={setSelectedPeriod} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4">
          {periods.map(p => (
            <TabsTrigger key={p} value={p}>{p}</TabsTrigger>
          ))}
        </TabsList>

        <Card className="min-h-[250px] shadow-lg">
          <CardHeader>
            <CardTitle>{selectedPeriod} {isLove ? 'Love' : ''} Horoscope</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap">{horoscope}</p>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
