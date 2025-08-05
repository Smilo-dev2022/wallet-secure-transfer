import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Smartphone, Eye, ArrowLeft, CheckCircle } from 'lucide-react';

interface SecurityCenterProps {
  onBack: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    twoFactor: true,
    biometric: false,
    notifications: true,
    loginAlerts: true,
    transactionLimits: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const securityScore = Object.values(settings).filter(Boolean).length * 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Security Center
          </h1>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{securityScore}%</div>
              <div>
                <Badge className="bg-white/20">
                  {securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Good' : 'Needs Improvement'}
                </Badge>
                <p className="text-sm text-white/80 mt-1">
                  Your wallet security level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">SMS & Email Verification</p>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {settings.twoFactor && <CheckCircle className="h-4 w-4 text-green-500" />}
                  <Switch
                    checked={settings.twoFactor}
                    onCheckedChange={() => toggleSetting('twoFactor')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Biometric Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Fingerprint & Face ID</p>
                  <p className="text-sm text-gray-600">
                    Use your device's biometric features for quick access
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {settings.biometric && <CheckCircle className="h-4 w-4 text-green-500" />}
                  <Switch
                    checked={settings.biometric}
                    onCheckedChange={() => toggleSetting('biometric')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Security Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-gray-600">
                      Get notified of new device logins
                    </p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={() => toggleSetting('loginAlerts')}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Transaction Notifications</p>
                    <p className="text-sm text-gray-600">
                      Instant alerts for all transactions
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={() => toggleSetting('notifications')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">Daily Spending Limits</p>
                  <p className="text-sm text-gray-600">
                    Set maximum daily transaction amounts
                  </p>
                </div>
                <Switch
                  checked={settings.transactionLimits}
                  onCheckedChange={() => toggleSetting('transactionLimits')}
                />
              </div>
              
              {settings.transactionLimits && (
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span>Daily Send Limit:</span>
                    <Badge>R 10,000</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Limit:</span>
                    <Badge>R 50,000</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Modify Limits
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};