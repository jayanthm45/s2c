
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
    hint: 'woman portrait',
    rating: 5,
    review: 'The guidance I received was life-changing. My astrologer was patient, insightful, and incredibly accurate. I feel so much more confident about my future.'
  },
  {
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop',
    hint: 'man portrait',
    rating: 5,
    review: 'A fantastic platform with genuine astrologers. The app is easy to use, and the live sessions are a great way to learn. Highly recommended!'
  },
  {
    name: 'Priya Mehta',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop',
    hint: 'woman portrait smiling',
    rating: 4,
    review: 'I bought a 7-chakra bracelet from the Astro Shop, and the quality is amazing. I felt a positive shift in my energy almost immediately. Great product!'
  },
];

export function ReviewsSection() {
  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Customers Say</h2>
          <p className="mt-2 text-lg text-muted-foreground">Real stories from our satisfied users.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="p-6 flex-grow">
                <p className="text-muted-foreground italic">"{review.review}"</p>
              </CardContent>
              <CardHeader className="p-6 pt-0 flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.hint} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
