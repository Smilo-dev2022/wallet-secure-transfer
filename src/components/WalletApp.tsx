import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { WalletDashboard } from './wallet/WalletDashboard';
import { SendMoney } from './wallet/SendMoney';
import { TransactionHistory } from './wallet/TransactionHistory';
import { CryptoPortfolio } from './crypto/CryptoPortfolio';
import { InvestmentDashboard } from './investment/InvestmentDashboard';
import { AIFinancialAdvisor } from './ai/AIFinancialAdvisor';
import { QRPayment } from './payments/QRPayment';
import { SecurityCenter } from './security/SecurityCenter';
import { BillPayments } from './bills/BillPayments';
import { InternationalTransfer } from './transfers/InternationalTransfer';
import { MerchantTools } from './merchant/MerchantTools';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

export function WalletApp() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ikasi-gradient">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">iKasi Wallet</h2>
          <p className="text-sm opacity-90">Powered by moment.io</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen ikasi-gradient flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl font-bold mb-2">iKasi Wallet</h1>
            <p className="text-lg opacity-90">The World's Best Digital Wallet</p>
            <p className="text-sm opacity-75 mt-2">Powered by moment.io</p>
          </div>
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<LoginForm />} />
          </Routes>
          <div className="text-center mt-6 text-white text-xs opacity-75">
            Support: help@ikasiwallet.africa | Admin: admin@ikasiwallet.africa
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<WalletDashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/history" element={<TransactionHistory />} />
        <Route path="/crypto" element={<CryptoPortfolio />} />
        <Route path="/investments" element={<InvestmentDashboard />} />
        <Route path="/ai-advisor" element={<AIFinancialAdvisor />} />
        <Route path="/qr-payment" element={<QRPayment />} />
        <Route path="/security" element={<SecurityCenter />} />
        <Route path="/bills" element={<BillPayments />} />
        <Route path="/international" element={<InternationalTransfer />} />
        <Route path="/merchant" element={<MerchantTools />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </AppLayout>
  );
}
