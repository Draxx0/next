import { Badge } from "../ui/badge";

const PostCategoryBadge = ({ category }: { category: string }) => {
  return <Badge variant="outline">{category}</Badge>;
};

export default PostCategoryBadge;
