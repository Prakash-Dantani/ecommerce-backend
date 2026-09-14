export type categoryType = {
  parent_category_id?: number | null;
  category_name: string;
  slug: string | null;
  description?: string | undefined;
  image_url?: string | null;
  sort_order?: number | null;
  is_active?: boolean | true;
  created_by: number;
};
