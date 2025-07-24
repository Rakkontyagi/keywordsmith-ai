import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

interface ContentPerformanceChartProps {
  timeRange: 'day' | 'week' | 'month' | 'year';
}

export function ContentPerformanceChart({ timeRange }: ContentPerformanceChartProps) {
  // Mock data - replace with real data
  const performanceData = [
    { name: 'Jan', content: 120, seoScore: 85, rankings: 45 },
    { name: 'Feb', content: 145, seoScore: 87, rankings: 52 },
    { name: 'Mar', content: 180, seoScore: 89, rankings: 68 },
    { name: 'Apr', content: 210, seoScore: 91, rankings: 75 },
    { name: 'May', content: 235, seoScore: 88, rankings: 82 },
    { name: 'Jun', content: 280, seoScore: 92, rankings: 95 },
  ];

  const contentTypeData = [
    { type: 'Blog Posts', count: 1200, performance: 89 },
    { type: 'Articles', count: 850, performance: 92 },
    { type: 'Landing Pages', count: 450, performance: 95 },
    { type: 'Product Descriptions', count: 650, performance: 87 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Content Performance Trends</CardTitle>
          <CardDescription>Track your content generation and SEO performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-muted-foreground text-xs"
                />
                <YAxis className="text-muted-foreground text-xs" />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="content" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Content Generated"
                />
                <Line 
                  type="monotone" 
                  dataKey="seoScore" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Avg SEO Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="rankings" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="Top Rankings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Type Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Type Performance</CardTitle>
          <CardDescription>Compare performance across different content types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentTypeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="type" 
                  className="text-muted-foreground text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis className="text-muted-foreground text-xs" />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  name="Content Count"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}