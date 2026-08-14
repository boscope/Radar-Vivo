import { Opportunity } from "@/src/core/intelligence/opportunities/opportunity-engine-v2";

export class OpportunityRepository {

  private opportunities: Opportunity[] = [];

  async save(opportunity: Opportunity): Promise<void> {
    this.opportunities.push(opportunity);
  }

  async saveMany(opportunities: Opportunity[]): Promise<void> {
    this.opportunities.push(...opportunities);
  }

  async findAll(): Promise<Opportunity[]> {
    return [...this.opportunities];
  }

  async clear(): Promise<void> {
    this.opportunities = [];
  }

  async count(): Promise<number> {
    return this.opportunities.length;
  }
}

export const opportunityRepository = new OpportunityRepository();
