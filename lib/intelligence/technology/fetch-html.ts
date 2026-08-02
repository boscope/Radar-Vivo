export async function fetchHtml(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "RadarVivoBot/1.0",
      },
      redirect: "follow",
    });

    return await response.text();
  } catch {
    return "";
  }
}
