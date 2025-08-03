import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

export interface Voucher {
  id: string;
  code: string;
  amount: number;
  currency: string;
  expiryDate: string;
  isRedeemed: boolean;
  createdBy: string;
  redeemedBy?: string;
  redeemedAt?: string;
}

interface VoucherContextType {
  vouchers: Voucher[];
  createVoucher: (amount: number, expiryHours: number) => Promise<Voucher | null>;
  redeemVoucher: (code: string) => Promise<boolean>;
  sendVoucherSMS: (phone: string, code: string) => Promise<boolean>;
  getUserVouchers: () => Promise<void>;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

export const VoucherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const { user } = useAuth();

  const generateVoucherCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const createVoucher = async (amount: number, expiryHours: number): Promise<Voucher | null> => {
    if (!user) return null;

    try {
      const code = generateVoucherCode();
      const expiryDate = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString();

      const { data, error } = await supabase
        .from('vouchers')
        .insert({
          code,
          amount,
          currency: 'ZAR',
          expiry_date: expiryDate,
          created_by: user.id,
          is_redeemed: false
        })
        .select()
        .single();

      if (error) throw error;

      const newVoucher: Voucher = {
        id: data.id,
        code: data.code,
        amount: data.amount,
        currency: data.currency,
        expiryDate: data.expiry_date,
        isRedeemed: data.is_redeemed,
        createdBy: data.created_by
      };

      setVouchers(prev => [...prev, newVoucher]);
      return newVoucher;
    } catch (error) {
      console.error('Create voucher error:', error);
      return null;
    }
  };

  const redeemVoucher = async (code: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data: voucher, error } = await supabase
        .from('vouchers')
        .select('*')
        .eq('code', code)
        .eq('is_redeemed', false)
        .single();

      if (error || !voucher) return false;

      // Check if voucher is expired
      if (new Date(voucher.expiry_date) < new Date()) return false;

      // Update voucher as redeemed
      await supabase
        .from('vouchers')
        .update({
          is_redeemed: true,
          redeemed_by: user.id,
          redeemed_at: new Date().toISOString()
        })
        .eq('id', voucher.id);

      // Add amount to user balance
      await supabase
        .from('users')
        .update({
          balance: user.balance + voucher.amount
        })
        .eq('id', user.id);

      // Create transaction record
      await supabase.from('transactions').insert({
        to_user_id: user.id,
        amount: voucher.amount,
        currency: voucher.currency,
        transaction_type: 'voucher',
        description: `Voucher redeemed: ${code}`,
        status: 'completed',
        reference: code
      });

      await getUserVouchers();
      return true;
    } catch (error) {
      console.error('Redeem voucher error:', error);
      return false;
    }
  };

  const sendVoucherSMS = async (phone: string, code: string): Promise<boolean> => {
    try {
      // In production, integrate with Twilio or SMS service
      console.log(`SMS sent to ${phone}: Your iKasi Wallet voucher code is: ${code}`);
      
      // Simulate SMS sending delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('SMS sending error:', error);
      return false;
    }
  };

  const getUserVouchers = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('vouchers')
        .select('*')
        .or(`created_by.eq.${user.id},redeemed_by.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedVouchers = data.map(v => ({
        id: v.id,
        code: v.code,
        amount: v.amount,
        currency: v.currency,
        expiryDate: v.expiry_date,
        isRedeemed: v.is_redeemed,
        createdBy: v.created_by,
        redeemedBy: v.redeemed_by,
        redeemedAt: v.redeemed_at
      }));

      setVouchers(formattedVouchers);
    } catch (error) {
      console.error('Get vouchers error:', error);
    }
  };

  return (
    <VoucherContext.Provider value={{
      vouchers,
      createVoucher,
      redeemVoucher,
      sendVoucherSMS,
      getUserVouchers
    }}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucher = () => {
  const context = useContext(VoucherContext);
  if (context === undefined) {
    throw new Error('useVoucher must be used within a VoucherProvider');
  }
  return context;
};