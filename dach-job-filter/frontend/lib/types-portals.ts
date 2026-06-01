export type SwissPortalRow = {
  id: string;
  name: string;
  url: string;
  category: string;
  focus: string;
  /** Plantilla de URL: `{q}`, `{qq}`, `{loc}`, `{locLi}`, `{g:dominio}` (ver portal-search-url.ts). */
  search_url_template?: string;
};

export type SwissPortalsResponse = {
  country: string;
  category_labels: Record<string, string>;
  portals: SwissPortalRow[];
  count: number;
  disclaimer: string;
};
