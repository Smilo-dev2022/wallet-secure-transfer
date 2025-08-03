import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Wallet, Send, History, Bitcoin, TrendingUp, 
  Brain, QrCode, Shield, Receipt, Globe, 
  Store, BarChart3, Gift, ArrowLeft 
} from 'lucide-react';

export const WalletDashboard: React.FC = () => {
  const { user } = useAuth();
  const { balance } = useWallet();
  const [currentView, setCurrentView] = useState<string>('dashboard');

  const features = [
    { id: 'send', icon: Send, title: 'Send Money', description: 'Transfer funds instantly' },
    { id: 'history', icon: History, title: 'Transaction History', description: 'View all transactions' },
    { id: 'crypto', icon: Bitcoin, title: 'Crypto Portfolio', description: 'Trade cryptocurrencies' },
    { id: 'investments', icon: TrendingUp, title: 'Investments', description: 'Grow your wealth' },
    { id: 'ai-advisor', icon: Brain, title: 'AI Financial Advisor', description: 'Get smart advice' },
    { id: 'qr-payment', icon: QrCode, title: 'QR Payments', description: 'Scan & pay instantly' },
    { id: 'security', icon: Shield, title: 'Security Center', description: 'Protect your account' },
    { id: 'bills', icon: Receipt, title: 'Bill Payments', description: 'Pay utilities & bills' },
    { id: 'international', icon: Globe, title: 'International Transfer', description: 'Send money globally' },
    { id: 'merchant', icon: Store, title: 'Merchant Tools', description: 'Business solutions' },
    { id: 'analytics', icon: BarChart3, title: 'Analytics', description: 'Financial insights' },
    { id: 'vouchers', icon: Gift, title: 'Vouchers', description: 'Create & redeem vouchers' }
  ];

  const renderFeature = (featureId: string) => {
    const SimpleFeature = ({ title }: { title: string }) => (
      <div className="min-h-screen ikasi-gradient p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('dashboard')} className="mr-2 text-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">Feature coming soon!</p>
              <p className="text-sm text-gray-500">This feature is currently in development.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );

    return <SimpleFeature title={features.find(f => f.id === featureId)?.title || 'Feature'} />;
  };

  if (currentView !== 'dashboard') {
    return renderFeature(currentView);
  }

  return (
    <div className="min-h-screen ikasi-gradient p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">iKasi Wallet</h1>
          <p className="text-lg opacity-90">The World's Best Digital Wallet</p>
          <p className="text-sm opacity-75">Powered by moment.io</p>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Welcome back, {user?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              R {balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </div>
            <Badge className="bg-white/20">Available Balance</Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white/95 backdrop-blur"
                onClick={() => setCurrentView(feature.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center text-white text-xs opacity-75">
          <p>Support: help@ikasiwallet.africa | Technical: technical@ikasiwallet.africa</p>
          <p className="mt-1">Admin: admin@ikasiwallet.africa</p>
        </div>
      </div>
    </div>
  );
};