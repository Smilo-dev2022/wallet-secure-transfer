import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Globe, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface InternationalTransferProps {
  onBack: () => void;
}

export const InternationalTransfer: React.FC<InternationalTransferProps> = ({ onBack }) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientCountry, setRecipientCountry] = useState('');
  const [recipientBank, setRecipientBank] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currencies = [
    { code: 'USD', name: 'US Dollar', rate: 18.50 },
    { code: 'EUR', name: 'Euro', rate: 20.10 },
    { code: 'GBP', name: 'British Pound', rate: 23.40 },
    { code: 'AUD', name: 'Australian Dollar', rate: 12.30 },
    { code: 'CAD', name: 'Canadian Dollar', rate: 13.80 }
  ];

  const countries = [
    'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
    'Canada', 'Nigeria', 'Kenya', 'Ghana', 'Botswana', 'Namibia'
  ];

  const selectedCurrency = currencies.find(c => c.code === currency);
  const zarAmount = amount ? (parseFloat(amount) * (selectedCurrency?.rate || 1)).toFixed(2) : '0.00';

  const handleTransfer = async () => {
    if (!recipientName || !recipientCountry || !recipientAccount || !amount) {
      toast({ title: 'Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fees = parseFloat(amount) * 0.02; // 2% fee
      const { error } = await supabase.from('international_transfers').insert({
        user_id: user.id,
        recipient_name: recipientName,
        recipient_country: recipientCountry,
        recipient_bank: recipientBank,
        recipient_account: recipientAccount,
        swift_code: swiftCode,
        amount: parseFloat(amount),
        target_currency: currency,
        exchange_rate: selectedCurrency?.rate,
        fees,
        purpose,
        status: 'pending'
      });

      if (error) throw error;

      toast({ title: 'Success', description: 'International transfer initiated successfully!' });
      // Reset form
      setRecipientName('');
      setRecipientCountry('');
      setRecipientBank('');
      setRecipientAccount('');
      setSwiftCode('');
      setAmount('');
      setPurpose('');
    } catch (error) {
      toast({ title: 'Error', description: 'Transfer failed. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">International Transfer</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Send Money Worldwide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Recipient Name *</Label>
              <Input
                id="name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div>
              <Label>Recipient Country *</Label>
              <Select value={recipientCountry} onValueChange={setRecipientCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bank">Bank Name</Label>
              <Input
                id="bank"
                value={recipientBank}
                onChange={(e) => setRecipientBank(e.target.value)}
                placeholder="Bank name"
              />
            </div>

            <div>
              <Label htmlFor="account">Account Number *</Label>
              <Input
                id="account"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                placeholder="Account number"
              />
            </div>

            <div>
              <Label htmlFor="swift">SWIFT Code</Label>
              <Input
                id="swift"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                placeholder="SWIFT/BIC code"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {amount && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>You send:</span>
                  <span className="font-semibold">R {zarAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fees:</span>
                  <span>R {(parseFloat(zarAmount) * 0.02).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-1">
                  <span>Total:</span>
                  <span>R {(parseFloat(zarAmount) * 1.02).toFixed(2)}</span>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="purpose">Purpose of Transfer</Label>
              <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g., Family support, Business payment"
              />
            </div>

            <Button 
              onClick={handleTransfer} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Send Transfer'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};