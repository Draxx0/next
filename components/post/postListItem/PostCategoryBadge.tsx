import { Badge } from "../../ui/badge";

const PostCategoryBadge = ({ category }: { category: string }) => {
  return (
    <Badge className="whitespace-nowrap" variant="outline">
      {category}
    </Badge>
  );
};

export default PostCategoryBadge;
