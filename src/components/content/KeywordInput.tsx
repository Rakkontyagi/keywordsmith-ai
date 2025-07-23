import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Target, X } from "lucide-react";

interface KeywordSuggestion {
  keyword: string;
  volume: number;
  difficulty: 'easy' | 'medium' | 'hard';
  trend: 'up' | 'down' | 'stable';
}

interface KeywordInputProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export function KeywordInput({ value = '', onChange, error }: KeywordInputProps) {
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock keyword suggestions
  const mockSuggestions: KeywordSuggestion[] = [
    { keyword: 'ai content marketing', volume: 12000, difficulty: 'medium', trend: 'up' },
    { keyword: 'content marketing automation', volume: 8500, difficulty: 'hard', trend: 'up' },
    { keyword: 'seo content strategy', volume: 15000, difficulty: 'medium', trend: 'stable' },
    { keyword: 'automated content creation', volume: 6200, difficulty: 'easy', trend: 'up' },
    { keyword: 'content marketing tools', volume: 22000, difficulty: 'hard', trend: 'stable' },
  ];

  useEffect(() => {
    if (value.length > 2) {
      setIsLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setSuggestions(mockSuggestions.filter(s => 
          s.keyword.toLowerCase().includes(value.toLowerCase())
        ));
        setIsLoading(false);
        setShowSuggestions(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default: return <Target className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your target keyword (e.g., 'AI content marketing')"
          className="pl-10"
          onFocus={() => value.length > 2 && setShowSuggestions(true)}
        />
        {showSuggestions && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => setShowSuggestions(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}

      {showSuggestions && (
        <Card className="absolute top-full mt-1 w-full z-50 shadow-elegant animate-scale-in">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-4 w-4 animate-spin mx-auto mb-2" />
                Searching keywords...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0 transition-colors"
                    onClick={() => {
                      onChange(suggestion.keyword);
                      setShowSuggestions(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{suggestion.keyword}</span>
                          {getTrendIcon(suggestion.trend)}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {suggestion.volume.toLocaleString()} searches/month
                          </span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getDifficultyColor(suggestion.difficulty)}`}
                          >
                            {suggestion.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <Search className="h-4 w-4 mx-auto mb-2" />
                No keyword suggestions found
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}