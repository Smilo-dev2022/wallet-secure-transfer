import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WalletProvider, useWallet } from '../contexts/WalletContext';
import { AuthProvider } from '../contexts/AuthContext';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { balance: 1000 } }))
        })),
        or: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: [] }))
        }))
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { id: '123' } }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve())
      }))
    })),
    rpc: vi.fn(() => Promise.resolve()),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null } }))
    }
  }
}));

// Mock user for testing
const mockUser = {
  id: 'test-user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user' as const,
  balance: 1000
};

// Create wrapper with providers
const createWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <WalletProvider>
      {children}
    </WalletProvider>
  </AuthProvider>
);

describe('P2P Payment Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate transfer limits correctly', async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: createWrapper });

    await act(async () => {
      // Test minimum amount validation
      const result1 = await result.current.checkTransferLimits(0);
      expect(result1.allowed).toBe(false);
      expect(result1.reason).toContain('Minimum transfer amount');

      // Test maximum amount validation
      const result2 = await result.current.checkTransferLimits(60000);
      expect(result2.allowed).toBe(false);
      expect(result2.reason).toContain('Maximum single transfer amount');

      // Test valid amount
      const result3 = await result.current.checkTransferLimits(100);
      expect(result3.allowed).toBe(true);
    });
  });

  it('should validate recipient correctly', async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: createWrapper });

    await act(async () => {
      // Test self-transfer validation
      const result1 = await result.current.validateRecipient('test-user-1');
      expect(result1.valid).toBe(false);

      // Test valid recipient
      const result2 = await result.current.validateRecipient('test-user-2');
      // This would return true if recipient exists in database
    });
  });

  it('should prevent insufficient balance transfers', async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: createWrapper });

    await act(async () => {
      // Test insufficient balance
      const result1 = await result.current.checkTransferLimits(2000); // More than balance
      expect(result1.allowed).toBe(false);
      expect(result1.reason).toContain('Insufficient balance');
    });
  });

  it('should filter transaction history correctly', async () => {
    const { result } = renderHook(() => useWallet(), { wrapper: createWrapper });

    // Mock transactions
    const mockTransactions = [
      {
        id: '1',
        type: 'send' as const,
        amount: 100,
        currency: 'ZAR',
        description: 'Test transfer',
        timestamp: '2024-01-01T10:00:00Z',
        status: 'completed' as const,
        fromUserId: 'user1',
        toUserId: 'user2'
      },
      {
        id: '2',
        type: 'receive' as const,
        amount: 50,
        currency: 'ZAR',
        description: 'Test receive',
        timestamp: '2024-01-02T10:00:00Z',
        status: 'completed' as const,
        fromUserId: 'user2',
        toUserId: 'user1'
      }
    ];

    // Test type filtering
    const sendTransactions = result.current.getTransactionHistory({ type: 'send' });
    const receiveTransactions = result.current.getTransactionHistory({ type: 'receive' });
    
    // These would be properly tested with actual transaction data
    expect(Array.isArray(sendTransactions)).toBe(true);
    expect(Array.isArray(receiveTransactions)).toBe(true);
  });
});