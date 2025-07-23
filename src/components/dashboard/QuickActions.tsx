import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PenTool, 
  Search, 
  BarChart3, 
  FolderPlus,
  Zap,
  Target,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export function QuickActions() {
  const actions = [
    {
      title: "Generate Content",
      description: "Create SEO-optimized content with AI",
      icon: PenTool,
      href: "/dashboard/generate",
      color: "bg-primary/10 text-primary",
      featured: true
    },
    {
      title: "Research Keywords",
      description: "Find high-impact keywords for your niche",
      icon: Search,
      href: "/dashboard/keywords",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "View Analytics",
      description: "Track your content performance",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "New Project",
      description: "Start organizing your content strategy",
      icon: FolderPlus,
      href: "/dashboard/projects/new",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Competitor Analysis",
      description: "Analyze competitor strategies",
      icon: Target,
      href: "/dashboard/competitors",
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      title: "Bulk Operations",
      description: "Manage multiple content pieces",
      icon: Zap,
      href: "/dashboard/bulk",
      color: "bg-pink-500/10 text-pink-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Jump into your most common SEO tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                action.featured ? 'ring-2 ring-primary/20' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  {action.featured && (
                    <div className="mt-3 pt-3 border-t">
                      <Button variant="gradient" size="sm" className="w-full">
                        Start Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}