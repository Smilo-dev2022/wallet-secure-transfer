import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { TrendingUp, TrendingDown, Plus, ArrowLeft } from 'lucide-react';

interface CryptoHolding {
  id: string;
  symbol: string;
  amount: number;
  averageBuyPrice: number;
  currentPrice?: number;
  change24h?: number;
}

interface CryptoPortfolioProps {
  onBack: () => void;
}

export const CryptoPortfolio: React.FC<CryptoPortfolioProps> = ({ onBack }) => {
  const [holdings, setHoldings] = useState<CryptoHolding[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const { data: cryptoData } = await supabase
        .from('crypto_holdings')
        .select('*');

      if (cryptoData) {
        const symbols = cryptoData.map(h => h.symbol.toLowerCase()).join(',');
        
        const { data: priceData } = await supabase.functions.invoke('crypto-prices', {
          body: { symbols: symbols.split(',') }
        });

        const enrichedHoldings = cryptoData.map(holding => ({
          id: holding.id,
          symbol: holding.symbol,
          amount: holding.amount,
          averageBuyPrice: holding.average_buy_price,
          currentPrice: priceData?.[holding.symbol.toLowerCase()]?.usd || 0,
          change24h: priceData?.[holding.symbol.toLowerCase()]?.usd_24h_change || 0
        }));

        setHoldings(enrichedHoldings);
        setTotalValue(enrichedHoldings.reduce((sum, h) => sum + (h.amount * (h.currentPrice || 0)), 0));
      }
    } catch (error) {
      console.error('Error fetching crypto holdings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Crypto Portfolio
          </h1>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <CardHeader>
            <CardTitle>Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {holdings.map((holding) => {
            const currentValue = holding.amount * (holding.currentPrice || 0);
            const totalCost = holding.amount * holding.averageBuyPrice;
            const profitLoss = currentValue - totalCost;
            const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

            return (
              <Card key={holding.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{holding.symbol.toUpperCase()}</h3>
                      <p className="text-gray-600">{holding.amount} coins</p>
                      <p className="text-sm text-gray-500">
                        Avg. Buy: ${holding.averageBuyPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${(holding.currentPrice || 0).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        {(holding.change24h || 0) >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <Badge variant={profitLoss >= 0 ? 'default' : 'destructive'}>
                          {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)} ({profitLossPercent.toFixed(1)}%)
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {holdings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">No crypto holdings yet</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Buy Crypto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};