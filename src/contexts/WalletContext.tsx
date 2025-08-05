import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'payment' | 'bill' | 'investment' | 'crypto';
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  fromUserId?: string;
  toUserId?: string;
  fromUserName?: string;
  toUserName?: string;
  reference?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  sendMoney: (toUserId: string, amount: number, description: string) => Promise<boolean>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getAllTransactions: () => Transaction[];
  getTransactionHistory: (filters?: {
    type?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }) => Transaction[];
  updateUserBalance: (userId: string, newBalance: number) => void;
  refreshBalance: () => Promise<void>;
  // Enhanced fraud prevention
  checkTransferLimits: (amount: number) => Promise<{ allowed: boolean; reason?: string }>;
  validateRecipient: (recipientId: string) => Promise<{ valid: boolean; user?: any }>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load user balance
      const { data: userData } = await supabase
        .from('users')
        .select('balance')
        .eq('id', user.id)
        .single();

      if (userData) {
        setBalance(userData.balance || 0);
      }

      // Load transactions with user names for better display
      const { data: transactionData } = await supabase
        .from('transactions')
        .select(`
          *,
          from_user:from_user_id(full_name),
          to_user:to_user_id(full_name)
        `)
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (transactionData) {
        const formattedTransactions = transactionData.map(t => ({
          id: t.id,
          type: t.transaction_type,
          amount: t.amount,
          currency: t.currency || 'ZAR',
          description: t.description || '',
          timestamp: t.created_at,
          status: t.status,
          fromUserId: t.from_user_id,
          toUserId: t.to_user_id,
          fromUserName: t.from_user?.full_name || 'Unknown',
          toUserName: t.to_user?.full_name || 'Unknown',
          reference: t.reference
        }));
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const refreshBalance = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('users')
        .select('balance')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  };

  // Enhanced fraud prevention - daily limits and balance checks
  const checkTransferLimits = async (amount: number): Promise<{ allowed: boolean; reason?: string }> => {
    if (!user) return { allowed: false, reason: 'User not authenticated' };

    // Check minimum transfer amount
    if (amount < 0.01) {
      return { allowed: false, reason: 'Minimum transfer amount is R0.01' };
    }

    // Check maximum single transfer amount (R50,000)
    if (amount > 50000) {
      return { allowed: false, reason: 'Maximum single transfer amount is R50,000' };
    }

    // Check sufficient balance
    if (amount > balance) {
      return { allowed: false, reason: 'Insufficient balance' };
    }

    try {
      // Check daily transfer limit (R100,000 per day)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data: todayTransactions } = await supabase
        .from('transactions')
        .select('amount')
        .eq('from_user_id', user.id)
        .eq('transaction_type', 'send')
        .eq('status', 'completed')
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString());

      const todayTotal = todayTransactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
      
      if (todayTotal + amount > 100000) {
        return { 
          allowed: false, 
          reason: `Daily limit exceeded. You have sent R${todayTotal.toFixed(2)} today. Daily limit is R100,000` 
        };
      }

      return { allowed: true };
    } catch (error) {
      console.error('Error checking transfer limits:', error);
      return { allowed: false, reason: 'Error validating transfer limits' };
    }
  };

  // Validate recipient exists and is not the sender
  const validateRecipient = async (recipientId: string): Promise<{ valid: boolean; user?: any }> => {
    if (!user) return { valid: false };

    if (recipientId === user.id) {
      return { valid: false };
    }

    try {
      const { data: recipientData } = await supabase
        .from('users')
        .select('id, full_name, email')
        .eq('id', recipientId)
        .single();

      if (recipientData) {
        return { valid: true, user: recipientData };
      }

      return { valid: false };
    } catch (error) {
      console.error('Error validating recipient:', error);
      return { valid: false };
    }
  };

  const sendMoney = async (toUserId: string, amount: number, description: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // Enhanced fraud prevention checks
      const limitsCheck = await checkTransferLimits(amount);
      if (!limitsCheck.allowed) {
        console.error('Transfer limit check failed:', limitsCheck.reason);
        return false;
      }

      const recipientCheck = await validateRecipient(toUserId);
      if (!recipientCheck.valid) {
        console.error('Invalid recipient');
        return false;
      }

      // Generate unique transaction reference
      const transactionReference = `TXN${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create transaction record with enhanced audit trail
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert({
          from_user_id: user.id,
          to_user_id: toUserId,
          amount,
          currency: 'ZAR',
          transaction_type: 'send',
          description: description || 'P2P Transfer',
          status: 'completed',
          reference: transactionReference,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Update balances using atomic transaction
      await supabase.rpc('transfer_funds', {
        from_user: user.id,
        to_user: toUserId,
        transfer_amount: amount
      });

      // Refresh local data
      await loadUserData();
      return true;
    } catch (error) {
      console.error('Send money error:', error);
      return false;
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    if (!user) return;

    try {
      await supabase.from('transactions').insert({
        from_user_id: user.id,
        to_user_id: transaction.toUserId,
        amount: transaction.amount,
        currency: transaction.currency,
        transaction_type: transaction.type,
        description: transaction.description,
        status: transaction.status,
        reference: transaction.reference
      });

      await loadUserData();
    } catch (error) {
      console.error('Add transaction error:', error);
    }
  };

  const getAllTransactions = () => transactions;

  const getTransactionHistory = (filters?: {
    type?: string;
    dateFrom?: Date;
    dateTo?: Date;
  }) => {
    let filtered = transactions;

    if (filters) {
      if (filters.type && filters.type !== 'all') {
        filtered = filtered.filter(t => t.type === filters.type);
      }

      if (filters.dateFrom) {
        filtered = filtered.filter(t => new Date(t.timestamp) >= filters.dateFrom!);
      }

      if (filters.dateTo) {
        filtered = filtered.filter(t => new Date(t.timestamp) <= filters.dateTo!);
      }
    }

    return filtered;
  };

  const updateUserBalance = async (userId: string, newBalance: number) => {
    try {
      await supabase
        .from('users')
        .update({ balance: newBalance })
        .eq('id', userId);
      
      if (userId === user?.id) {
        setBalance(newBalance);
      }
    } catch (error) {
      console.error('Update balance error:', error);
    }
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      sendMoney,
      addTransaction,
      getAllTransactions,
      getTransactionHistory,
      updateUserBalance,
      refreshBalance,
      checkTransferLimits,
      validateRecipient
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};