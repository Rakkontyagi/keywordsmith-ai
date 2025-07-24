import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Target, Download, Filter } from "lucide-react";
import { ContentPerformanceChart } from "./ContentPerformanceChart";
import { KeywordRankingTracker } from "./KeywordRankingTracker";
import { CompetitorComparison } from "./CompetitorComparison";
import { ROICalculator } from "./ROICalculator";

interface AnalyticsDashboardProps {
  timeRange?: 'day' | 'week' | 'month' | 'year';
  projectId?: string;
  onExport?: (format: 'pdf' | 'csv' | 'xlsx') => void;
}

export function AnalyticsDashboard({ 
  timeRange: initialTimeRange = 'month',
  projectId,
  onExport 
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const [activeTab, setActiveTab] = useState('overview');

  const handleExport = (format: 'pdf' | 'csv' | 'xlsx') => {
    onExport?.(format);
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your content performance and SEO metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24h</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExport('pdf')}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords Tracked</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top 10 Rankings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ContentPerformanceChart timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="rankings" className="space-y-6">
          <KeywordRankingTracker timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <CompetitorComparison timeRange={timeRange} />
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <ROICalculator timeRange={timeRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}