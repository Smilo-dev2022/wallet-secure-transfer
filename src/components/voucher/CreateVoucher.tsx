import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useVoucher } from '@/contexts/VoucherContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send } from 'lucide-react';

interface CreateVoucherProps {
  onBack: () => void;
}

export const CreateVoucher: React.FC<CreateVoucherProps> = ({ onBack }) => {
  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createVoucher, sendVoucherSMS } = useVoucher();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCreateVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !value) return;

    setIsCreating(true);
    try {
      const voucher = await createVoucher(parseFloat(value), user.id);
      
      if (phone) {
        await sendVoucherSMS(phone, voucher.code);
        toast({
          title: "Voucher Created & Sent",
          description: `Voucher code ${voucher.code} sent to ${phone}`,
        });
      } else {
        toast({
          title: "Voucher Created",
          description: `Voucher code: ${voucher.code} (Value: R${voucher.value})`,
        });
      }
      
      setValue('');
      setPhone('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create voucher",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Create Voucher</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleCreateVoucher} className="space-y-4">
              <div>
                <Label htmlFor="value">Voucher Value (R)</Label>
                <Input
                  id="value"
                  type="number"
                  min="1"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 XX XXX XXXX"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty to get voucher code without SMS
                </p>
              </div>

              <Button
                type="submit"
                disabled={isCreating || !value}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isCreating ? (
                  "Creating..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Voucher
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};