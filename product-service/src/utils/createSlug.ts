import slugify from "slugify";

export const createSlug = (slug: string) => {
  return slugify(slug, { lower: true, strict: true });
};
