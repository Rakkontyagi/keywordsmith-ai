import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface APIKey {
  name: string;
  key: string;
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  documentationUrl: string;
  required: boolean;
}

export function APISettings() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      name: "OpenAI API",
      key: "sk-proj-***************************",
      status: "connected",
      description: "Used for AI content generation and text processing",
      documentationUrl: "https://platform.openai.com/docs",
      required: true
    },
    {
      name: "Serper.dev",
      key: "***************************",
      status: "connected", 
      description: "Powers SERP analysis and keyword research",
      documentationUrl: "https://serper.dev/api",
      required: true
    },
    {
      name: "Firecrawl API",
      key: "fc-***************************",
      status: "disconnected",
      description: "Web scraping for competitor content analysis",
      documentationUrl: "https://docs.firecrawl.dev",
      required: false
    },
    {
      name: "Anthropic Claude",
      key: "",
      status: "disconnected",
      description: "Alternative AI model for content generation",
      documentationUrl: "https://docs.anthropic.com",
      required: false
    }
  ]);

  const toggleKeyVisibility = (name: string) => {
    setShowKeys(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const testConnection = async (name: string) => {
    setIsLoading(prev => ({ ...prev, [name]: true }));
    
    try {
      // TODO: Implement actual API testing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setApiKeys(prev => prev.map(api => 
        api.name === name 
          ? { ...api, status: 'connected' as const }
          : api
      ));
      
      toast({
        title: "Connection successful",
        description: `${name} is working correctly.`
      });
    } catch (error) {
      setApiKeys(prev => prev.map(api => 
        api.name === name 
          ? { ...api, status: 'error' as const }
          : api
      ));
      
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${name}. Please check your API key.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [name]: false }));
    }
  };

  const updateApiKey = (name: string, newKey: string) => {
    setApiKeys(prev => prev.map(api => 
      api.name === name 
        ? { ...api, key: newKey, status: newKey ? 'disconnected' as const : 'disconnected' as const }
        : api
    ));
  };

  const getStatusColor = (status: APIKey['status']) => {
    switch (status) {
      case 'connected': return 'bg-success/10 text-success border-success/20';
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  const getStatusIcon = (status: APIKey['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            Configure your API keys for seamless integration with external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              API keys are encrypted and stored securely. We recommend using environment-specific keys 
              with minimal required permissions.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="apis" className="space-y-6">
            <TabsList>
              <TabsTrigger value="apis">API Keys</TabsTrigger>
              <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
            </TabsList>

            <TabsContent value="apis" className="space-y-6">
              {apiKeys.map((api) => (
                <Card key={api.name} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{api.name}</CardTitle>
                        <Badge variant="outline" className={getStatusColor(api.status)}>
                          {getStatusIcon(api.status)}
                          <span className="ml-1 capitalize">{api.status}</span>
                        </Badge>
                        {api.required && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Required
                          </Badge>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(api.documentationUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Docs
                      </Button>
                    </div>
                    <CardDescription>{api.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${api.name}-key`}>API Key</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            id={`${api.name}-key`}
                            type={showKeys[api.name] ? "text" : "password"}
                            value={api.key}
                            onChange={(e) => updateApiKey(api.name, e.target.value)}
                            placeholder="Enter your API key..."
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                            onClick={() => toggleKeyVisibility(api.name)}
                          >
                            {showKeys[api.name] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        
                        <Button
                          onClick={() => testConnection(api.name)}
                          disabled={!api.key || isLoading[api.name]}
                          variant="outline"
                        >
                          {isLoading[api.name] ? "Testing..." : "Test"}
                        </Button>
                      </div>
                    </div>

                    {api.status === 'error' && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Connection failed. Please verify your API key and try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage Statistics</CardTitle>
                  <CardDescription>
                    Monitor your API usage and remaining limits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">24,587</div>
                      <div className="text-sm text-muted-foreground">OpenAI Tokens Used</div>
                      <div className="text-xs text-muted-foreground">75% of monthly limit</div>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-sm text-muted-foreground">SERP Queries</div>
                      <div className="text-xs text-muted-foreground">41% of monthly limit</div>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold">856</div>
                      <div className="text-sm text-muted-foreground">Pages Crawled</div>
                      <div className="text-xs text-muted-foreground">28% of monthly limit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}