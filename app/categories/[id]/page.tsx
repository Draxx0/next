"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ICategory, IPost } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useEffect, useMemo } from "react";
import { formatDate } from "@/utils/functions/formatDate";
import CategoryPostsListItem from "@/components/category/categoryPosts/CategoryPostsListItem";
import Filter from "@/components/common/Filter";
import useApiQueryStore from "@/store/apiQueryStore";

const CategoryPostsList = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const { orderBy } = useApiQueryStore();

  const { data: category, isLoading } = useQuery<ICategory>({
    queryKey: ["categories", id],
    queryFn: () => ApiService.getOne({ path: "categories", id }),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const {
    data: posts,
    refetch,
    isLoading: postsLoading,
  } = useQuery<IPost[]>({
    queryKey: ["posts", id, orderBy],
    queryFn: () =>
      ApiService.getAll<IPost>({
        path: "posts",
        query: { categoryId: id, orderBy: orderBy },
      }),
    enabled: !!category,
    refetchOnWindowFocus: false,
  });

  const latestPostCreatedDate = useMemo(() => {
    if (!category) return null;
    const sortedPosts = category.posts.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })[0];

    return sortedPosts ? sortedPosts.createdAt : null;
  }, [category]);

  useEffect(() => {
    refetch();
  }, [orderBy, refetch]);

  return (
    <>
      <div className="animate-page-transition absolute inset-0 w-screen h-screen"></div>
      <div className="max-w-[80%] mx-auto py-10 space-y-10">
        {isLoading ? (
          <>
            <div className="flex justify-between">
              <Skeleton className="w-1/2 h-6 animate-pulse" />
              <Skeleton className="w-1/4 h-6 animate-pulse" />
            </div>
            <Separator />
          </>
        ) : (
          category && (
            <>
              <Link href={"/categories"}>
                <Button
                  variant={"link"}
                  className="px-0 flex items-center gap-3"
                >
                  <LogOut size={15} className="rotate-180" />
                  Revenir aux catégories
                </Button>
              </Link>
              <div className="flex justify-between items-center animate-fade-in">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-black/80">
                    {category.name}
                  </h1>
                  {" - "}
                  <p className="font-semibold">
                    {category.posts.length} postes
                  </p>
                </div>
                <p>
                  Dernière publication : {formatDate(latestPostCreatedDate)}
                </p>
              </div>
              <Separator className="animate-fade-in" />
              <div className="animate-fade-in">
                <div className="space-y-4">
                  <Filter />
                  {postsLoading ? (
                    <>
                      <Skeleton className="w-full h-32 animate-pulse" />
                      <Skeleton className="w-full h-32 animate-pulse" />
                      <Skeleton className="w-full h-32 animate-pulse" />
                    </>
                  ) : (
                    <>
                      {posts && posts.length > 0 ? (
                        <>
                          {posts.map((post, index) => (
                            <CategoryPostsListItem
                              key={post.id}
                              post={post}
                              index={index}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <p className="text-gray-500">Aucun poste trouvé</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default CategoryPostsList;
