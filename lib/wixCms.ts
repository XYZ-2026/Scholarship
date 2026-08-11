import { countryScholarshipsMap, CountryData, Scholarship } from "@/data/countryScholarships";

export interface WixScholarship {
  id: string | number;
  name: string;
  slug: string;
  country: string;
  countrySlug: string;
  countryFlag: string;
  heroImage: string;
  funding: string;
  deadline: string;
  amount: string;
  fields: string[];
  level: string;
  tag: string;
  color: string;
  overview: string;
  highlights: string[];
  url: string;
  featured?: boolean;
}

export interface WixDeadline {
  id: string;
  title: string;
  scholarshipSlug: string;
  country: string;
  countrySlug: string;
  deadlineDate: string;
  urgency: string;
  status: string;
  notes: string;
}

const WIX_BASE_URL = "https://www.wixapis.com/wix-data/v2";

/**
 * Perform a resilient fetch to Wix Data REST API v2
 */
async function wixFetch(path: string, options: RequestInit = {}): Promise<any> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;

  if (!apiKey || !siteId) {
    return null;
  }

  const url = path.startsWith("http") ? path : `${WIX_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: apiKey,
    "wix-site-id": siteId,
    ...(options.headers as Record<string, string> || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 60, ...(options.next || {}) },
    });

    if (!res.ok) {
      console.warn(`[WixCMS] HTTP ${res.status} ${res.statusText} on ${path}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`[WixCMS] Fetch error on ${path}:`, err);
    return null;
  }
}

/**
 * Transform raw Wix CMS data item to standardized WixScholarship.
 * All card expansion and pop-up details (overview, highlights, url, etc.)
 * are stored directly in and extracted from the Scholarships CMS collection.
 */
function mapRawToScholarship(rawItem: any): WixScholarship {
  const data = rawItem.data || rawItem;

  let fieldsArr: string[] = ["All Fields"];
  if (data.fields) {
    try {
      fieldsArr = typeof data.fields === "string" ? JSON.parse(data.fields) : data.fields;
    } catch {
      fieldsArr = [data.fields];
    }
  }

  let highlightsArr: string[] = [];
  if (data.highlights) {
    try {
      highlightsArr = typeof data.highlights === "string" ? JSON.parse(data.highlights) : data.highlights;
    } catch {
      highlightsArr = [data.highlights];
    }
  }

  return {
    id: rawItem.id || data._id || data.slug || Math.random().toString(),
    name: data.name || data.title || "Scholarship Opportunity",
    slug: data.slug || "",
    country: data.country || "Global",
    countrySlug: data.countrySlug || data.country?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "global",
    countryFlag: data.countryFlag || "🌐",
    heroImage: data.heroImage || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80",
    funding: data.funding || "Fully Funded",
    deadline: data.deadline || "Open",
    amount: data.amount || "Full tuition + allowance",
    fields: Array.isArray(fieldsArr) ? fieldsArr : ["All Fields"],
    level: data.level || "Masters / PhD",
    tag: data.tag || "Scholarship",
    color: data.color || "#690B1B",
    overview: data.overview || "",
    highlights: Array.isArray(highlightsArr) ? highlightsArr : [],
    url: data.url || "#",
    featured: data.featured ?? true,
  };
}

/**
 * Transform raw Wix CMS data item to standardized WixDeadline
 */
function mapRawToDeadline(rawItem: any): WixDeadline {
  const data = rawItem.data || rawItem;
  return {
    id: rawItem.id || data._id || Math.random().toString(),
    title: data.title || "Scholarship Deadline",
    scholarshipSlug: data.scholarshipSlug || "",
    country: data.country || "",
    countrySlug: data.countrySlug || "",
    deadlineDate: data.deadlineDate || data.deadline || "TBA",
    urgency: data.urgency || "Upcoming",
    status: data.status || "Active",
    notes: data.notes || "",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC CMS QUERY METHODS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all scholarships live from Wix CMS collection 'Scholarships'
 */
export async function getAllWixScholarships(): Promise<WixScholarship[]> {
  const payload = {
    dataCollectionId: "Scholarships",
    query: {
      paging: { limit: 200 },
    },
  };

  const res = await wixFetch("/items/query", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res || (!res.dataItems && !res.items)) {
    // Fallback to local snapshot dataset if CMS not yet populated or unreachable
    return Object.entries(countryScholarshipsMap).flatMap(([cSlug, cData]) =>
      cData.scholarships.map((s) => ({
        id: s.id,
        name: s.name,
        slug: `${cSlug}-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        country: cData.name,
        countrySlug: cSlug,
        countryFlag: cData.flag,
        heroImage: cData.heroImage,
        funding: s.funding,
        deadline: s.deadline,
        amount: s.amount,
        fields: s.fields,
        level: s.level,
        tag: s.tag,
        color: s.color,
        overview: s.overview,
        highlights: s.highlights,
        url: s.url,
      }))
    );
  }

  const items = res.dataItems || res.items || [];
  return items.map(mapRawToScholarship);
}

/**
 * Fetch single scholarship popup detail live by slug from Wix CMS collection 'Scholarships'
 */
export async function getWixScholarshipBySlug(slug: string): Promise<WixScholarship | null> {
  const payload = {
    dataCollectionId: "Scholarships",
    query: {
      filter: { slug },
    },
  };

  const res = await wixFetch("/items/query", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res || (!res.dataItems && !res.items) || (res.dataItems || res.items).length === 0) {
    const all = await getAllWixScholarships();
    return all.find((s) => s.slug === slug) || null;
  }

  const items = res.dataItems || res.items;
  return mapRawToScholarship(items[0]);
}

/**
 * Fetch scholarships for a specific country slug live from Wix CMS
 */
export async function getWixScholarshipsByCountry(countrySlug: string): Promise<WixScholarship[]> {
  const all = await getAllWixScholarships();
  const filtered = all.filter((s) => s.countrySlug === countrySlug);

  if (filtered.length > 0) return filtered;

  // Fallback to local map if country slug matched locally
  const localCountry = countryScholarshipsMap[countrySlug];
  if (localCountry) {
    return localCountry.scholarships.map((s) => ({
      id: s.id,
      name: s.name,
      slug: `${countrySlug}-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      country: localCountry.name,
      countrySlug: countrySlug,
      countryFlag: localCountry.flag,
      heroImage: localCountry.heroImage,
      funding: s.funding,
      deadline: s.deadline,
      amount: s.amount,
      fields: s.fields,
      level: s.level,
      tag: s.tag,
      color: s.color,
      overview: s.overview,
      highlights: s.highlights,
      url: s.url,
    }));
  }

  return [];
}

/**
 * Get dynamic live counts of scholarships per country from Wix CMS
 */
export async function getWixCountryCounts(): Promise<Record<string, number>> {
  const all = await getAllWixScholarships();
  const counts: Record<string, number> = {};

  for (const s of all) {
    const slug = s.countrySlug;
    if (slug) {
      counts[slug] = (counts[slug] || 0) + 1;
    }
  }

  return counts;
}

/**
 * Fetch deadlines live from Wix CMS collection 'Deadlines'
 */
export async function getWixDeadlines(countrySlug?: string): Promise<WixDeadline[]> {
  const payload = {
    dataCollectionId: "Deadlines",
    query: {
      paging: { limit: 100 },
    },
  };

  const res = await wixFetch("/items/query", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res || (!res.dataItems && !res.items)) {
    return [];
  }

  const items = res.dataItems || res.items || [];
  const deadlines = items.map(mapRawToDeadline);

  if (countrySlug) {
    return deadlines.filter((d: WixDeadline) => d.countrySlug === countrySlug);
  }

  return deadlines;
}
