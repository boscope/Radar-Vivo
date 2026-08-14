import { getRadarBrain } from "../orchestrator/radar-brain";

let cache: any = null;

let lastExecution = 0;

const CACHE_TIME = 1000 * 60 * 5;

export async function getRadarBrainService() {

    const now = Date.now();

    if (cache && (now - lastExecution) < CACHE_TIME) {
        return cache;
    }

    cache = await getRadarBrain();

    lastExecution = now;

    return cache;

}
