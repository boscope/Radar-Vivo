export interface CompanyRow {

  id:string;

  name:string;

  city:string;

  state:string;

  category:string;

  source:string;

  url:string | null;

  created_at:string;

}

export interface OpportunityRow {

  id:string;

  company_id:string;

  score:number;

  probability:number;

  priority:string;

  reason:string;

  next_action:string;

  created_at:string;

}
