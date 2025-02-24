// src/pages/properties/[id].tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const tabs = ['Overview', 'Property Details', 'Valuation', 'Documents', 'Review'];
  const [activeTab, setActiveTab] = useState('Overview');

  // Mock data - replace with actual API call
  const property = {
    id: id,
    name: `Commercial Property #${id}`,
    address: '123 Business Ave',
    status: 'In Progress',
    details: {
      size: '10,000 sq ft',
      type: 'Commercial',
      yearBuilt: '2010',
      lastValuation: '$2,500,000'
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{property.name}</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit Property
          </button>
        </div>
      </div>

      <div className="mb-6 border-b">
        <nav className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                tab === activeTab 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Property Details</h3>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Address</dt>
                <dd>{property.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Size</dt>
                <dd>{property.details.size}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Type</dt>
                <dd>{property.details.type}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Year Built</dt>
                <dd>{property.details.yearBuilt}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Last Valuation</dt>
                <dd>{property.details.lastValuation}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Add more cards for other property information based on active tab */}
      </div>
    </div>
  );
}