import React from 'react';
import { MapPin, Building2, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ComparablesAnalysis = () => {
  const comparables = [
    {
      id: '1',
      address: '123 Business Ave',
      type: 'Office Building',
      size: 25000,
      price: 5200000,
      pricePerSqFt: 208,
      yearBuilt: 2015,
      distance: 0.8
    },
    {
      id: '2',
      address: '456 Commerce St',
      type: 'Retail Space',
      size: 18000,
      price: 4100000,
      pricePerSqFt: 227,
      yearBuilt: 2018,
      distance: 1.2
    },
    {
      id: '3',
      address: '789 Market Blvd',
      type: 'Mixed Use',
      size: 22000,
      price: 4800000,
      pricePerSqFt: 218,
      yearBuilt: 2016,
      distance: 1.5
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <select className="border rounded-md p-2">
            <option>All Property Types</option>
            <option>Office</option>
            <option>Retail</option>
            <option>Mixed Use</option>
          </select>
          <select className="border rounded-md p-2">
            <option>Within 2 miles</option>
            <option>Within 5 miles</option>
            <option>Within 10 miles</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Comparable
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1">
        {comparables.map(comp => (
          <Card key={comp.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">{comp.address}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{comp.type}</span>
                    <span>{comp.size.toLocaleString()} sq ft</span>
                    <span>Built {comp.yearBuilt}</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{comp.distance} miles away</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold">
                    ${comp.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    ${comp.pricePerSqFt}/sq ft
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Price Difference</div>
                  <div className="flex items-center text-green-600">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    <span>+2.5%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Size Difference</div>
                  <div className="flex items-center text-blue-600">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    <span>-5.8%</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Age Difference</div>
                  <div className="flex items-center text-gray-600">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    <span>+2 years</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComparablesAnalysis;