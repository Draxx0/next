import PostCreateModal from "@/components/post/PostCreateModal";
import PostsList from "@/components/post/PostsList";
import { Separator } from "@/components/ui/separator";
const PostListPage = async () => {
  return (
    <>
      <div className="animate-page-transition absolute inset-0 w-screen h-screen"></div>
      <div className="max-w-[80%] mx-auto py-10 space-y-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-black/80">Liste des postes</h1>
          <PostCreateModal />
        </div>
        <Separator />
        <PostsList />
      </div>
    </>
  );
};

export default PostListPage;
