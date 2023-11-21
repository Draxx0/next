import { IPost } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import PostCategoryBadge from "./PostCategoryBadge";
import Link from "next/link";

const PostListItem = ({ post }: { post: IPost }) => {
  return (
    <Card className="min-h-[400px] flex flex-col justify-between border-neutral-200">
      <div>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold">{post.title}</h2>
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
        <Button>
          <Link href={`/posts/${post.id}`}>
            <p>Lire plus</p>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostListItem;
