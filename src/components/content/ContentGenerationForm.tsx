import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { LocationSelector } from "./LocationSelector";
import { KeywordInput } from "./KeywordInput";
import { GenerationProgress } from "./GenerationProgress";
import { 
  Sparkles, 
  Target, 
  FileText, 
  Globe,
  Users,
  Zap,
  ArrowRight
} from "lucide-react";
import { ContentGenerationForm as FormData } from "@/types";

const formSchema = z.object({
  keyword: z.string().min(1, "Keyword is required"),
  location: z.string().min(1, "Location is required"),
  contentType: z.enum(['blog', 'article', 'landing-page', 'product-description']),
  wordCount: z.number().min(300, "Minimum 300 words").max(5000, "Maximum 5000 words"),
  tone: z.enum(['professional', 'casual', 'technical', 'conversational']),
  includeImages: z.boolean(),
  targetAudience: z.string().min(1, "Target audience is required"),
  competitorUrls: z.array(z.string().url()).optional(),
  internalLinks: z.array(z.string()).optional(),
});

interface ContentGenerationFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  initialData?: Partial<FormData>;
  isLoading?: boolean;
}

export function ContentGenerationForm({ 
  onSubmit, 
  initialData, 
  isLoading 
}: ContentGenerationFormProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wordCount: 1000,
      includeImages: true,
      ...initialData,
    },
  });

  const watchedValues = watch();
  const totalSteps = 3;

  const handleFormSubmit = async (data: FormData) => {
    try {
      setIsGenerating(true);
      
      // Simulate content generation
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default simulation
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      toast({
        title: "Content Generated!",
        description: "Your SEO-optimized content is ready for review.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isGenerating) {
    return <GenerationProgress />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Generate SEO Content</h1>
        <p className="text-muted-foreground">
          Create high-quality, SEO-optimized content with AI in just a few steps
        </p>
        <div className="flex items-center justify-center gap-4">
          <Progress value={(step / totalSteps) * 100} className="w-64" />
          <span className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Content Target & Keywords
              </CardTitle>
              <CardDescription>
                Define your target keyword and location for optimal SEO results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Primary Keyword *</Label>
                  <KeywordInput
                    value={watchedValues.keyword}
                    onChange={(value) => setValue('keyword', value)}
                    error={errors.keyword?.message}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Target Location *</Label>
                  <LocationSelector
                    value={watchedValues.location}
                    onChange={(value) => setValue('location', value)}
                    error={errors.location?.message}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type *</Label>
                  <Select
                    value={watchedValues.contentType}
                    onValueChange={(value) => setValue('contentType', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="landing-page">Landing Page</SelectItem>
                      <SelectItem value="product-description">Product Description</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.contentType && (
                    <p className="text-sm text-destructive">{errors.contentType.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wordCount">Word Count *</Label>
                  <Input
                    type="number"
                    min="300"
                    max="5000"
                    {...register('wordCount', { valueAsNumber: true })}
                  />
                  {errors.wordCount && (
                    <p className="text-sm text-destructive">{errors.wordCount.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={nextStep} variant="gradient">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Content Style & Audience */}
        {step === 2 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Style & Audience
              </CardTitle>
              <CardDescription>
                Customize the tone and target audience for your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tone">Writing Tone *</Label>
                  <Select
                    value={watchedValues.tone}
                    onValueChange={(value) => setValue('tone', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tone && (
                    <p className="text-sm text-destructive">{errors.tone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeImages">Include Image Suggestions</Label>
                    <Switch
                      checked={watchedValues.includeImages}
                      onCheckedChange={(checked) => setValue('includeImages', checked)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generate relevant image suggestions for your content
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Textarea
                  placeholder="Describe your target audience (e.g., 'Marketing professionals at B2B companies looking for content automation tools')"
                  {...register('targetAudience')}
                  rows={3}
                />
                {errors.targetAudience && (
                  <p className="text-sm text-destructive">{errors.targetAudience.message}</p>
                )}
              </div>

              <div className="flex justify-between">
                <Button type="button" onClick={prevStep} variant="outline">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} variant="gradient">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Advanced Options */}
        {step === 3 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Advanced Options
              </CardTitle>
              <CardDescription>
                Optional settings to enhance your content generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Competitor URLs (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add competitor URLs for analysis and inspiration
                  </p>
                  <div className="space-y-2">
                    <Input placeholder="https://competitor1.com/article" />
                    <Input placeholder="https://competitor2.com/article" />
                  </div>
                </div>

                <div>
                  <Label>Internal Links (Optional)</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Suggest internal pages to link to
                  </p>
                  <div className="space-y-2">
                    <Input placeholder="/pricing" />
                    <Input placeholder="/features" />
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium">Content Overview</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Keyword:</span>
                    <Badge variant="secondary" className="ml-2">
                      {watchedValues.keyword || 'Not set'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <Badge variant="secondary" className="ml-2">
                      {watchedValues.location || 'Not set'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {watchedValues.contentType || 'Not set'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Words:</span>
                    <Badge variant="secondary" className="ml-2">
                      {watchedValues.wordCount || 0}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" onClick={prevStep} variant="outline">
                  Back
                </Button>
                <Button type="submit" variant="gradient" disabled={isLoading} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  {isLoading ? "Generating..." : "Generate Content"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}