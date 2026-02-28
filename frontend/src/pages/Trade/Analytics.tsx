import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { MarketOverviewSection } from '../../components/trade/analytics/MarketOverviewSection';
import { OrderFlowDepthSection } from '../../components/trade/analytics/OrderFlowDepthSection';
import { SupplyHoldersSection } from '../../components/trade/analytics/SupplyHoldersSection';
import { TokenEconomyHealthSection } from '../../components/trade/analytics/TokenEconomyHealthSection';
import { RevenueFeesSection } from '../../components/trade/analytics/RevenueFeesSection';
import { ComplianceAuditSection } from '../../components/trade/analytics/ComplianceAuditSection';
import { PriceChart } from '../../components/trade/PriceChart';
import { usePriceHistory } from '../../hooks/usePriceSeries';

export function Analytics() {
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV'>('TIME');
  const { data: priceData } = usePriceHistory(selectedToken);

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Analytics Dashboard"
        subtitle="Comprehensive token analytics and market insights"
        icon={<BarChart3 className="w-8 h-8" />}
      />

      <Tabs value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'TIME' | 'TRAV')} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="TIME">TIME AI</TabsTrigger>
          <TabsTrigger value="TRAV">TRAV AI</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedToken} className="space-y-6">
          {/* Market Overview */}
          <MarketOverviewSection token={selectedToken} />

          {/* Price Chart */}
          {priceData && <PriceChart data={priceData} token={selectedToken} />}

          {/* Order Flow & Depth */}
          <OrderFlowDepthSection token={selectedToken} />

          {/* Supply & Holders */}
          <SupplyHoldersSection token={selectedToken} />

          {/* Token Economy Health */}
          <TokenEconomyHealthSection token={selectedToken} />

          {/* Revenue & Fees */}
          <RevenueFeesSection />

          {/* Compliance & Audit */}
          <ComplianceAuditSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
