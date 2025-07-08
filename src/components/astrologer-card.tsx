'use client';

import type { Astrologer } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface AstrologerCardProps {
  astrologer: Astrologer;
}

const statusVariantMap = {
  online: 'default',
  busy: 'destructive',
  away: 'secondary',
} as const;

export function AstrologerCard({ astrologer }: AstrologerCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-4 p-4 bg-primary/5">
        <Avatar className="h-16 w-16 border-2 border-primary/20">
          <AvatarImage
            src={astrologer.avatar}
            alt={astrologer.name}
            data-ai-hint="astrologer portrait"
          />
          <AvatarFallback>{astrologer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-bold font-headline">{astrologer.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {astrologer.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <Badge variant={statusVariantMap[astrologer.status]} className="capitalize">
          {astrologer.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {astrologer.bio}
        </p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>
              {astrologer.rating} ({astrologer.reviews} Reviews)
            </span>
          </div>
          <span>{astrologer.experience} yrs exp.</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
        <div className="font-bold text-primary">
          ₹{astrologer.price}
          <span className="text-xs font-normal text-muted-foreground">/min</span>
        </div>
        <Link href={`/chat/${astrologer.id}`} passHref>
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
