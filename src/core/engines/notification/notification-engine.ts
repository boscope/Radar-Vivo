import { Notification } from "../../types/notification";
import { getBestOpportunities } from "../opportunity/opportunity-engine";

export async function getNotifications(): Promise<Notification[]> {
  const opportunities = await getBestOpportunities();

  return opportunities.map((item: any, index: number) => ({
    id: String(index + 1),

    title: item.company.name,

    message: `Oportunidade ${item.opportunity} (Score ${item.score})`,

    type:
      item.opportunity === "Alta"
        ? "success"
        : item.opportunity === "Média"
        ? "warning"
        : "info",

    createdAt: "Agora",
  }));
}