// services/forms/calculation.service.ts
export class CalculationService {
  evaluateFormula(formula: string, context: any): number {
      console.log(`Evaluating formula: ${formula}`);
      try {
          const sanitizedFormula = formula.replace(/\{(\w+)\}/g, (_, key) => context[key] || 0);
          // eslint-disable-next-line no-eval
          return eval(sanitizedFormula);
      } catch (error) {
          throw new Error(`Formula evaluation error: ${error.message}`);
      }
  }

  validateCalculation(calculation: string): boolean {
      console.log(`Validating calculation: ${calculation}`);
      return /^[0-9+\-*/().\s]+$/.test(calculation);
  }
}
