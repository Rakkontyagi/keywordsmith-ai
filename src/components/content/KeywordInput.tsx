import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, TrendingUp, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeywordSuggestion {
  keyword: string;
  volume: number;
  difficulty: number;
  trend: "up" | "down" | "stable";
}

interface KeywordInputProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

const mockSuggestions: KeywordSuggestion[] = [
  { keyword: "SEO automation", volume: 12000, difficulty: 65, trend: "up" },
  { keyword: "content marketing", volume: 45000, difficulty: 72, trend: "up" },
  { keyword: "keyword research", volume: 33000, difficulty: 68, trend: "stable" },
  { keyword: "SEO tools", volume: 28000, difficulty: 70, trend: "up" },
  { keyword: "automated content", volume: 8500, difficulty: 45, trend: "down" },
];

export function KeywordInput({ value, onChange, error, placeholder = "Enter your target keyword..." }: KeywordInputProps) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    if (inputValue.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.keyword.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
    if (newValue.length > 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSuggestionSelect = (suggestion: KeywordSuggestion) => {
    setInputValue(suggestion.keyword);
    onChange(suggestion.keyword);
    setOpen(false);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "bg-success/10 text-success";
    if (difficulty < 60) return "bg-warning/10 text-warning";
    return "bg-destructive/10 text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <TrendingUp className="h-3 w-3 text-destructive rotate-180" />;
    return <div className="h-3 w-3 bg-muted rounded-full" />;
  };

  return (
    <div className="space-y-2">
      <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className="pl-10 pr-10"
              onFocus={() => {
                if (inputValue.length > 2 && suggestions.length > 0) {
                  setOpen(true);
                }
              }}
            />
            {inputValue && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => {
                  setInputValue("");
                  onChange("");
                  setOpen(false);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandList>
              <CommandEmpty>No keyword suggestions found.</CommandEmpty>
              <CommandGroup heading="Keyword Suggestions">
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={index}
                    value={suggestion.keyword}
                    onSelect={() => handleSuggestionSelect(suggestion)}
                    className="flex items-center justify-between p-3 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{suggestion.keyword}</span>
                        {getTrendIcon(suggestion.trend)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Volume2 className="h-3 w-3" />
                        <span>{suggestion.volume.toLocaleString()}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs", getDifficultyColor(suggestion.difficulty))}
                      >
                        {suggestion.difficulty}%
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}