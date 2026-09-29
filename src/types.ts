export type ScreenType = 'home' | 'lookbook' | 'craft' | 'sizing';

export type LookCategory = 'all' | 'suits' | 'bridal' | 'traditional' | 'casual';

export interface LookbookItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'suits' | 'bridal' | 'traditional' | 'casual';
  badgeCategory: string;
  badgeStyle: string;
  tagline: string;
  clothAndMill: string;
  architecturalCut: string;
  craftTime: string;
  image: string;
  alt: string;
}

export interface CraftService {
  id: string;
  commissionNumber: string;
  title: string;
  badge: string;
  icon: string;
  description: string;
  fabricGauge?: {
    label: string;
    grade: string;
    percent: number;
    subtext: string;
  };
  tags: string[];
  image: string;
  alt: string;
  startingPrice?: string;
  turnaround?: string;
}

export interface BespokeStep {
  stage: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export interface FitDossier {
  chest: string;
  waist: string;
  hips: string;
  shoulder: string;
}

export interface BookingDetails {
  service: string;
  locationType: 'atelier' | 'home';
  date: string;
  timeSlot: string;
  fullName: string;
  emailOrPhone: string;
  notes: string;
}
