import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Target, 
  PenTool, 
  CheckCircle,
  Clock,
  Sparkles,
  X
} from "lucide-react";
import { GenerationProgress as ProgressData } from "@/types";

interface GenerationProgressProps {
  onCancel?: () => void;
  onComplete?: (result: any) => void;
}

export function GenerationProgress({ onCancel, onComplete }: GenerationProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps: Array<{
    id: ProgressData['step'];
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    estimatedTime: number;
  }> = [
    {
      id: 'keyword-research',
      title: 'Keyword Research',
      description: 'Analyzing search volumes and competition',
      icon: Search,
      estimatedTime: 15
    },
    {
      id: 'competitor-analysis',
      title: 'Competitor Analysis',
      description: 'Examining top-ranking content strategies',
      icon: Target,
      estimatedTime: 25
    },
    {
      id: 'content-generation',
      title: 'Content Generation',
      description: 'Creating SEO-optimized content with AI',
      icon: PenTool,
      estimatedTime: 45
    },
    {
      id: 'seo-optimization',
      title: 'SEO Optimization',
      description: 'Applying final optimizations and formatting',
      icon: Sparkles,
      estimatedTime: 15
    }
  ];

  useEffect(() => {
    const totalDuration = 8000; // 8 seconds total
    const stepDuration = totalDuration / steps.length;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 100));
        
        // Update current step based on progress
        const newStep = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(newStep, steps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete?.({
              title: "How to Build a Successful Content Marketing Strategy",
              content: "# How to Build a Successful Content Marketing Strategy\n\nContent marketing has become...",
              seoScore: 92,
              wordCount: 1847,
              suggestions: [
                "Add more internal links",
                "Include relevant images",
                "Optimize meta description"
              ]
            });
          }, 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  const isStepCompleted = (index: number) => currentStep > index;
  const isStepActive = (index: number) => currentStep === index;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="animate-scale-in">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
            Generating Your Content
          </CardTitle>
          <CardDescription>
            Our AI is creating high-quality, SEO-optimized content for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const completed = isStepCompleted(index);
              const active = isStepActive(index);
              
              return (
                <div key={step.id} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                  active ? 'bg-primary/10 border border-primary/20' : 
                  completed ? 'bg-success/5' : 'bg-muted/30'
                }`}>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    completed ? 'bg-success text-success-foreground' :
                    active ? 'bg-primary text-primary-foreground animate-pulse-glow' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${
                        active ? 'text-primary' : completed ? 'text-success' : 'text-foreground'
                      }`}>
                        {step.title}
                      </h3>
                      {active && (
                        <Badge variant="secondary" className="animate-pulse">
                          In Progress
                        </Badge>
                      )}
                      {completed && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${
                      active ? 'text-primary/80' : 'text-muted-foreground'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {step.estimatedTime}s
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel Generation
            </Button>
          </div>

          {/* Fun Facts */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <Sparkles className="inline h-4 w-4 mr-1" />
              <strong>Did you know?</strong> AI-generated content with proper SEO optimization 
              can rank 73% faster than manually written content.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}