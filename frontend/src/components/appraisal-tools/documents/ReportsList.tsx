import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const ReportsList = () => {
  const reports = [
    {
      id: '1',
      name: 'Commercial Property Appraisal - 123 Business St',
      type: 'Commercial',
      date: '2024-03-15',
      status: 'Final'
    },
    {
      id: '2',
      name: 'Retail Space Valuation - 456 Market Ave',
      type: 'Retail',
      date: '2024-03-14',
      status: 'Draft'
    },
    {
      id: '3',
      name: 'Office Building Assessment - 789 Corporate Blvd',
      type: 'Office',
      date: '2024-03-13',
      status: 'Under Review'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Final': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <select className="border rounded-md p-2">
            <option>All Types</option>
            <option>Commercial</option>
            <option>Retail</option>
            <option>Office</option>
          </select>
          <select className="border rounded-md p-2">
            <option>All Status</option>
            <option>Final</option>
            <option>Draft</option>
            <option>Under Review</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map(report => (
          <Card key={report.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">{report.name}</h3>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>{report.type}</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                  <Eye className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;