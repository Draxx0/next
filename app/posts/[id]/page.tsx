"use client";
import PostCategoryBadge from "@/components/post/postListItem/PostCategoryBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IPost } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { formatDate } from "@/utils/functions/formatDate";

const Post = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;

  const { data: post, isLoading } = useQuery<IPost>({
    queryKey: ["post", id],
    queryFn: () => ApiService.getOne({ path: "posts", id }),
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
          post && (
            <>
              <Link href={"/posts"}>
                <Button
                  variant={"link"}
                  className="px-0 flex items-center gap-3"
                >
                  <LogOut size={15} className="rotate-180" />
                  Revenir aux posts
                </Button>
              </Link>
              <div className="flex justify-between animate-fade-in">
                <h1 className="text-xl font-bold text-black/80">
                  {post.title}
                </h1>
                <div className="flex items-center gap-3">
                  <p>Publié le {formatDate(post.createdAt)}</p>
                  <PostCategoryBadge category={post.category} />
                </div>
              </div>
              <Separator className="animate-fade-in" />
              <div
                className="animate-fade-in"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Post;
