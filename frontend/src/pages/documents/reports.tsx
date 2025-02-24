// src/pages/documents/reports.tsx
import { type NextPageWithLayout } from '@/types/next';
import { ProtectedPage } from '@/components/auth/ProtectedPage';
import ReportsList from '@/components/appraisal-tools/documents/ReportsList';

const ReportsPage: NextPageWithLayout = () => {
  return (
    <ProtectedPage>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Generated Reports</h1>
        <ReportsList />
      </div>
    </ProtectedPage>
  );
};

export default ReportsPage;