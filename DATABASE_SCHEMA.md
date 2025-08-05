# Database Schema for P2P Payments

This document outlines the required database schema for the iKasi Wallet P2P payment system.

## Required Tables

### 1. Users Table (`users`)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'agent', 'admin')),
    balance DECIMAL(15,2) DEFAULT 0.00 CHECK (balance >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Transactions Table (`transactions`)
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user_id UUID REFERENCES users(id),
    to_user_id UUID REFERENCES users(id),
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) DEFAULT 'ZAR',
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('send', 'receive', 'payment', 'bill', 'investment', 'crypto')),
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    reference VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Required Database Functions

### 1. Transfer Funds Function
```sql
CREATE OR REPLACE FUNCTION transfer_funds(
    from_user UUID,
    to_user UUID,
    transfer_amount DECIMAL(15,2)
) RETURNS BOOLEAN AS $$
BEGIN
    -- Check if sender has sufficient balance
    IF (SELECT balance FROM users WHERE id = from_user) < transfer_amount THEN
        RAISE EXCEPTION 'Insufficient balance';
        RETURN FALSE;
    END IF;
    
    -- Perform atomic transfer
    UPDATE users SET 
        balance = balance - transfer_amount,
        updated_at = NOW()
    WHERE id = from_user;
    
    UPDATE users SET 
        balance = balance + transfer_amount,
        updated_at = NOW()
    WHERE id = to_user;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

## Security Features Implemented

### Fraud Prevention
- **Daily Transfer Limits**: R100,000 per day per user
- **Maximum Single Transfer**: R50,000 per transaction
- **Minimum Transfer**: R0.01
- **Balance Validation**: Ensures sufficient funds before transfer
- **Recipient Validation**: Verifies recipient exists and is not the sender

### Audit Trail
Every P2P transfer is recorded with:
- **Sender ID** (`from_user_id`)
- **Receiver ID** (`to_user_id`)
- **Amount** (with 2 decimal precision)
- **Timestamp** (`created_at`)
- **Unique Transaction ID** (`reference`)
- **Description** (optional)
- **Status** (pending/completed/failed)

### Transaction Flow
1. User A initiates transfer through UI
2. System validates transfer limits and recipient
3. System creates transaction record
4. System performs atomic balance update using `transfer_funds` function
5. Transaction is marked as completed
6. Both users' balances are updated in real-time

## Settlement Layer
The system keeps all P2P transfers internal to the database unless:
- User requests withdrawal to bank account
- User makes merchant payment
- User tops up from bank card/EFT

This approach minimizes external API costs and maintains fast internal transfers.