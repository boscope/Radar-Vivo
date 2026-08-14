import { getRadarBrainService } from "../services/radar-brain-service";

export async function getRadarContext() {

    const brain = await getRadarBrainService();

    return {

        brain,

        timestamp: new Date(),

        version: "V1",

        source: "RadarBrain"

    };

}
