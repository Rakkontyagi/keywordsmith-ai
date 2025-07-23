import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Target,
  Plus,
  Sparkles
} from "lucide-react";

export function DashboardHeader() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Content Generated",
      value: "47",
      change: "+12%",
      positive: true,
      icon: FileText,
    },
    {
      label: "Active Projects",
      value: "8",
      change: "+2",
      positive: true,
      icon: Target,
    },
    {
      label: "Avg. SEO Score",
      value: "85",
      change: "+7%",
      positive: true,
      icon: TrendingUp,
    },
    {
      label: "Team Members",
      value: "3",
      change: "0",
      positive: true,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your SEO content today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            {user?.subscription?.toUpperCase() || 'FREE'} Plan
          </Badge>
          <Button variant="gradient" className="gap-2">
            <Plus className="h-4 w-4" />
            New Content
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-elegant transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      stat.positive 
                        ? 'text-success bg-success/10' 
                        : 'text-destructive bg-destructive/10'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}