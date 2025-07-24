import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KeywordRankingTrackerProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
}

export function KeywordRankingTracker({ timeRange }: KeywordRankingTrackerProps) {
  // Mock data - replace with real data
  const keywordData = [
    {
      keyword: "AI content marketing",
      currentRank: 3,
      previousRank: 5,
      searchVolume: 12000,
      difficulty: "medium",
      url: "/blog/ai-content-marketing-guide"
    },
    {
      keyword: "SEO automation tools",
      currentRank: 1,
      previousRank: 2,
      searchVolume: 8500,
      difficulty: "hard",
      url: "/tools/seo-automation"
    },
    {
      keyword: "content generation AI",
      currentRank: 7,
      previousRank: 7,
      searchVolume: 15000,
      difficulty: "medium",
      url: "/ai-content-generator"
    },
    {
      keyword: "competitor analysis",
      currentRank: 12,
      previousRank: 8,
      searchVolume: 22000,
      difficulty: "hard",
      url: "/features/competitor-analysis"
    },
    {
      keyword: "keyword research tool",
      currentRank: 4,
      previousRank: 6,
      searchVolume: 18000,
      difficulty: "medium",
      url: "/keyword-research"
    }
  ];

  const getRankingTrend = (current: number, previous: number) => {
    if (current < previous) {
      return { icon: TrendingUp, color: "text-success", change: `+${previous - current}` };
    } else if (current > previous) {
      return { icon: TrendingDown, color: "text-destructive", change: `-${current - previous}` };
    } else {
      return { icon: Minus, color: "text-muted-foreground", change: "0" };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Ranking Tracker</CardTitle>
        <CardDescription>
          Monitor your keyword positions and track ranking changes over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Keyword</TableHead>
              <TableHead>Current Rank</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Search Volume</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywordData.map((item, index) => {
              const trend = getRankingTrend(item.currentRank, item.previousRank);
              const TrendIcon = trend.icon;

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.keyword}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">#{item.currentRank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${trend.color}`}>
                      <TrendIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{trend.change}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {item.searchVolume.toLocaleString()}/mo
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <a 
                      href={item.url} 
                      className="text-primary hover:underline text-sm truncate max-w-40 block"
                      title={item.url}
                    >
                      {item.url}
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}