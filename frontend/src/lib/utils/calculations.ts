export const calculatePropertyValue = (
  comparables: Array<{ price: number; squareFeet: number }>,
  targetSquareFeet: number
): number => {
  const pricePerSquareFoot = comparables.reduce((sum, comp) => {
    return sum + comp.price / comp.squareFeet;
  }, 0) / comparables.length;

  return pricePerSquareFoot * targetSquareFeet;
};

export const calculateMortgage = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
};