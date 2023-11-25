import { IPost } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../ui/card";
import { Button } from "../../ui/button";
import PostCategoryBadge from "./PostCategoryBadge";
import Link from "next/link";
import PostListItemContextMenu from "./PostListItemContextMenu";
import { useMemo } from "react";
import { formatDate } from "@/utils/functions/formatDate";

const PostListItem = ({ post, index }: { post: IPost; index: number }) => {
  const animationDelay = useMemo(() => index * 100, [index]);
  return (
    <PostListItemContextMenu post={post}>
      <Card
        className={`min-h-[400px] flex flex-col justify-between border-neutral-200 opacity-0 animate-fade-in`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div>
          <CardHeader>
            <div className="flex items-start justify-between w-full">
              <div className="space-y-1">
                <h2 className="text-lg max-w-[75%] font-semibold">
                  {post.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.createdAt)}
                </p>
              </div>
              <PostCategoryBadge category={post.category.name} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="break-words">
              <span>
                {post.content.length > 500 ? (
                  <>
                    {post.content.slice(0, 600)}
                    <span className="text-gray-500">...</span>
                  </>
                ) : (
                  post.content
                )}
              </span>
            </CardDescription>
          </CardContent>
        </div>
        <CardFooter className="justify-end">
          <Link href={`/posts/${post.id}`}>
            <Button>Lire plus</Button>
          </Link>
        </CardFooter>
      </Card>
    </PostListItemContextMenu>
  );
};

export default PostListItem;
