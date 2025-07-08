import { astrologers } from '@/lib/data';
import { ChatWindow } from '@/components/chat-window';
import { notFound } from 'next/navigation';

export default function ChatPage({ params }: { params: { astrologerId: string } }) {
  const astrologer = astrologers.find((a) => a.id === params.astrologerId);

  if (!astrologer) {
    notFound();
  }

  return (
    <div className="w-full h-full">
      <ChatWindow astrologer={astrologer} />
    </div>
  );
}
