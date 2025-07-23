import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  TrendingUp, 
  Users, 
  Search,
  Clock,
  ExternalLink
} from "lucide-react";

interface Activity {
  id: string;
  type: 'content_generated' | 'ranking_improved' | 'team_joined' | 'keyword_tracked';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    score?: number;
    position?: number;
    member?: string;
  };
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'content_generated',
      title: 'New blog post generated',
      description: '"Best AI Tools for Content Marketing" - 2,500 words',
      timestamp: '2 hours ago',
      metadata: { score: 92 }
    },
    {
      id: '2',
      type: 'ranking_improved',
      title: 'Keyword ranking improved',
      description: '"AI content marketing" moved from position 8 to 3',
      timestamp: '4 hours ago',
      metadata: { position: 3 }
    },
    {
      id: '3',
      type: 'team_joined',
      title: 'New team member added',
      description: 'Sarah Johnson joined as Content Editor',
      timestamp: '1 day ago',
      metadata: { member: 'Sarah Johnson' }
    },
    {
      id: '4',
      type: 'keyword_tracked',
      title: 'Keywords added to tracking',
      description: '15 new keywords added for competitor analysis',
      timestamp: '2 days ago'
    },
    {
      id: '5',
      type: 'content_generated',
      title: 'Landing page optimized',
      description: '"SaaS Marketing Tools" page updated with new SEO content',
      timestamp: '3 days ago',
      metadata: { score: 88 }
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'content_generated':
        return FileText;
      case 'ranking_improved':
        return TrendingUp;
      case 'team_joined':
        return Users;
      case 'keyword_tracked':
        return Search;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'content_generated':
        return 'text-primary bg-primary/10';
      case 'ranking_improved':
        return 'text-success bg-success/10';
      case 'team_joined':
        return 'text-blue-500 bg-blue-500/10';
      case 'keyword_tracked':
        return 'text-purple-500 bg-purple-500/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Stay updated with your latest SEO actions and improvements
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.description}
                </p>
                {activity.metadata && (
                  <div className="flex items-center gap-2 mt-2">
                    {activity.metadata.score && (
                      <Badge variant="secondary" className="text-xs">
                        SEO Score: {activity.metadata.score}
                      </Badge>
                    )}
                    {activity.metadata.position && (
                      <Badge variant="secondary" className="text-xs">
                        Position #{activity.metadata.position}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}