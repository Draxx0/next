"use client";

import { ICategory, IPost } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import PostLoader from "./PostLoader";
import PostListItem from "./postListItem/PostListItem";
import PostCreateModal from "./PostCreateModal";
import CategoryLoader from "./CategoryLoader";
import CategoryListItem from "./CategoryListItem";
import CategoryCreateModal from "./CategoryCreateModal";

const CategoriesList = () => {
  const { data: categories, isLoading } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: async () => ApiService.getAll<ICategory>({ path: "categories" }),
    staleTime: 5 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="grid grid-cols-3 gap-5">
      {isLoading ? (
        <>
          <CategoryLoader />
          <CategoryLoader />
          <CategoryLoader />
        </>
      ) : categories && categories.length > 0 ? (
        <>
          {categories.map((category, index) => (
            <CategoryListItem
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </>
      ) : (
        <div className="flex items-center gap-3">
          <p className="text-gray-500">Aucune catégorie trouvé</p>
          <CategoryCreateModal />
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
