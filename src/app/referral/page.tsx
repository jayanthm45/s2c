'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Gift, Copy, Send, Loader2 } from 'lucide-react';
import { FormState, sendInviteAction } from './actions';


const referralCode = 'COSMIC123';
const referralLink = `https://seabed2crest-astrotalk.app/signup?ref=${referralCode}`;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Send Invite
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  message: '',
};

export default function ReferralPage() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(sendInviteAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: text,
    });
  };

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Oops!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-4 mb-4">
            <Gift className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-primary mb-2 font-headline">
            Invite Friends, Earn Rewards
          </h1>
          <p className="text-lg text-muted-foreground">
            Share the wisdom of the stars and get rewarded for every friend who
            joins.
          </p>
        </header>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className='text-[20px] md:text-4xl'>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link with your friends. They get a discount, and you
              get credits in your wallet!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 p-2 border rounded-lg bg-secondary">
              <Input value={referralLink} readOnly className="flex-grow bg-background"/>
              <Button onClick={() => copyToClipboard(referralLink)}>
                <Copy className="mr-2 h-4 w-4" /> Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className='text-[20px] md:text-4xl'>Share via Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
              <Input
                name="email"
                type="email"
                placeholder="Enter friend's email"
                className="flex-grow"
                required
              />
              <input type="hidden" name="referralLink" value={referralLink} />
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold font-headline">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 text-left">
                <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-bold text-primary mb-2">1. Share your link</h3>
                    <p className="text-sm text-muted-foreground">Send your unique referral link to your friends via social media or email.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-bold text-primary mb-2">2. Friend signs up</h3>
                    <p className="text-sm text-muted-foreground">Your friend signs up on Seabed2Crest Astrotalk using your referral link.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                    <h3 className="font-bold text-primary mb-2">3. You get rewarded</h3>
                    <p className="text-sm text-muted-foreground">Once they complete their first consultation, you receive bonus credits in your wallet.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
