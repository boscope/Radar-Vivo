export interface OSMBusiness {
  name?: string;
  cidade?: string;
  estado?: string;
  categoria?: string;
  endereco?: string;
  latitude?: number;
  longitude?: number;
  osmType?: string;
}

type NominatimAddress = {
  city?: string;
  town?: string;
  municipality?: string;
  village?: string;
  state?: string;
  road?: string;
  suburb?: string;
};

type NominatimResult = {
  display_name?: string;
  lat?: string;
  lon?: string;
  type?: string;
  category?: string;
  address?: NominatimAddress;
  addresstype?: string;
};

function mapCategoria(type?: string): string {
  if (!type) return "Empresa";

  const map: Record<string, string> = {
    hair_dresser: "Barbearia",
    hairdresser: "Barbearia",
    beauty: "Salão de Beleza",
    dentist: "Dentista",
    clinic: "Clínica",
    doctors: "Consultório Médico",
    restaurant: "Restaurante",
    fast_food: "Restaurante",
    cafe: "Cafeteria",
    pharmacy: "Farmácia",
    school: "Escola",
    supermarket: "Supermercado",
    shop: "Loja",
    florist: "Floricultura",
    car_repair: "Oficina",
    garage: "Oficina",
    gym: "Academia",
    hotel: "Hotel",
  };

  return map[type] ?? "Empresa";
}

export async function searchOSMBusiness(
  name: string
): Promise<OSMBusiness | null> {
  try {
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?q=${encodeURIComponent(name)}` +
      `&format=json&limit=3&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "RadarVivo/1.0 (www.radarvivo.com.br)",
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const results: NominatimResult[] = await response.json();

    const termo = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const palavras = termo
      .split(/\s+/)
      .filter((p) => p.length > 3);

    if (!palavras.length) return null;

    const encontrado = results.find((r) => {
      const display = (r.display_name ?? "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return palavras.every((p) => display.includes(p));
    });

    const first = encontrado ?? results[0];

    if (!first) return null;

    const address = first.address ?? {};

    const cidade =
      address.city ??
      address.town ??
      address.municipality ??
      address.village;

    return {
      name: first.display_name?.split(",")[0] ?? name,
      cidade,
      estado: address.state,
      categoria: mapCategoria(first.type ?? first.addresstype),
      endereco: first.display_name,
      latitude: first.lat ? parseFloat(first.lat) : undefined,
      longitude: first.lon ? parseFloat(first.lon) : undefined,
      osmType: first.type,
    };
  } catch {
    return null;
  }
}
