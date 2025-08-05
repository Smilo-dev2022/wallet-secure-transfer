import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';

interface SendMoneyProps {
  onBack: () => void;
}

export const SendMoney: React.FC<SendMoneyProps> = ({ onBack }) => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationStep, setValidationStep] = useState<'input' | 'confirm' | 'processing'>('input');
  const [validatedRecipient, setValidatedRecipient] = useState<any>(null);
  const { balance, sendMoney, checkTransferLimits, validateRecipient } = useWallet();

  const validateTransfer = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!recipientId.trim()) {
      toast.error('Please enter recipient ID');
      return;
    }

    setIsLoading(true);
    
    try {
      // Check transfer limits
      const limitsCheck = await checkTransferLimits(amountNum);
      if (!limitsCheck.allowed) {
        toast.error(limitsCheck.reason || 'Transfer not allowed');
        setIsLoading(false);
        return;
      }

      // Validate recipient
      const recipientCheck = await validateRecipient(recipientId);
      if (!recipientCheck.valid) {
        toast.error('Invalid recipient ID. Please check and try again.');
        setIsLoading(false);
        return;
      }

      // All validation passed
      setValidatedRecipient(recipientCheck.user);
      setValidationStep('confirm');
    } catch (error) {
      toast.error('Validation error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmTransfer = async () => {
    setValidationStep('processing');
    setIsLoading(true);
    
    try {
      const amountNum = parseFloat(amount);
      const success = await sendMoney(recipientId, amountNum, description || 'P2P Transfer');
      
      if (success) {
        toast.success(`Successfully sent R${amountNum.toFixed(2)} to ${validatedRecipient?.full_name}`);
        setRecipientId('');
        setAmount('');
        setDescription('');
        setValidationStep('input');
        setValidatedRecipient(null);
        setTimeout(() => onBack(), 2000);
      } else {
        toast.error('Failed to send money. Please try again.');
        setValidationStep('confirm');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setValidationStep('confirm');
    } finally {
      setIsLoading(false);
    }
  };

  const resetValidation = () => {
    setValidationStep('input');
    setValidatedRecipient(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Send Money
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              P2P Transfer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-purple-600">
                R {balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Security Notice */}
            <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Security Limits</p>
                  <p className="text-yellow-700">
                    Daily limit: R100,000 • Max per transfer: R50,000 • Min: R0.01
                  </p>
                </div>
              </div>
            </div>

            {validationStep === 'input' && (
              <form onSubmit={(e) => { e.preventDefault(); validateTransfer(); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientId">Recipient ID</Label>
                  <Input
                    id="recipientId"
                    type="text"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    placeholder="Enter recipient's user ID"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Demo IDs: 1 (Admin), 2 (Agent), 3 (User)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (ZAR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={Math.min(balance, 50000)}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's this payment for?"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Validating...' : 'Validate Transfer'}
                </Button>
              </form>
            )}

            {validationStep === 'confirm' && validatedRecipient && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Transfer Validated</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">To:</span> {validatedRecipient.full_name}</p>
                    <p><span className="font-medium">Amount:</span> R{parseFloat(amount).toFixed(2)}</p>
                    <p><span className="font-medium">Description:</span> {description || 'P2P Transfer'}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={resetValidation}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={confirmTransfer}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Confirm Transfer'}
                  </Button>
                </div>
              </div>
            )}

            {validationStep === 'processing' && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Processing your transfer...</p>
                <p className="text-sm text-gray-500">Please don't close this window</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};