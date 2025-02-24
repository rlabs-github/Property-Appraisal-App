// src/pages/analysis/trends.tsx
import { type NextPageWithLayout } from '@/types/next';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import MarketTrends from '@/components/analysis/MarketTrends';

const TrendsPage: NextPageWithLayout = () => {
  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Market Trends Analysis</h1>
        <MarketTrends />
      </div>
    </ProtectedPage>
  );
};

export default TrendsPage;