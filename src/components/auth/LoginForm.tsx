import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('admin@ikasi.com');
  const [password, setPassword] = useState('password');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, simulate successful login
    if ((email === 'admin@ikasi.com' || email === 'agent@ikasi.com' || email === 'user@ikasi.com') && password === 'password') {
      // Create a mock user session
      const mockUser = {
        id: '123',
        email: email,
        user_metadata: { role: email.includes('admin') ? 'admin' : email.includes('agent') ? 'agent' : 'user' }
      };
      localStorage.setItem('supabase.auth.token', JSON.stringify(mockUser));
      toast.success('Login successful!');
      window.location.reload();
    } else {
      toast.error('Invalid credentials. Try: admin@ikasi.com / password');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          iKasi Wallet
        </CardTitle>
        <CardDescription>Sign in to your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={onToggleMode} className="text-sm">
            Don't have an account? Sign up
          </Button>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs">
          <p className="font-semibold">Demo Accounts:</p>
          <p>Admin: admin@ikasi.com / password</p>
          <p>Agent: agent@ikasi.com / password</p>
          <p>User: user@ikasi.com / password</p>
        </div>
      </CardContent>
    </Card>
  );
};