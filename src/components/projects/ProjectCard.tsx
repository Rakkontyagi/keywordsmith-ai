import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Calendar, 
  BarChart3, 
  FileText, 
  Target,
  ExternalLink
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  contentCount: number;
  keywords: string[];
  performance: number;
  lastUpdated: string;
  status: 'active' | 'paused' | 'completed';
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'paused': return 'bg-warning/10 text-warning border-warning/20';
      case 'completed': return 'bg-muted/50 text-muted-foreground border-muted/50';
      default: return 'bg-muted/50 text-muted-foreground border-muted/50';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-success';
    if (performance >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
              <Badge variant="outline" className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Project
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{project.contentCount}</div>
              <div className="text-xs text-muted-foreground">Content pieces</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{project.keywords.length}</div>
              <div className="text-xs text-muted-foreground">Keywords</div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Performance</span>
            </div>
            <span className={`text-sm font-bold ${getPerformanceColor(project.performance)}`}>
              {project.performance}%
            </span>
          </div>
          <Progress value={project.performance} className="h-2" />
        </div>

        {/* Keywords Preview */}
        <div>
          <div className="text-sm font-medium mb-2">Top Keywords</div>
          <div className="flex flex-wrap gap-1">
            {project.keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {project.keywords.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.keywords.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-primary/5 text-primary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
          </div>
          
          <Button size="sm" variant="outline" className="h-8">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}