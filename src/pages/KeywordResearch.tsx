import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Filter,
  Download,
  Star
} from "lucide-react";
import { useState } from "react";

export default function KeywordResearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mockKeywords = [
    { keyword: "SEO automation", volume: 12000, difficulty: 65, cpc: 4.25, trend: "up" },
    { keyword: "content marketing tools", volume: 8500, difficulty: 58, cpc: 3.80, trend: "up" },
    { keyword: "keyword research", volume: 45000, difficulty: 72, cpc: 5.10, trend: "stable" },
    { keyword: "SEO software", volume: 18000, difficulty: 68, cpc: 6.75, trend: "up" },
    { keyword: "automated content", volume: 6200, difficulty: 45, cpc: 2.90, trend: "down" },
  ];

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return "text-success";
    if (difficulty < 60) return "text-warning";
    return "text-destructive";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <TrendingUp className="h-3 w-3 text-destructive rotate-180" />;
    return <div className="h-3 w-3 bg-muted rounded-full" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Keyword Research</h1>
          <p className="text-muted-foreground mt-2">
            Discover high-value keywords to optimize your content strategy
          </p>
        </div>

        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Keyword Discovery
            </CardTitle>
            <CardDescription>
              Enter a seed keyword to discover related opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter seed keyword (e.g., SEO tools)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading} className="gap-2">
                <Search className="h-4 w-4" />
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Tabs defaultValue="keywords" className="space-y-6">
          <TabsList>
            <TabsTrigger value="keywords">Keyword Ideas</TabsTrigger>
            <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="trends">Search Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="keywords" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Keyword Opportunities</CardTitle>
                    <CardDescription>
                      {mockKeywords.length} keywords found
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{keyword.keyword}</span>
                          {getTrendIcon(keyword.trend)}
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Star className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{keyword.volume.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Volume</div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                            {keyword.difficulty}%
                          </div>
                          <div className="text-xs text-muted-foreground">Difficulty</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="font-medium">${keyword.cpc}</div>
                          <div className="text-xs text-muted-foreground">CPC</div>
                        </div>

                        <Button size="sm" variant="outline">
                          Add to Project
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Competitor Keywords
                </CardTitle>
                <CardDescription>
                  Analyze what keywords your competitors are ranking for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter competitor domains to analyze their keyword strategies
                  </p>
                  <Button className="mt-4">Start Analysis</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Search Trends
                </CardTitle>
                <CardDescription>
                  Discover trending keywords and seasonal patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Trend analysis will show search volume patterns over time
                  </p>
                  <Button className="mt-4">View Trends</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}