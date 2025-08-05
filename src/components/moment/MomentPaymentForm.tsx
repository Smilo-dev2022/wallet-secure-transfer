import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useMoment } from '@/contexts/MomentContext';
import { useToast } from '@/hooks/use-toast';

export const MomentPaymentForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const { createPayment, customer, isLoading } = useMoment();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer) {
      toast({
        title: 'Error',
        description: 'Customer not initialized',
        variant: 'destructive',
      });
      return;
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    
    const payment = await createPayment({
      customer_id: customer.id,
      amount: amountInCents,
      currency: 'USD',
      description: description || 'Payment via Moment',
    });

    if (payment) {
      toast({
        title: 'Success',
        description: 'Payment created successfully',
      });
      setAmount('');
      setDescription('');
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create payment',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Moment Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Payment description..."
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading || !amount || !customer}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Create Payment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};