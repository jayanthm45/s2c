
import { liveSessions } from '@/lib/data';
import { LiveSessionCard } from '@/components/live-session-card';
import { Radio } from 'lucide-react';

export default function LiveSessionsPage() {
  const liveNowSessions = liveSessions.filter(s => s.status === 'live');
  const upcomingSessions = liveSessions.filter(s => s.status === 'upcoming');

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Live Astrologer Sessions
        </h1>
        <p className="text-lg text-muted-foreground">
          Join our expert astrologers live to ask questions and get insights.
        </p>
      </header>
      
      {liveNowSessions.length > 0 && (
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-6 font-headline">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            Live Now
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {liveNowSessions.map((session) => (
              <LiveSessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}

      {upcomingSessions.length > 0 && (
         <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-headline">
            Upcoming Sessions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingSessions.map((session) => (
              <LiveSessionCard key={session.id} session={session} />
            ))}
          </div>
        </section>
      )}
      
       {liveNowSessions.length === 0 && upcomingSessions.length === 0 && (
         <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No live or upcoming sessions right now.</p>
            <p>Please check back later.</p>
         </div>
       )}
    </div>
  );
}
