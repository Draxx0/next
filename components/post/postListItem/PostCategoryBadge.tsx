import Link from "next/link";
import { Badge } from "../../ui/badge";
import { ICategory } from "@/types";

const PostCategoryBadge = ({
  category,
}: {
  category: Omit<ICategory, "posts">;
}) => {
  return (
    <Link href={`/categories/${category.id}`} className="group">
      <Badge
        className="whitespace-nowrap group-hover:bg-gray-900 group-hover:text-white cursor-pointer"
        variant="outline"
      >
        {category.name}
      </Badge>
    </Link>
  );
};

export default PostCategoryBadge;
