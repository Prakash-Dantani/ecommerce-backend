export type categoryType = {
  category_name: string;
  description?: string | undefined;
  parent_category_id?: number | undefined;
  sort_order?: number | null;
  image_url?: string | null;
  is_active?: boolean | true;
};
