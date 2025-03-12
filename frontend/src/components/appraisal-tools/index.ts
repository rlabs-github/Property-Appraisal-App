// Layout Components
export { default as AppLayout } from 'src/components/layout/AppLayout';
export { default as AuthLayout } from 'src/components/layout/AuthLayout';
export { default as Header } from 'src/components/layout/Header';
export { default as Navigation } from 'src/components/layout/Navigation';
export { default as Sidebar } from 'src/components/layout/Sidebar';                    //"./" as relative path is not working, why?

// Form Components
export { default as FormBuilder } from './forms/FormBuilder';
export { default as FormFiller } from './forms/FormFiller';
export { default as FormTemplateBuilder } from './forms/FormTemplateBuilder';

// Document & Template Tools
export { TemplateBuilder } from 'src/components/appraisal-tools/templates/TemplateBuilder';
export { TemplatePreviewer } from 'src/components/appraisal-tools/templates/TemplatePreviewer';
export { TemplateSettings } from 'src/components/appraisal-tools/templates/TemplateSettings';
export { DocumentGenerator } from 'src/components/appraisal-tools/documents/DocumentGenerator';
export { DataMapper } from 'src/components/appraisal-tools/documents/DataMapper';
export { ExportSettings } from 'src/components/appraisal-tools/documents/ExportSettings';

// Auth Components
export { LoginForm } from 'src/components/auth/LoginForm';   //Check "./" as relative path is not working, why?
export { default as ProtectedRoute } from 'src/components/auth/ProtectedPage';     //Handles ProtectedRoutes

// Re-export UI components for convenience
export {
  Alert,
  AlertDescription,
  AlertTitle,
} from 'src/components/ui/alert'; //Not created

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