import { AppraisalService } from '../../../src/services/appraisal';

describe('AppraisalService', () => {
  let appraisalService: AppraisalService;

  beforeEach(() => {
    appraisalService = new AppraisalService();
  });

  it('should calculate property value correctly', () => {
    const result = appraisalService.calculateValue({
      squareFeet: 2000,
      pricePerFoot: 200
    });

    expect(result).toBe(400000);
  });
});