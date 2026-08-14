import type { Company } from "@/types/company";

export type RadarSearchOptions = {
  city?: string;
  state?: string;
  category?: string;
  limit?: number;
};

export async function automaticRadar(
  options: RadarSearchOptions = {}
): Promise<Company[]> {

  console.log("====================================");
  console.log("RADAR VIVO AUTOMÁTICO");
  console.log("====================================");

  console.log("Cidade:", options.city ?? "Todas");
  console.log("Estado:", options.state ?? "Todos");
  console.log("Categoria:", options.category ?? "Todas");
  console.log("Limite:", options.limit ?? 50);

  /*
      FASE 1

      Aqui futuramente iremos conectar:

      ✔ Google Places

      ✔ Google Maps

      ✔ CNPJ

      ✔ Sites

      ✔ Instagram

      ✔ Facebook

      ✔ SEO

      ✔ WhatsApp

      ✔ IA

      ✔ Índice RV

      ✔ Banco de Dados

  */

  console.log("Radar iniciado...");

  return [];
}