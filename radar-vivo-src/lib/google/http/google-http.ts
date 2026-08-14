import {
  memoryCache,
} from "@/lib/cache";

export async function googleFetch(

  url: string

) {

  const cached =
    await memoryCache.get<any>(url);

  if (cached) {

    return cached;

  }

  const response =
    await fetch(url, {

      cache: "no-store",

    });

  if (!response.ok) {

    throw new Error(

      "Google API Error"

    );

  }

  const json =
    await response.json();

  await memoryCache.set(

    url,

    json

  );

  return json;

}
