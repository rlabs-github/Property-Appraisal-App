import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ValueCalculator = () => {
  const [inputs, setInputs] = useState({
    rentalIncome: '',
    occupancyRate: '',
    operatingExpenses: '',
    capRate: ''
  });

  const [result, setResult] = useState({
    noi: 0,
    propertyValue: 0
  });

  const calculate = () => {
    const annualRent = parseFloat(inputs.rentalIncome) * 12;
    const effectiveIncome = annualRent * (parseFloat(inputs.occupancyRate) / 100);
    const expenses = parseFloat(inputs.operatingExpenses) * 12;
    const noi = effectiveIncome - expenses;
    const propertyValue = (noi / (parseFloat(inputs.capRate) / 100));

    setResult({
      noi: noi,
      propertyValue: propertyValue
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-blue-500" />
            <CardTitle>Input Parameters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Rental Income ($)
            </label>
            <input
              type="number"
              value={inputs.rentalIncome}
              onChange={(e) => handleInputChange('rentalIncome', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter monthly rental income"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occupancy Rate (%)
            </label>
            <input
              type="number"
              value={inputs.occupancyRate}
              onChange={(e) => handleInputChange('occupancyRate', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter occupancy rate"
              min="0"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Operating Expenses ($)
            </label>
            <input
              type="number"
              value={inputs.operatingExpenses}
              onChange={(e) => handleInputChange('operatingExpenses', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter monthly expenses"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capitalization Rate (%)
            </label>
            <input
              type="number"
              value={inputs.capRate}
              onChange={(e) => handleInputChange('capRate', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter cap rate"
              step="0.1"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Calculate Value
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Net Operating Income (NOI)
              </label>
              <div className="text-2xl font-semibold text-blue-600">
                ${result.noi.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estimated Property Value
              </label>
              <div className="text-2xl font-semibold text-blue-600">
                ${result.propertyValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueCalculator;