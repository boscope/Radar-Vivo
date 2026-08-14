export interface Opportunity {

  id: string;

  company: string;

  city: string;

  category: string;

  title: string;

  priority: string;

  score: number;

  source: string;

  discoveredAt: Date;

}

export async function getDashboardFeed():
Promise<Opportunity[]> {

  return [];

}
