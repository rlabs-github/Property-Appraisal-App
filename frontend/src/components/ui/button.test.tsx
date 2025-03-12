import { render, screen, fireEvent } from 'src/tests/utils/test-utils';
import FormBuilder from '../appraisal-tools/forms/FormBuilder';

describe('FormBuilder', () => {
  it('should render empty form builder initially', () => {
    render(<FormBuilder />);
    
    expect(screen.getByText('Field Types')).toBeInTheDocument();
    expect(screen.getByText('Add Field')).toBeInTheDocument();
  });

  it('should add new text field when clicked', async () => {
    render(<FormBuilder />);
    
    fireEvent.click(screen.getByText('Text Field'));
    
    expect(screen.getByText('New text field')).toBeInTheDocument();
  });
});