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
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PostSelectCategories = ({
  field,
  defaultCategoryId,
}: {
  field: ControllerRenderProps<
    {
      title: string;
      content: string;
      categoryId: string;
    },
    "categoryId"
  >;
  defaultCategoryId?: string;
}) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => ApiService.getAll<ICategory>({ path: "categories" }),
    staleTime: 5 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <PostSelectCategoriesLoader />;

  if (isError) return <PostSelectCategoriesError />;

  return (
    <>
      {categories && categories.length > 0 ? (
        <Select
          required
          onValueChange={field.onChange}
          defaultValue={String(defaultCategoryId) || field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selectionner une catégorie" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {" "}
            Aucune catégorie disponible
          </p>
          <Button>
            <Link href={"/categories"}>Créer une catégorie</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default PostSelectCategories;
