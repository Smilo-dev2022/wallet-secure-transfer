import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { TrendingUp, PieChart, Target, ArrowLeft, Plus } from 'lucide-react';

interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  riskLevel: string;
  allocation: { asset: string; percentage: number; value: number }[];
}

interface InvestmentDashboardProps {
  onBack: () => void;
}

export const InvestmentDashboard: React.FC<InvestmentDashboardProps> = ({ onBack }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalInvestments, setTotalInvestments] = useState(0);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const { data } = await supabase
        .from('investment_portfolios')
        .select('*');

      if (data) {
        // Add allocation data for display
        const enrichedPortfolios = data.map(portfolio => ({
          ...portfolio,
          allocation: [
            { asset: 'Stocks', percentage: 60, value: portfolio.total_value * 0.6 },
            { asset: 'Bonds', percentage: 30, value: portfolio.total_value * 0.3 },
            { asset: 'Crypto', percentage: 10, value: portfolio.total_value * 0.1 }
          ]
        }));

        setPortfolios(enrichedPortfolios);
        setTotalInvestments(data.reduce((sum, p) => sum + p.total_value, 0));
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'conservative': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'aggressive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
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
            Investment Dashboard
          </h1>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Total Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              R {totalInvestments.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20">
                +12.5% this month
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Investment Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Emergency Fund</span>
                    <span>R 25,000 / R 50,000</span>
                  </div>
                  <Progress value={50} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Retirement</span>
                    <span>R 150,000 / R 1,000,000</span>
                  </div>
                  <Progress value={15} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Stocks</span>
                  <Badge>60%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bonds</span>
                  <Badge variant="secondary">30%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Crypto</span>
                  <Badge variant="outline">10%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{portfolio.name}</CardTitle>
                  <Badge className={getRiskColor(portfolio.riskLevel)}>
                    {portfolio.riskLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold">
                    R {portfolio.totalValue.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    +8.2%
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {portfolio.allocation.map((asset) => (
                    <div key={asset.asset} className="text-center">
                      <p className="text-sm text-gray-600">{asset.asset}</p>
                      <p className="font-semibold">{asset.percentage}%</p>
                      <p className="text-sm">R {asset.value.toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {portfolios.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 mb-4">No investment portfolios yet</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Portfolio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};