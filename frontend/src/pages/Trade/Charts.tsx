import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LineChart } from 'lucide-react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { PriceChart } from '../../components/trade/PriceChart';
import { usePriceHistory } from '../../hooks/usePriceSeries';

export function Charts() {
  const [selectedToken, setSelectedToken] = useState<'TIME' | 'TRAV'>('TIME');
  const { data: priceData, isLoading } = usePriceHistory(selectedToken);

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Price Charts"
        subtitle="View real-time price charts for TIME AI and TRAV AI tokens"
        icon={<LineChart className="w-8 h-8" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>Token Price Charts</CardTitle>
          <CardDescription>24-hour price movement and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'TIME' | 'TRAV')}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="TIME">TIME AI</TabsTrigger>
              <TabsTrigger value="TRAV">TRAV AI</TabsTrigger>
            </TabsList>

            <TabsContent value="TIME" className="mt-6">
              {priceData && <PriceChart data={priceData} token="TIME" isLoading={isLoading} />}
            </TabsContent>

            <TabsContent value="TRAV" className="mt-6">
              {priceData && <PriceChart data={priceData} token="TRAV" isLoading={isLoading} />}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
