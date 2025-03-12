// src/pages/properties/index.tsx
import { useProperties } from '@/hooks/useProperties';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function PropertiesPage() {
  const properties = [
    { id: 1, name: 'Commercial Property #1', address: '123 Business Ave', status: 'In Progress' },
    { id: 2, name: 'Commercial Property #2', address: '123 Business Ave', status: 'In Progress' },
    { id: 3, name: 'Commercial Property #3', address: '123 Business Ave', status: 'In Progress' },
    // ... other properties
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Properties</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {properties.map(property => (
          <Card key={property.id} className="hover:border-blue-500 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-lg font-medium">{property.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm mb-2">{property.address}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-500 text-sm">{property.status}</span>
                <Link href={`/properties/${property.id}`} className="text-blue-500 text-sm">
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}