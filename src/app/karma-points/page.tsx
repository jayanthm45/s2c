import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { karmaTransactions } from '@/lib/data';
import {
  Gem,
  Gift,
  LogIn,
  MessageCircle,
  ShoppingBag,
  UserPlus,
} from 'lucide-react';

const earningMethods = [
  { icon: LogIn, text: 'Daily Login', points: 5 },
  { icon: UserPlus, text: 'Refer a Friend', points: 50 },
  { icon: MessageCircle, text: 'First Chat with Astrologer', points: 20 },
  { icon: ShoppingBag, text: 'First AstroShop Purchase', points: 20 },
];

const rewards = [
  { points: 500, description: '₹100 off on next consultation' },
  { points: 1000, description: '5 free chat minutes' },
  { points: 2500, description: '10% off on AstroShop products' },
  { points: 5000, description: 'Free detailed Kundli report' },
];

export default function KarmaPointsPage() {
  const currentBalance = karmaTransactions.reduce((acc, t) => {
    return t.type === 'earned' ? acc + t.points : acc - t.points;
  }, 0);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-4 mb-4">
            <Gem className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
            Karma Points
          </h1>
          <p className="text-lg text-muted-foreground">
            Get rewarded for your engagement on our platform.
          </p>
        </header>

        <Card className="mb-8 shadow-lg text-center">
          <CardHeader>
            <CardTitle className="text-xl text-muted-foreground font-semibold">
              Your Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2">
              <Gem className="h-10 w-10 text-primary" />
              <p className="text-6xl font-bold">{currentBalance}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {earningMethods.map((method, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary rounded-full">
                        <method.icon className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <span className="font-medium">{method.text}</span>
                    </div>
                    <span className="font-bold text-primary">
                      +{method.points}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="text-primary" /> Redeem Your Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rewards.map((reward, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="font-medium">{reward.description}</span>
                    <div className="flex items-center gap-1 font-bold text-primary">
                      <Gem className="w-4 h-4" />
                      <span>{reward.points}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Keep track of all your points earned and spent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {karmaTransactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell className="font-medium">{t.description}</TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        t.type === 'earned'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {t.type === 'earned' ? '+' : '-'}{t.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
