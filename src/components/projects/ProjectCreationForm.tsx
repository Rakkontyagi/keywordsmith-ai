import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, FolderPlus } from "lucide-react";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  targetCountry: z.string().min(1, "Target country is required"),
  contentGoal: z.number().min(1, "Content goal must be at least 1"),
  timeline: z.string().min(1, "Timeline is required"),
  useTemplate: z.boolean().default(false),
  template: z.string().optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectCreationFormProps {
  onClose: () => void;
}

export function ProjectCreationForm({ onClose }: ProjectCreationFormProps) {
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      keywords: [],
      useTemplate: false
    }
  });

  const useTemplate = watch("useTemplate");

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      const newKeywords = [...keywords, keywordInput.trim()];
      setKeywords(newKeywords);
      setValue("keywords", newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    const newKeywords = keywords.filter(k => k !== keyword);
    setKeywords(newKeywords);
    setValue("keywords", newKeywords);
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      // TODO: Implement project creation
      console.log("Creating project:", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const templates = [
    { id: "ecommerce", name: "E-commerce SEO", description: "Product pages, category content, reviews" },
    { id: "blog", name: "Blog Content", description: "Article series, topic clusters, editorial calendar" },
    { id: "local", name: "Local Business", description: "Location pages, service areas, local SEO" },
    { id: "saas", name: "SaaS Marketing", description: "Feature pages, use cases, comparison content" },
    { id: "custom", name: "Custom Setup", description: "Start from scratch with your own configuration" }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FolderPlus className="h-6 w-6" />
          Create New Project
        </h2>
        <p className="text-muted-foreground">
          Set up a new content project with your target keywords and goals
        </p>
      </div>

      {/* Project Template */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="useTemplate"
              checked={useTemplate}
              onCheckedChange={(checked) => setValue("useTemplate", checked as boolean)}
            />
            <Label htmlFor="useTemplate" className="text-sm font-medium">
              Use a project template
            </Label>
          </div>
          <CardDescription>
            Start with a pre-configured template to speed up your project setup
          </CardDescription>
        </CardHeader>
        {useTemplate && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setValue("template", template.id)}
                >
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-muted-foreground">{template.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name *</Label>
          <Input
            id="name"
            placeholder="e.g., E-commerce SEO Campaign"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="blog">Blog/Content</SelectItem>
              <SelectItem value="local">Local Business</SelectItem>
              <SelectItem value="saas">SaaS/Software</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your project goals, target audience, and content strategy..."
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label>Target Keywords *</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter keyword and press Add"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
          />
          <Button type="button" onClick={addKeyword} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="gap-1">
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        {errors.keywords && (
          <p className="text-sm text-destructive">{errors.keywords.message}</p>
        )}
      </div>

      {/* Project Goals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="targetCountry">Target Country *</Label>
          <Select onValueChange={(value) => setValue("targetCountry", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">🇺🇸 United States</SelectItem>
              <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
              <SelectItem value="CA">🇨🇦 Canada</SelectItem>
              <SelectItem value="AU">🇦🇺 Australia</SelectItem>
              <SelectItem value="DE">🇩🇪 Germany</SelectItem>
              <SelectItem value="FR">🇫🇷 France</SelectItem>
            </SelectContent>
          </Select>
          {errors.targetCountry && (
            <p className="text-sm text-destructive">{errors.targetCountry.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contentGoal">Content Goal *</Label>
          <Input
            id="contentGoal"
            type="number"
            placeholder="50"
            {...register("contentGoal", { valueAsNumber: true })}
          />
          {errors.contentGoal && (
            <p className="text-sm text-destructive">{errors.contentGoal.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline *</Label>
          <Select onValueChange={(value) => setValue("timeline", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
          {errors.timeline && (
            <p className="text-sm text-destructive">{errors.timeline.message}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </form>
  );
}