import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus, 
  MoreHorizontal,
  FolderOpen,
  Calendar,
  BarChart3
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProjectCard } from "./ProjectCard";
import { ProjectCreationForm } from "./ProjectCreationForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Mock data - replace with real data
  const projects: Project[] = [
    {
      id: "1",
      name: "E-commerce SEO Campaign",
      description: "Content marketing strategy for online retail platform",
      contentCount: 45,
      keywords: ["online shopping", "product reviews", "e-commerce"],
      performance: 87,
      lastUpdated: "2024-01-15",
      status: "active",
      tags: ["ecommerce", "retail", "high-priority"]
    },
    {
      id: "2", 
      name: "SaaS Blog Content",
      description: "Technical content for B2B software company",
      contentCount: 28,
      keywords: ["software development", "API integration", "cloud solutions"],
      performance: 92,
      lastUpdated: "2024-01-14",
      status: "active",
      tags: ["saas", "b2b", "technical"]
    },
    {
      id: "3",
      name: "Local Business SEO",
      description: "Location-based content for restaurant chain",
      contentCount: 67,
      keywords: ["restaurant near me", "food delivery", "local dining"],
      performance: 78,
      lastUpdated: "2024-01-12",
      status: "paused",
      tags: ["local", "food", "restaurants"]
    },
    {
      id: "4",
      name: "Healthcare Content Hub",
      description: "Medical information and health tips content",
      contentCount: 123,
      keywords: ["health tips", "medical advice", "wellness"],
      performance: 94,
      lastUpdated: "2024-01-10",
      status: "completed",
      tags: ["healthcare", "medical", "wellness"]
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'paused': return 'bg-warning/10 text-warning';
      case 'completed': return 'bg-muted/50 text-muted-foreground';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your content projects and campaigns</p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <ProjectCreationForm onClose={() => setShowCreateDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, keywords, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map(project => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge variant="secondary" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{project.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FolderOpen className="h-4 w-4" />
                        <span>{project.contentCount} pieces</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" />
                        <span>{project.performance}% performance</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Export Data</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Create your first project to get started"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}