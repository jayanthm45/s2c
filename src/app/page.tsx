
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { TrustedBySection } from '@/components/home/trusted-by-section';
import { ReviewsSection } from '@/components/home/reviews-section';
import {
  MessageCircle,
  HeartHandshake,
  Smile,
  Orbit,
  ArrowRight,
  Gem,
  Sparkles,
  Shield,
  Hand,
  Hourglass,
} from 'lucide-react';
import { astrologers } from '@/lib/data';
import { AstrologerCard } from '@/components/astrologer-card';
import Image from 'next/image';
import { HeroCarousel } from '@/components/home/hero-carousel';

const topServices = [
  {
    title: 'Live Astrology Reading',
    description:
      'Connect with expert astrologers for one-on-one consultations and get immediate answers.',
    link: '/astrologers',
    icon: MessageCircle,
  },
   {
    title: 'Past Life Analysis',
    description: 'Uncover the story of your past life and its lessons.',
    link: '/tools/past-life-analysis',
    icon: Hourglass,
    status: 'live',
  },
  {
    title: 'Kundli Matching',
    description:
      'Check marriage compatibility with our detailed Vedic Kundli Milan tool.',
    link: '/tools/kundli-matching',
    icon: HeartHandshake,
  },
  {
    title: 'AI Palm Reading',
    description:
      'Uncover the secrets of your destiny hidden in your palm lines with our AI scanner.',
    link: '/tools/palm-reading',
    icon: Hand,
  },
  {
    title: 'AI Face Reading',
    description:
      'Discover your personality traits from a photo. Quick, fun, and surprisingly accurate.',
    link: '/tools/face-reading',
    icon: Smile,
  },
  {
    title: 'Detailed Birth Chart',
    description:
      'Generate your free Kundli to understand the planetary positions at the time of your birth.',
    link: '/tools/kundli',
    icon: Orbit,
  },
];

const homeCategories = [
  { name: 'Bracelets', icon: Gem, href: '/astro-shop/category/bracelets' },
  { name: 'Rudraksha', icon: Sparkles, href: '/astro-shop/category/rudraksha' },
  { name: 'Yantras', icon: Shield, href: '/astro-shop/category/yantras' },
  { name: 'Gemstones', icon: Gem, href: '/astro-shop/category/gemstones' },
];

export default function Home() {
  const topAstrologers = astrologers.slice(0, 3);

  return (
    <div className="bg-background">
      <HeroCarousel />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Your Complete Portal to Cosmic Discovery
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              From live readings with expert astrologers to detailed birth charts, we provide the tools you need to navigate your life's journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topServices.map((service, index) => (
              <Link href={service.link} key={index}>
                <Card className="text-center h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                      <service.icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Meet Our Expert Astrologers
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Guidance you can trust from the best in the field.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topAstrologers.map((astrologer) => (
              <AstrologerCard key={astrologer.id} astrologer={astrologer} />
            ))}
          </div>
           <div className="text-center mt-12">
             <Link href="/astrologers">
                <Button size="lg">
                  View All Astrologers <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
           </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 lg:p-12 text-center md:text-left">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
                        Unlock Your Destiny with a Free Kundli
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Generate your detailed Vedic birth chart to understand planetary influences on your life, personality, career, and future. Get started for free.
                    </p>
                    <Link href="/tools/kundli" className="mt-6 inline-block">
                        <Button size="lg">
                            Generate My Free Kundli <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
                <div className="h-64 md:h-full order-first md:order-last">
                     <Image
                        src="/kun.webp"
                        alt="Kundli Chart"
                        width={1000}
                        height={800}
                        className="object-cover w-full h-full"
                        data-ai-hint="zodiac chart"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Shop Our Astro Mall
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Find authentic items to enhance your spiritual journey.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {homeCategories.map((category) => (
              <Link href={category.href} key={category.name}>
                <Card className="text-center hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col justify-center items-center p-4">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold">{category.name}</p>
                </Card>
              </Link>
            ))}
          </div>
           <div className="text-center mt-12">
             <Link href="/astro-shop">
                <Button size="lg" variant="outline">
                  Visit The Shop <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
           </div>
        </div>
      </section>

      <TrustedBySection />

      <ReviewsSection />

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/10 rounded-lg p-10 text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">
              Ready to Find Your Path?
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our astrologers are available 24/7 to provide you with the clarity
              and guidance you seek. Your first 5 minutes are on us!
            </p>
            <Link href="/astrologers" className="mt-6 inline-block">
              <Button size="lg">Talk to an Astrologer Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
