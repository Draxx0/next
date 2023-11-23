"use client";
import PostCategoryBadge from "@/components/post/postListItem/PostCategoryBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ICategory, IPost } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LogOut } from "lucide-react";

const CategoryPostsList = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  const { data: category, isLoading } = useQuery<ICategory>({
    queryKey: ["categories", id],
    queryFn: () => ApiService.getOne({ path: "categories", id }),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

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
            </>
          )
        )}
      </div>
    </>
  );
};

export default CategoryPostsList;
