// src/pages/tools/calculator.tsx
import { type NextPageWithLayout } from '@/types/next';
import ProtectedPage from '@/components/auth/ProtectedPage';
import ValueCalculator from 'src/components/appraisal-tools/ValueCalculator';

const CalculatorPage: NextPageWithLayout = () => {
  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Value Calculator</h1>
        <ValueCalculator />
      </div>
    </ProtectedPage>
  );
};

export default CalculatorPage;