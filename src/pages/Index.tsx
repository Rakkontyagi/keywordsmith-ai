import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Zap, 
  BarChart3, 
  Target, 
  Users, 
  Trophy,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Globe,
  TrendingUp,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "AI-Powered Keyword Research",
      description: "Discover high-impact keywords for any niche or location with our advanced AI analysis."
    },
    {
      icon: Zap,
      title: "Instant Content Generation",
      description: "Create SEO-optimized content in seconds with our intelligent content generation engine."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor your content performance with live tracking and comprehensive reporting."
    },
    {
      icon: Target,
      title: "Competitor Intelligence",
      description: "Analyze your competitors' strategies and discover their top-performing content."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team on content projects and SEO campaigns."
    },
    {
      icon: Trophy,
      title: "Rank Tracking",
      description: "Track your search engine rankings across multiple keywords and locations."
    }
  ];

  const stats = [
    { label: "Content Generated", value: "10M+", icon: Sparkles },
    { label: "Keywords Analyzed", value: "500M+", icon: Search },
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Countries Supported", value: "195", icon: Globe }
  ];

  const benefits = [
    "Generate SEO content 10x faster",
    "Research any keyword in any country",
    "Real-time competitor analysis",
    "Advanced content optimization",
    "Team collaboration tools",
    "Performance tracking & analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Search className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SEOForge</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="outline">Login</Button>
            <Button variant="gradient">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 animate-fade-in" variant="secondary">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered SEO Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            SEO Content That
            <br />
            Actually Ranks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
            Generate high-converting, SEO-optimized content for any keyword in any country. 
            Research competitors, analyze performance, and dominate search results with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up [animation-delay:400ms]">
            <Button variant="hero" size="lg" className="group">
              Start Free Trial
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up [animation-delay:600ms]">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need for SEO Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines AI-powered content generation with advanced 
              SEO analytics to help you dominate search results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose SEOForge?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of marketers, agencies, and businesses who trust SEOForge 
                to scale their content marketing and SEO efforts.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button variant="gradient" size="lg">
                  Start Your Free Trial
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="p-6 shadow-elegant">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Content Generation Progress</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Keyword Research</span>
                      <span className="text-success">Complete</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Content Generation</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-4/5 animate-pulse-glow"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>SEO Optimization</span>
                      <span className="text-muted-foreground">Pending</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-muted-foreground h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Est. completion: 2 minutes</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your SEO Strategy?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful marketers who use SEOForge to create 
            content that ranks and converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Start Free Trial
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Search className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SEOForge</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered SEO content generation platform for modern marketers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Content Generation</li>
                <li>Keyword Research</li>
                <li>Analytics</li>
                <li>Team Tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SEOForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;