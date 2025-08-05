import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QrCode, Camera, ArrowLeft, Scan } from 'lucide-react';

interface QRPaymentProps {
  onBack: () => void;
}

export const QRPayment: React.FC<QRPaymentProps> = ({ onBack }) => {
  const [mode, setMode] = useState<'generate' | 'scan'>('generate');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrData, setQrData] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateQR = () => {
    if (!amount) return;
    
    const paymentData = {
      type: 'payment_request',
      amount: parseFloat(amount),
      description,
      timestamp: Date.now(),
      recipient: 'current_user_id'
    };
    
    setQrData(JSON.stringify(paymentData));
  };

  const handleScan = () => {
    fileInputRef.current?.click();
  };

  const QRCodeDisplay = ({ data }: { data: string }) => (
    <div className="flex items-center justify-center p-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
      <div className="text-center">
        <QrCode className="h-32 w-32 mx-auto mb-4 text-purple-600" />
        <p className="text-sm text-gray-600">QR Code Generated</p>
        <p className="text-xs text-gray-500 mt-2">Show this to the payer</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            QR Payments
          </h1>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            variant={mode === 'generate' ? 'default' : 'outline'}
            onClick={() => setMode('generate')}
            className="flex-1"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Generate QR
          </Button>
          <Button
            variant={mode === 'scan' ? 'default' : 'outline'}
            onClick={() => setMode('scan')}
            className="flex-1"
          >
            <Scan className="h-4 w-4 mr-2" />
            Scan QR
          </Button>
        </div>

        {mode === 'generate' && (
          <Card>
            <CardHeader>
              <CardTitle>Generate Payment QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (ZAR)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this payment for?"
                />
              </div>

              <Button onClick={generateQR} disabled={!amount} className="w-full">
                Generate QR Code
              </Button>

              {qrData && (
                <div className="mt-6">
                  <QRCodeDisplay data={qrData} />
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Amount:</span>
                      <Badge>R {parseFloat(amount).toFixed(2)}</Badge>
                    </div>
                    {description && (
                      <div className="flex justify-between items-center mt-2">
                        <span>Description:</span>
                        <span className="text-sm text-gray-600">{description}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {mode === 'scan' && (
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code to Pay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Position QR code in camera view</p>
                <Button onClick={handleScan}>
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    // Handle QR code scanning from image
                    console.log('File selected:', e.target.files?.[0]);
                  }}
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Or upload an image containing a QR code
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};