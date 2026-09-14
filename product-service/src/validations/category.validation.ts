import { z } from "zod";
import {
  optionalPositiveNumber,
  optionaltextValidator,
  requiredTextValidator,
  urlValidator,
} from "./utils";

export const categorySchema = z.object({
  parent_category_id: optionalPositiveNumber("Parent Category Id"),
  category_name: requiredTextValidator("Category Name", 3, 255),
  description: optionaltextValidator("Description"),
  image_url: urlValidator(),
  sort_order: optionalPositiveNumber("Sort Order"),
  is_active: z.boolean().default(true),
});
