export interface DashboardCard {

  title: string;

  value: string;

  description: string;

}

export interface DashboardMetrics {

  companies: number;

  opportunities: number;

  monitored: number;

  averageScore: number;

}

export interface DashboardActivity {

  id: string;

  company: string;

  action: string;

  createdAt: Date;

}
