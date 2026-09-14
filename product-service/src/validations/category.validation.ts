import { z } from "zod";
import {
  optionalPositiveNumber,
  optionaltextValidator,
  requiredTextValidator,
  urlValidator,
} from "./utils";

export const categorySchema = z.object({
  category_name: requiredTextValidator("Category Name", 3, 255),
  image_url: urlValidator(),
  is_active: z.boolean().default(true),
});
