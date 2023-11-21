"use client";

import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import { ControllerRenderProps } from "react-hook-form";
import PostSelectCategoriesLoader from "./PostSelectCategoriesLoader";
import PostSelectCategoriesError from "./PostSelectCategoriesError";

const PostSelectCategories = ({
  field,
}: {
  field: ControllerRenderProps<
    {
      title: string;
      content: string;
      categoryId: string;
    },
    "categoryId"
  >;
}) => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => ApiService.getAll<ICategory>({ path: "categories" }),
    staleTime: 5 * 1000,
  });

  if (isLoading) return <PostSelectCategoriesLoader />;

  if (isError) return <PostSelectCategoriesError error={error} />;

  return (
    <Select required onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selectionner une catégorie" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="" disabled>
            Aucune catégorie trouvée
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default PostSelectCategories;
