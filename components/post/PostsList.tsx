"use client";

import { IPost } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import PostLoader from "./PostLoader";
import PostListItem from "./PostListItem";

const PostsList = () => {
  const { data: posts, isLoading } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: async () => ApiService.getAll<IPost>({ path: "posts" }),
    staleTime: 5 * 1000,
  });

  return (
    <div className="grid grid-cols-3 gap-5">
      {isLoading ? (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      ) : posts && posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucun poste trouvé</p>
      )}
    </div>
  );
};

export default PostsList;
