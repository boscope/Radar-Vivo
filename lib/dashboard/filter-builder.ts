export interface DashboardFilter {

  city?: string;

  category?: string;

  priority?: string;

}

export function createDefaultFilter():
DashboardFilter {

  return {

    city: undefined,

    category: undefined,

    priority: undefined,

  };

}
