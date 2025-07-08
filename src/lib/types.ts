export interface Astrologer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  experience: number;
  rating: number;
  reviews: number;
  price: number;
  language: string;
  status: 'online' | 'busy' | 'away';
  bio: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'success' | 'pending' | 'failed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'astrologer';
  text: string;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Bracelets' | 'Yantras' | 'Pendants' | 'Rudraksha' | 'Gemstones' | 'Dome Trees';
  purpose?: ('Money Magnet' | 'Healing' | 'Love' | 'Protection')[];
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  benefits: string[];
  howToWear: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface KarmaTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'spent';
}

export interface LiveSession {
  id: string;
  title: string;
  description: string;
  astrologer: Astrologer;
  status: 'live' | 'upcoming';
  startTime: string;
  image: string;
}
