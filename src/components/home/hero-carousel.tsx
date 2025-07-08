
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const banners = [
  {
    title: "Connect with Top Astrologers",
    description: "Get live guidance and answers to your life's burning questions. Our experts are here for you 24/7.",
    imageUrl: '/ni.png',
    hint: 'astrology reading',
    link: '/astrologers',
    linkText: 'Talk to Astrologer'
  },
  {
    title: 'Discover Your Path with Kundli',
    description: 'Generate your detailed Vedic birth chart to uncover insights about your personality, career, and future.',
    imageUrl: '/kun.webp',
    hint: 'zodiac chart',
    link: '/tools/kundli',
    linkText: 'Generate Kundli'
  },
  {
    title: 'Astro Shop for Cosmic Remedies',
    description: 'Find authentic gemstones, yantras, and rudraksha to enhance your energy and bring positivity.',
    imageUrl: '/p2.jpg',
    hint: 'spiritual crystals',
    link: '/astro-shop',
    linkText: 'Visit Shop'
  },
  {
    title: 'Check Your Zodiac Compatibility',
    description: 'Find out how well you match with your partner in love, friendship, and work with our detailed analysis.',
    imageUrl: '/p5.webp',
    hint: 'love relationship',
    link: '/tools/zodiac-compatibility',
    linkText: 'Check Compatibility'
  },
  {
    title: 'Your Daily Horoscope, Personalized',
    description: 'Start your day with insights from the stars, tailored specifically to your birth details.',
    imageUrl: '/dhor.png',
    hint: 'galaxy stars',
    link: '/tools/daily-horoscope',
    linkText: 'Get Horoscope'
  }
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full group"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <Card className="border-none rounded-none shadow-none">
              <CardContent className="relative flex items-center justify-center p-0 h-[300px] md:h-[500px] overflow-hidden">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  data-ai-hint={banner.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="relative z-10 text-center text-white p-6">
                  <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>{banner.title}</h2>
                  <p className="max-w-xl mx-auto mb-6 text-base md:text-lg animate-fadeIn" style={{ animationDelay: '0.4s' }}>{banner.description}</p>
                  <Link href={banner.link}>
                    <Button size="lg" className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>{banner.linkText}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex bg-white/30 hover:bg-white/50 text-white border-none transition-opacity opacity-0 group-hover:opacity-100" />
      <CarouselNext className="hidden md:flex bg-white/30 hover:bg-white/50 text-white border-none transition-opacity opacity-0 group-hover:opacity-100" />
    </Carousel>
  );
}
