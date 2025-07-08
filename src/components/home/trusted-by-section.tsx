
import { Users, Star, Award, Heart } from 'lucide-react';

const stats = [
  { value: '10M+', label: 'Happy Customers', icon: Heart },
  { value: '500+', label: 'Expert Astrologers', icon: Users },
  { value: '25+', label: 'Years Experience', icon: Award },
  { value: '95%', label: 'Accuracy Rate', icon: Star },
];

export function TrustedBySection() {
  return (
    <section className="py-12 lg:py-20 bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Trusted by Millions</h2>
          <p className="mt-2 text-lg text-footer-foreground/80">Our numbers speak for themselves</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card p-6 rounded-lg text-center shadow-lg flex flex-col items-center justify-center">
              <stat.icon className="w-10 h-10 text-primary mb-4" />
              <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm md:text-base text-card-foreground/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
