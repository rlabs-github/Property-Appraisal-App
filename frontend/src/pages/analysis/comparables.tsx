// src/pages/analysis/comparables.tsx
import { type NextPage } from 'next';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import ComparablesAnalysis from '@/components/analysis/ComparablesAnalysis';

const ComparablesPage: NextPage = () => {
  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Comparable Properties</h1>
        <ComparablesAnalysis />
      </div>
    </ProtectedPage>
  );
};

export default ComparablesPage;