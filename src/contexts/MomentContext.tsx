import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { momentApi } from '../services/momentApi';
import { MomentCustomer, MomentPayment, CreatePaymentRequest } from '../types/moment';
import { useAuth } from './AuthContext';

interface MomentContextType {
  customer: MomentCustomer | null;
  payments: MomentPayment[];
  isLoading: boolean;
  error: string | null;
  createPayment: (paymentData: CreatePaymentRequest) => Promise<MomentPayment | null>;
  refreshPayments: () => Promise<void>;
  clearError: () => void;
}

const MomentContext = createContext<MomentContextType | undefined>(undefined);

export const MomentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [customer, setCustomer] = useState<MomentCustomer | null>(null);
  const [payments, setPayments] = useState<MomentPayment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPayments = useCallback(async () => {
    if (!customer) return;
    
    try {
      const paymentsData = await momentApi.getPayments(customer.id);
      setPayments(paymentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    }
  }, [customer]);

  const initializeCustomer = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to get existing customer or create new one
      const customerData = await momentApi.createCustomer({
        email: user.email,
        name: user.name,
        metadata: { localUserId: user.id, role: user.role }
      });
      
      setCustomer(customerData);
      await refreshPayments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize customer');
    } finally {
      setIsLoading(false);
    }
  }, [user, refreshPayments]);

  useEffect(() => {
    if (user) {
      initializeCustomer();
    }
  }, [user, initializeCustomer]);

  const createPayment = async (paymentData: CreatePaymentRequest): Promise<MomentPayment | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const payment = await momentApi.createPayment(paymentData);
      setPayments(prev => [payment, ...prev]);
      return payment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create payment');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <MomentContext.Provider value={{
      customer,
      payments,
      isLoading,
      error,
      createPayment,
      refreshPayments,
      clearError
    }}>
      {children}
    </MomentContext.Provider>
  );
};

export const useMoment = () => {
  const context = useContext(MomentContext);
  if (context === undefined) {
    throw new Error('useMoment must be used within a MomentProvider');
  }
  return context;
};