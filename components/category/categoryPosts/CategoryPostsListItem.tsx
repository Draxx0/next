import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IPost } from "@/types";
import { formatDate } from "@/utils/functions/formatDate";
import Link from "next/link";
import { useMemo } from "react";

const CategoryPostsListItem = ({
  post,
  index,
}: {
  post: Omit<IPost, "category">;
  index: number;
}) => {
  const animationDelay = useMemo(() => index * 100, [index]);
  return (
    <Card
      className={`w-full flex flex-col justify-between border-neutral-200 opacity-0 animate-fade-in`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div>
        <CardHeader>
          <div className="flex items-start justify-between w-full">
            <h2 className="text-lg max-w-[75%] font-semibold">{post.title}</h2>
            <p className="text-muted-foreground text-sm">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="break-words">
            <span>
              {post.content.length > 500 ? (
                <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, 600),
                    }}
                  />
                  <span className="text-gray-500">...</span>
                </>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
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
  );
};

export default CategoryPostsListItem;
