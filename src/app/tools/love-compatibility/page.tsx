"use client";
import { LoveCompatibilityForm } from '@/components/tools/love-compatibility-form';
import { FriendshipScoreForm } from '@/components/tools/friendship-score-form';
import { FlamesCalculatorForm } from '@/components/tools/flames-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {  ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompatibilityCalculatorsPage() {
   const router = useRouter();
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center relative">
       <Button
        onClick={() => router.back()}
        variant="ghost"
        className="absolute top-4 left-0 flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Heart className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Compatibility Calculators</CardTitle>
            <CardDescription>
              Explore your relationships with our fun calculators!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="love" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="love"><Heart className="w-4 h-4 mr-2"/>Love</TabsTrigger>
                <TabsTrigger value="friendship"><Users className="w-4 h-4 mr-2"/>Friendship</TabsTrigger>
                <TabsTrigger value="flames"><Flame className="w-4 h-4 mr-2"/>FLAMES</TabsTrigger>
              </TabsList>
              <TabsContent value="love" className="mt-6">
                 <CardDescription className="text-center mb-4">
                    Enter two names to calculate your love compatibility score!
                </CardDescription>
                <LoveCompatibilityForm />
              </TabsContent>
              <TabsContent value="friendship" className="mt-6">
                 <CardDescription className="text-center mb-4">
                    Find out how strong your friendship bond is!
                </CardDescription>
                <FriendshipScoreForm />
              </TabsContent>
              <TabsContent value="flames" className="mt-6">
                 <CardDescription className="text-center mb-4">
                    Play the classic game to predict your relationship status.
                </CardDescription>
                <FlamesCalculatorForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
