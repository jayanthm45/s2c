import Link from 'next/link';
import { Card } from '@/components/ui/card';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', slug: 'aries' },
  { name: 'Taurus', symbol: '♉', slug: 'taurus' },
  { name: 'Gemini', symbol: '♊', slug: 'gemini' },
  { name: 'Cancer', symbol: '♋', slug: 'cancer' },
  { name: 'Leo', symbol: '♌', slug: 'leo' },
  { name: 'Virgo', symbol: '♍', slug: 'virgo' },
  { name: 'Libra', symbol: '♎', slug: 'libra' },
  { name: 'Scorpio', symbol: '♏', slug: 'scorpio' },
  { name: 'Sagittarius', symbol: '♐', slug: 'sagittarius' },
  { name: 'Capricorn', symbol: '♑', slug: 'capricorn' },
  { name: 'Aquarius', symbol: '♒', slug: 'aquarius' },
  { name: 'Pisces', symbol: '♓', slug: 'pisces' },
];

export default function AllHoroscopesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Zodiac Horoscopes
        </h1>
        <p className="text-lg text-muted-foreground">
          Select your sign to get your daily, weekly, and monthly insights.
        </p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {zodiacSigns.map((sign) => (
          <Link href={`/horoscope/${sign.slug}`} key={sign.slug}>
            <Card className="text-center hover:shadow-xl hover:border-primary transition-all duration-300 h-full flex flex-col justify-center items-center p-4 aspect-square">
              <div className="text-5xl text-primary">{sign.symbol}</div>
              <p className="text-lg font-semibold mt-2">{sign.name}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
