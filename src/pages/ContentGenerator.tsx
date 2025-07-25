import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ContentGenerationForm } from "@/components/content/ContentGenerationForm";

export default function ContentGenerator() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create SEO-optimized content with AI assistance
          </p>
        </div>
        
        <ContentGenerationForm />
      </div>
    </DashboardLayout>
  );
}