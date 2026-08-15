const CATEGORY_TAGS: Record<string, string[]> = {
  "barbearia": ["shop=barber", "amenity=barber", "shop=hairdresser"],
  "salão": ["shop=hairdresser", "shop=beauty", "amenity=beauty_shop"],
  "salao": ["shop=hairdresser", "shop=beauty", "amenity=beauty_shop"],
  "beleza": ["shop=hairdresser", "shop=beauty", "amenity=beauty_shop"],
  "dentista": ["amenity=dentist"],
  "dent": ["amenity=dentist"],
  "odontologia": ["amenity=dentist"],
  "clínica": ["amenity=clinic", "amenity=doctors", "healthcare=clinic"],
  "clinica": ["amenity=clinic", "amenity=doctors", "healthcare=clinic"],
  "médico": ["amenity=doctors", "healthcare=doctor"],
  "medico": ["amenity=doctors", "healthcare=doctor"],
  "restaurante": ["amenity=restaurant"],
  "pizzaria": ["amenity=restaurant", "amenity=fast_food"],
  "cafeteria": ["amenity=cafe"],
  "café": ["amenity=cafe"],
  "cafe": ["amenity=cafe"],
  "farmácia": ["amenity=pharmacy"],
  "farmacia": ["amenity=pharmacy"],
  "supermercado": ["shop=supermarket", "shop=convenience"],
  "mercado": ["shop=supermarket", "shop=convenience"],
  "oficina": ["shop=car_repair"],
  "auto": ["shop=car_repair", "shop=car"],
  "academia": ["leisure=fitness_centre", "leisure=sports_centre"],
  "hotel": ["tourism=hotel"],
  "pet": ["shop=pet", "amenity=veterinary"],
  "veterinário": ["amenity=veterinary"],
  "veterinaria": ["amenity=veterinary"],
  "imobiliária": ["office=estate_agent"],
  "imobiliaria": ["office=estate_agent"],
  "floricultura": ["shop=florist"],
  "flor": ["shop=florist"],
  "padaria": ["shop=bakery", "amenity=bakery"],
  "açougue": ["shop=butcher"],
  "loja": ["shop=clothes", "shop=shoes", "shop=gift", "shop=general"],
  "escola": ["amenity=school"],
  "faculdade": ["amenity=university", "amenity=college"],
};

export function resolveCategoryTag(
  category: string
): string[] {
  const key = category.toLowerCase().trim();
  return (
    CATEGORY_TAGS[key] ?? [
      "amenity=dentist",
      "amenity=restaurant",
      "shop=barber",
      "shop=supermarket",
      "amenity=pharmacy",
      "amenity=cafe",
    ]
  );
}
