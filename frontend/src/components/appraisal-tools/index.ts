// Layout Components
export { default as AppLayout } from 'src/components/layout/AppLayout';
export { default as AuthLayout } from 'src/components/layout/AuthLayout';
export { default as Header } from 'src/components/layout/Header';
export { default as Navigation } from 'src/components/layout/Navigation';
export { default as Sidebar } from './layout/Sidebar';                    //"./" as relative path is not working, why?

// Form Components
export { default as FormBuilder } from './forms/FormBuilder';
export { default as FormFiller } from './forms/FormFiller';
export { default as FormTemplateBuilder } from './forms/FormTemplateBuilder';

// Document & Template Tools
export { default as TemplateBuilder } from 'src/components/appraisal-tools/templates/TemplateBuilder';
export { default as TemplatePreviewer } from 'src/components/appraisal-tools/templates/TemplatePreviewer';
export { default as TemplateSettings } from 'src/components/appraisal-tools/templates/TemplateSettings';
export { default as DocumentGenerator } from 'src/components/appraisal-tools/documents/DocumentGenerator';
export { default as DataMapper } from 'src/components/appraisal-tools/documents/DataMapper';
export { default as ExportSettings } from 'src/components/appraisal-tools/documents/ExportSettings';

// Auth Components
export { default as LoginForm } from 'src/components/auth/LoginForm';   //Check
export { default as ProtectedRoute } from './auth/ProtectedRoute';     //"./" as relative path is not working, why?

// Re-export UI components for convenience
export {
  Alert,
  AlertDescription,
  AlertTitle,
} from './ui/alert'; //Not created

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components//ui/select';

// Add more UI component exports as needed