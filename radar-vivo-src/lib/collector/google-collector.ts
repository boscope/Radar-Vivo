import type { GoogleData } from "./types";

export async function collectGoogle(
  company: string
): Promise<GoogleData> {

  //==================================================
  // FASE 1
  // Mock Inteligente
  // Estrutura preparada para integração real
  //==================================================

  const nome = company.toLowerCase();

  let city = "Cidade não identificada";
  let category = "Empresa";

  let phone: string | undefined;
  let googleMapsUrl: string | undefined;

  let rating = 4.5;
  let reviews = 87;

  let hasWhatsapp = true;

  let instagram: string | undefined;
  let facebook: string | undefined;
  let linkedin: string | undefined;
  let youtube: string | undefined;
  let tiktok: string | undefined;

  if (nome.includes("barbearia")) {

    city = "Londrina";
    category = "Barbearia";

    phone = "(43) 99999-1111";

    googleMapsUrl =
      "https://maps.google.com/?q=barbearia";

    rating = 4.8;
    reviews = 214;

    instagram =
      "https://instagram.com/barbearia";

    facebook =
      "https://facebook.com/barbearia";

  }

  else if (nome.includes("clinica")) {

    city = "Londrina";
    category = "Clínica";

    phone = "(43) 3333-2222";

    googleMapsUrl =
      "https://maps.google.com/?q=clinica";

    rating = 4.7;
    reviews = 163;

    instagram =
      "https://instagram.com/clinicavida";

    facebook =
      "https://facebook.com/clinicavida";

    linkedin =
      "https://linkedin.com/company/clinicavida";

  }

  else if (nome.includes("mercado")) {

    city = "São Paulo";
    category = "Comércio";

    phone = "(11) 4000-0000";

    googleMapsUrl =
      "https://maps.google.com/?q=mercado";

    rating = 4.6;
    reviews = 1243;

    instagram =
      "https://instagram.com/mercado";

    facebook =
      "https://facebook.com/mercado";

    youtube =
      "https://youtube.com/@mercado";

  }

  return {

    companyName: company,

    city,

    category,

    phone,

    googleMapsUrl,

    googleRating: rating,

    googleReviews: reviews,

    hasWhatsapp,

    instagram,

    facebook,

    linkedin,

    youtube,

    tiktok,

  };

}