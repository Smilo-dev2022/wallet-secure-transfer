// Moment.co API types
export interface MomentCustomer {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

export interface MomentPayment {
  id: string;
  customer_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  description?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

export interface CreateCustomerRequest {
  email: string;
  name: string;
  metadata?: Record<string, unknown>;
}

export interface CreatePaymentRequest {
  customer_id: string;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface MomentApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Transaction mapping from Moment to local format
export interface LocalTransaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: 'send' | 'receive' | 'deposit' | 'withdrawal';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  timestamp: Date;
  fromUserName?: string;
  toUserName?: string;
  momentPaymentId?: string;
}