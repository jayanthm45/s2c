import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
    return (
        <div className="container mx-auto py-12 px-4 flex justify-center">
            <Card className="w-full max-w-lg text-center shadow-xl">
                <CardHeader>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="mt-4 text-3xl font-bold font-headline">Thank You For Your Order!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                        Your payment was successful and your order is being prepared. 
                        You will receive a confirmation email shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/astro-shop">
                            <Button>
                               <ShoppingBag className="mr-2" /> Continue Shopping
                            </Button>
                        </Link>
                         <Link href="/">
                            <Button variant="outline">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
