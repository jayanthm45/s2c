

import {
  Cake,
  Heart,
  Sigma,
  Calculator,
  Sun,
  Moon,
  Users,
  Star,
  Sparkles,
  Swords,
  Scale,
  Gem,
  Orbit,
  Flame,
  Car,
  HeartHandshake,
  Smile,
  Hand,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

const tools = [
  {
    title: 'Zodiac Horoscopes',
    description: 'Get daily, weekly, and monthly insights for all 12 zodiac signs.',
    link: '/horoscope',
    icon: Sparkles,
    status: 'live',
  },
  {
    title: 'Personal Daily Horoscope',
    description: 'Get your personalized daily insights based on your birth chart.',
    link: '/tools/daily-horoscope',
    icon: Star,
    status: 'live',
  },
  {
    title: 'Kundli Matching',
    description: 'Check marriage compatibility with Vedic Kundli Milan.',
    link: '/tools/kundli-matching',
    icon: HeartHandshake,
    status: 'live',
  },
  // Live
  {
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days.',
    link: '/tools/age-calculator',
    icon: Cake,
    status: 'live',
  },
  {
    title: 'Lo Shu Grid',
    description: 'Create your numerological Lo Shu Grid.',
    link: '/tools/lo-shu-grid',
    icon: Calculator,
    status: 'live',
  },
  {
    title: 'Compatibility Calculators',
    description: 'Check your compatibility with Love, Friendship, and FLAMES calculators.',
    link: '/tools/love-compatibility',
    icon: Heart,
    status: 'live',
  },
  {
    title: 'Numerology Calculator',
    description: 'Find your Destiny, Name, and other lucky numbers.',
    link: '/tools/numerology-calculator',
    icon: Sigma,
    status: 'live',
  },
  {
    title: 'Sun Sign Calculator',
    description: 'Find your zodiac sign based on your date of birth.',
    link: '/tools/sun-sign-calculator',
    icon: Sun,
    status: 'live',
  },
   {
    title: 'Friendship Score',
    description: 'Calculate your friendship compatibility score.',
    link: '/tools/friendship-score',
    icon: Users,
    status: 'live',
  },
  {
    title: 'FLAMES Calculator',
    description: 'Play the classic FLAMES game to find your relationship status.',
    link: '/tools/flames-calculator',
    icon: Flame,
    status: 'live',
  },
  {
    title: 'Lucky Vehicle Number',
    description: 'Find a lucky registration number for your vehicle.',
    link: '/tools/lucky-vehicle-number',
    icon: Car,
    status: 'live',
  },
  {
    title: 'Ishta Devata Finder',
    description: 'Discover your Ishta Devata from your birth chart.',
    link: '/tools/ishta-devata-finder',
    icon: Sparkles,
    status: 'live',
  },
  {
    title: 'Moon Sign Calculator',
    description: 'Discover your Rashi or Moon sign from your birth details.',
    link: '/tools/moon-sign-calculator',
    icon: Moon,
    status: 'live',
  },
  {
    title: 'Nakshatra Finder',
    description: 'Find your birth star (Nakshatra) and its details.',
    link: '/tools/nakshatra-finder',
    icon: Star,
    status: 'live',
  },
  {
    title: 'Mangal Dosha Calculator',
    description: 'Check if you have Mangal Dosha in your Kundli.',
    link: '/tools/mangal-dosha-calculator',
    icon: Swords,
    status: 'live',
  },
  {
    title: 'Kundli / Birth Chart',
    description: 'Generate your detailed birth chart or Kundli.',
    link: '/kundli',
    icon: Orbit,
    status: 'live',
  },
   {
    title: 'AI Face Reading',
    description: 'Discover your personality traits from a photo of your face.',
    link: '/tools/face-reading',
    icon: Smile,
    status: 'live',
  },
   {
    title: 'AI Palm Reading',
    description: 'Scan your palm to reveal the secrets hidden in your hand.',
    link: '/tools/palm-reading',
    icon: Hand,
    status: 'live',
  },
  {
    title: 'Atmakaraka & Darakaraka',
    description: 'Find your soul and spouse signifiers in your chart.',
    link: '/tools/karaka-finder',
    icon: Gem,
    status: 'live',
  },
  {
    title: 'Sade Sati Calculator',
    description: 'Check for Shani Sade Sati period in your life.',
    link: '/tools/sade-sati-calculator',
    icon: Scale,
    status: 'live',
  },
  // Placeholders
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Astrology &amp; Numerology Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore our free calculators to get instant insights and answers.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const isSoon = tool.status === 'soon';
          const cardContent = (
             <Card
              key={tool.title}
              className={`flex flex-col h-full transition-all duration-300 ${
                isSoon
                  ? 'bg-muted/50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="p-3 bg-primary/10 rounded-full">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle>{tool.title}</CardTitle>
                   {isSoon && (
                    <div className="text-xs bg-primary/20 text-primary-foreground font-semibold inline-block px-2 py-0.5 rounded-full mt-1">
                      Coming Soon
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          );
           return isSoon ? (
            <div key={tool.title}>{cardContent}</div>
          ) : (
            <Link href={tool.link} key={tool.title}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
