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

const PostListItem = ({ post, index }: { post: IPost; index: number }) => {
  const animationDelay = index * 100;
  return (
    <PostListItemContextMenu postId={String(post.id)}>
      <Card
        className={`min-h-[400px] flex flex-col justify-between border-neutral-200 opacity-0 animate-fade-in`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div>
          <CardHeader>
            <div className="flex items-start justify-between w-full">
              <h2 className="text-lg max-w-[75%] font-semibold">
                {post.title}
              </h2>
              <PostCategoryBadge category={post.category.name} />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
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
