export interface PatternCard {
  id: string;
  title: string;
  description: string;
  illustrationSeed: string;
  shadowTriggerExamples: string[];
}

export interface FrameworkStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  price: string;
  description: string;
  bullets: string[];
  duration: string;
  badge?: string;
}

export interface ArticleCard {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export interface DiagnosticReport {
  diagnosis: string;
  mechanism: string;
  karmicCore: string;
  mirror: string[];
  dharmaPath: string[];
  recommendedService: {
    name: string;
    description: string;
    fitReason: string;
  };
}
