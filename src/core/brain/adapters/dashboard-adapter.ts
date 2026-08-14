import { getDashboardData } from "@/src/core/intelligence/dashboard/dashboard-engine";

export async function getDashboardAdapter(){

    const dashboard = await getDashboardData();

    return dashboard;

}
