
'use client';

import type { LiveSession } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Video, Bell, Radio } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface LiveSessionCardProps {
  session: LiveSession;
}

export function LiveSessionCard({ session }: LiveSessionCardProps) {
    const { toast } = useToast();
    const isLive = session.status === 'live';
    const [relativeTime, setRelativeTime] = useState('');

    useEffect(() => {
        if (!isLive) {
            const startTime = parseISO(session.startTime);
            setRelativeTime(formatDistanceToNow(startTime, { addSuffix: false }));
        }
    }, [isLive, session.startTime]);
    
    const handleSetReminder = () => {
        toast({
            title: 'Reminder Set!',
            description: `We'll notify you when "${session.title}" starts.`,
        });
    };

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
            <div className="relative">
                <Image 
                    src={session.image}
                    alt={session.title}
                    width={1200}
                    height={isLive ? 675 : 400}
                    className="object-cover w-full h-48 md:h-64"
                    data-ai-hint="astrology session"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                {isLive && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        <Radio className="w-4 h-4" />
                        LIVE
                    </div>
                )}
                <div className="absolute bottom-4 left-4 text-white">
                     <h3 className="text-xl font-bold font-headline">{session.title}</h3>
                </div>
            </div>
            <CardContent className="p-4">
                 <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={session.astrologer.avatar} alt={session.astrologer.name} />
                            <AvatarFallback>{session.astrologer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{session.astrologer.name}</p>
                            <p className="text-xs text-muted-foreground">{session.astrologer.skills.join(', ')}</p>
                        </div>
                    </div>
                    {isLive ? (
                         <Button>
                            <Video className="mr-2" />
                            Join Now
                         </Button>
                    ) : (
                        <Button variant="outline" onClick={handleSetReminder}>
                            <Bell className="mr-2" />
                            Set Reminder
                        </Button>
                    )}
                 </div>
                 <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                 {!isLive && (
                    <p className="text-sm font-semibold text-primary">
                        Starting in {relativeTime || '...'}
                    </p>
                 )}
            </CardContent>
        </Card>
    );
}
