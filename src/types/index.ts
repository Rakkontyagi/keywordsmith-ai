// Core TypeScript interfaces for the SEO platform

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  created_at: string;
  last_login: string;
}

export interface ContentGenerationForm {
  keyword: string;
  location: string;
  contentType: 'blog' | 'article' | 'landing-page' | 'product-description';
  wordCount: number;
  tone: 'professional' | 'casual' | 'technical' | 'conversational';
  includeImages: boolean;
  targetAudience: string;
  competitorUrls?: string[];
  internalLinks?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  location: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  status: 'active' | 'paused' | 'completed';
  content_count: number;
  tags: string[];
}

export interface Content {
  id: string;
  title: string;
  content: string;
  keyword: string;
  project_id: string;
  user_id: string;
  seo_score: number;
  word_count: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  performance_metrics: ContentMetrics;
}

export interface ContentMetrics {
  views: number;
  clicks: number;
  impressions: number;
  ctr: number;
  ranking_position: number;
  organic_traffic: number;
}

export interface CompetitorAnalysis {
  domain: string;
  title: string;
  content_length: number;
  keyword_density: number;
  backlinks: number;
  domain_authority: number;
  ranking_position: number;
  strengths: string[];
  weaknesses: string[];
}

export interface GenerationProgress {
  step: 'keyword-research' | 'competitor-analysis' | 'content-generation' | 'seo-optimization' | 'completed';
  progress: number;
  message: string;
  estimated_time: number;
}

export interface AnalyticsData {
  content_generated: number;
  keywords_tracked: number;
  avg_ranking_position: number;
  organic_traffic_growth: number;
  time_saved_hours: number;
  roi_percentage: number;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface APISettings {
  openai_key?: string;
  serper_key?: string;
  firecrawl_key?: string;
}

export interface NotificationSettings {
  email_reports: boolean;
  ranking_alerts: boolean;
  content_suggestions: boolean;
  team_notifications: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  last_active: string;
}