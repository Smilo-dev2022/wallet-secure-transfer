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
  reference?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  sendMoney: (toUserId: string, amount: number, description: string) => Promise<boolean>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getAllTransactions: () => Transaction[];
  updateUserBalance: (userId: string, newBalance: number) => void;
  refreshBalance: () => Promise<void>;
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

      // Load transactions
      const { data: transactionData } = await supabase
        .from('transactions')
        .select('*')
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

  const sendMoney = async (toUserId: string, amount: number, description: string): Promise<boolean> => {
    if (!user || balance < amount) return false;

    try {
      // Create transaction record
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert({
          from_user_id: user.id,
          to_user_id: toUserId,
          amount,
          currency: 'ZAR',
          transaction_type: 'send',
          description,
          status: 'completed',
          reference: `TXN${Date.now()}`
        })
        .select()
        .single();

      if (error) throw error;

      // Update balances
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
      updateUserBalance,
      refreshBalance
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