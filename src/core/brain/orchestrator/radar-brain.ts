import { generateExecutiveSummary } from "@/src/core/intelligence/executive/executive-summary-engine";
import { getExecutiveKPIs } from "@/src/core/intelligence/kpi/kpi-engine";
import { getMarketIndicators } from "@/src/core/intelligence/market/market-intelligence-engine";
import { generateActionPlan } from "@/src/core/intelligence/recommendation/action-plan-engine";
import { getOpportunities } from "@/src/core/services/opportunity-service";

import { DashboardData } from "../models/dashboard-data";

export async function getRadarBrain(): Promise<DashboardData> {

    const opportunities = await getOpportunities();

    const executive = await generateExecutiveSummary();

    const kpis = await getExecutiveKPIs();

    const market = await getMarketIndicators();

    const actionPlan = await generateActionPlan();

    return {

        executive,

        kpis,

        market,

        opportunities,

        actionPlan,

        generatedAt: new Date()

    };

}
