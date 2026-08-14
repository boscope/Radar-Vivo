import { getRadarContext } from "../context/radar-context";

export async function getRadarFacade() {

    const context = await getRadarContext();

    return {

        executive: context.brain.executive,

        kpis: context.brain.kpis,

        market: context.brain.market,

        opportunities: context.brain.opportunities,

        actionPlan: context.brain.actionPlan,

        metadata: {

            generatedAt: context.brain.generatedAt,

            version: context.version,

            source: context.source

        }

    };

}
