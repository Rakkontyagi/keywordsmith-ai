import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

export function PerformanceChart() {
  const data = [
    { name: 'Jan', content: 12, traffic: 1200, rankings: 45 },
    { name: 'Feb', content: 19, traffic: 1800, rankings: 52 },
    { name: 'Mar', content: 25, traffic: 2400, rankings: 48 },
    { name: 'Apr', content: 32, traffic: 3200, rankings: 61 },
    { name: 'May', content: 28, traffic: 2800, rankings: 55 },
    { name: 'Jun', content: 35, traffic: 4200, rankings: 67 },
    { name: 'Jul', content: 47, traffic: 5800, rankings: 73 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'traffic' ? ' visits' : 
               entry.dataKey === 'content' ? ' pieces' : ' keywords'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Track your content generation and SEO performance over time
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Last 7 months</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="contentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-muted-foreground text-xs"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                className="text-muted-foreground text-xs"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="content"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#contentGradient)"
                strokeWidth={2}
                name="Content Pieces"
              />
              <Line
                type="monotone"
                dataKey="traffic"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--success))" }}
                name="Organic Traffic"
                yAxisId="right"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Content Generated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-sm text-muted-foreground">Organic Traffic</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}