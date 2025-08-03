import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Zap, Droplets, Smartphone, Wifi, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface BillPaymentsProps {
  onBack: () => void;
}

export const BillPayments: React.FC<BillPaymentsProps> = ({ onBack }) => {
  const [selectedBiller, setSelectedBiller] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const billers = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-yellow-600' },
    { id: 'water', name: 'Water & Sanitation', icon: Droplets, color: 'text-blue-600' },
    { id: 'mobile', name: 'Mobile Airtime', icon: Smartphone, color: 'text-green-600' },
    { id: 'internet', name: 'Internet & Data', icon: Wifi, color: 'text-purple-600' },
    { id: 'insurance', name: 'Insurance', icon: Shield, color: 'text-red-600' }
  ];

  const handlePayment = async () => {
    if (!selectedBiller || !accountNumber || !amount) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('bill_payments').insert({
        user_id: user.id,
        biller_name: billers.find(b => b.id === selectedBiller)?.name,
        biller_type: selectedBiller,
        account_number: accountNumber,
        amount: parseFloat(amount),
        status: 'completed'
      });

      if (error) throw error;

      toast({ title: 'Success', description: 'Bill payment processed successfully!' });
      setSelectedBiller('');
      setAccountNumber('');
      setAmount('');
    } catch (error) {
      toast({ title: 'Error', description: 'Payment failed. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Bill Payments</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pay Your Bills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Biller</Label>
              <Select value={selectedBiller} onValueChange={setSelectedBiller}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a biller" />
                </SelectTrigger>
                <SelectContent>
                  {billers.map((biller) => (
                    <SelectItem key={biller.id} value={biller.id}>
                      <div className="flex items-center">
                        <biller.icon className={`h-4 w-4 mr-2 ${biller.color}`} />
                        {biller.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount (ZAR)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <Button 
              onClick={handlePayment} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Pay Bill'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};