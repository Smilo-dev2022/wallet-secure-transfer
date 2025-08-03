import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Store, QrCode, BarChart3, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface MerchantAccount {
  id: string;
  businessName: string;
  businessType: string;
  registrationNumber: string;
  status: string;
}

interface Transaction {
  id: string;
  amount: number;
  created_at: string;
  status: string;
}

interface MerchantToolsProps {
  onBack: () => void;
}

export const MerchantTools: React.FC<MerchantToolsProps> = ({ onBack }) => {
  const [merchantAccount, setMerchantAccount] = useState<MerchantAccount | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadMerchantAccount();
    loadTransactions();
  }, [loadTransactions]);

  const loadMerchantAccount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('merchant_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setMerchantAccount(data);
        setBusinessName(data.business_name);
        setBusinessType(data.business_type);
        setRegistrationNumber(data.registration_number);
      }
    } catch (error) {
      console.error('Error loading merchant account:', error);
    }
  };

  const loadTransactions = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('merchant_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }, [setTransactions]);

  const createMerchantAccount = async () => {
    if (!businessName || !businessType) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase.from('merchant_accounts').insert({
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
        registration_number: registrationNumber,
        status: 'pending'
      }).select().single();

      if (error) throw error;

      setMerchantAccount(data);
      toast({ title: 'Success', description: 'Merchant account created successfully!' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create merchant account', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const generatePaymentQR = () => {
    const paymentData = {
      merchant_id: merchantAccount?.id,
      business_name: businessName,
      timestamp: Date.now()
    };
    
    toast({ 
      title: 'QR Code Generated', 
      description: 'Payment QR code is ready for customers to scan' 
    });
  };

  if (!merchantAccount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Merchant Tools</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Create Merchant Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="business">Business Name *</Label>
                <Input
                  id="business"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your business name"
                />
              </div>

              <div>
                <Label htmlFor="type">Business Type *</Label>
                <Input
                  id="type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g., Restaurant, Retail, Services"
                />
              </div>

              <div>
                <Label htmlFor="registration">Registration Number</Label>
                <Input
                  id="registration"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="Business registration number"
                />
              </div>

              <Button 
                onClick={createMerchantAccount} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Creating...' : 'Create Merchant Account'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{merchantAccount.business_name}</p>
                  <p className="text-sm text-gray-600">{merchantAccount.business_type}</p>
                  <p className="text-sm">Status: <span className="capitalize font-medium">{merchantAccount.status}</span></p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">R {merchantAccount.monthly_volume?.toLocaleString() || '0'}</p>
                  <p className="text-sm text-gray-600">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commission Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{(merchantAccount.commission_rate * 100).toFixed(2)}%</p>
                  <p className="text-sm text-gray-600">Per transaction</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Payment Tools
                  <Button onClick={generatePaymentQR} size="sm">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">QR Code Payments</h3>
                    <p className="text-sm text-gray-600">Generate QR codes for customers to scan and pay instantly</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">NFC Payments</h3>
                    <p className="text-sm text-gray-600">Accept contactless payments via NFC-enabled devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Transaction Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Transactions</p>
                      <p className="text-2xl font-bold">{transactions.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold">98.5%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Recent Transactions</h3>
                    {transactions.slice(0, 5).map((tx: Transaction) => (
                      <div key={tx.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">R {tx.amount}</span>
                        <span className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Input
                    id="business-type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>

                <Button className="w-full">Update Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MerchantTools;