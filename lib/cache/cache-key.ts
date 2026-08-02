/**
 * ==========================================
 * Radar Vivo Cache Keys
 * ==========================================
 */

export class CacheKey {

  static company(name: string): string {

    return `company:${name.toLowerCase().trim()}`;

  }

  static website(url: string): string {

    return `website:${url.toLowerCase().trim()}`;

  }

  static google(company: string): string {

    return `google:${company.toLowerCase().trim()}`;

  }

  static seo(domain: string): string {

    return `seo:${domain.toLowerCase().trim()}`;

  }

  static maps(id: string): string {

    return `maps:${id}`;

  }

}
