import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";

interface CompetitorComparisonProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
}

export function CompetitorComparison({ timeRange }: CompetitorComparisonProps) {
  // Mock data - replace with real data
  const competitorData = [
    {
      domain: "competitor1.com",
      seoScore: 94,
      organicKeywords: 15420,
      organicTraffic: 450000,
      backlinks: 89500,
      topKeywords: ["content marketing", "SEO tools", "digital marketing"],
      recentChanges: "+12.5%"
    },
    {
      domain: "competitor2.com", 
      seoScore: 87,
      organicKeywords: 8750,
      organicTraffic: 280000,
      backlinks: 45200,
      topKeywords: ["AI content", "automation tools", "marketing software"],
      recentChanges: "+8.3%"
    },
    {
      domain: "competitor3.com",
      seoScore: 91,
      organicKeywords: 12100,
      organicTraffic: 380000,
      backlinks: 62300,
      topKeywords: ["content generation", "SEO automation", "AI tools"],
      recentChanges: "-2.1%"
    }
  ];

  const ourMetrics = {
    seoScore: 89,
    organicKeywords: 9850,
    organicTraffic: 220000,
    backlinks: 32100
  };

  const getComparisonStatus = (ourValue: number, theirValue: number) => {
    if (ourValue > theirValue) return "ahead";
    if (ourValue < theirValue) return "behind";
    return "equal";
  };

  return (
    <div className="space-y-6">
      {/* Competitor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {competitorData.map((competitor, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{competitor.domain}</CardTitle>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  <span className={competitor.recentChanges.startsWith('+') ? 'text-success' : 'text-destructive'}>
                    {competitor.recentChanges}
                  </span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SEO Score Comparison */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SEO Score</span>
                  <span className="font-medium">{competitor.seoScore}/100</span>
                </div>
                <Progress value={competitor.seoScore} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {getComparisonStatus(ourMetrics.seoScore, competitor.seoScore) === 'ahead' ? 
                    `You're ${ourMetrics.seoScore - competitor.seoScore} points ahead` :
                    `${competitor.seoScore - ourMetrics.seoScore} points ahead of you`
                  }
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Keywords</div>
                  <div className="font-medium">{competitor.organicKeywords.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Traffic</div>
                  <div className="font-medium">{(competitor.organicTraffic / 1000).toFixed(0)}K</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Backlinks</div>
                  <div className="font-medium">{(competitor.backlinks / 1000).toFixed(1)}K</div>
                </div>
              </div>

              {/* Top Keywords */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">Top Keywords</div>
                <div className="flex flex-wrap gap-1">
                  {competitor.topKeywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics Comparison</CardTitle>
          <CardDescription>
            See how you stack up against your competitors across key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Metric</th>
                  <th className="text-left py-2">Your Site</th>
                  {competitorData.map((comp, idx) => (
                    <th key={idx} className="text-left py-2">{comp.domain}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">SEO Score</td>
                  <td className="py-2">{ourMetrics.seoScore}/100</td>
                  {competitorData.map((comp, idx) => (
                    <td key={idx} className="py-2">{comp.seoScore}/100</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Organic Keywords</td>
                  <td className="py-2">{ourMetrics.organicKeywords.toLocaleString()}</td>
                  {competitorData.map((comp, idx) => (
                    <td key={idx} className="py-2">{comp.organicKeywords.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Organic Traffic</td>
                  <td className="py-2">{(ourMetrics.organicTraffic / 1000).toFixed(0)}K/mo</td>
                  {competitorData.map((comp, idx) => (
                    <td key={idx} className="py-2">{(comp.organicTraffic / 1000).toFixed(0)}K/mo</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 font-medium">Backlinks</td>
                  <td className="py-2">{(ourMetrics.backlinks / 1000).toFixed(1)}K</td>
                  {competitorData.map((comp, idx) => (
                    <td key={idx} className="py-2">{(comp.backlinks / 1000).toFixed(1)}K</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}