"use client";

import { IPost } from "@/types";
import ApiService from "@/utils/api.service";
import { useQuery } from "@tanstack/react-query";
import PostLoader from "./PostLoader";
import PostListItem from "./postListItem/PostListItem";
import PostCreateModal from "./PostCreateModal";
import useApiQueryStore from "@/store/apiQueryStore";
import Filter from "../common/Filter";
import { useEffect } from "react";

const PostsList = () => {
  const { orderBy } = useApiQueryStore();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: async () =>
      ApiService.getAll<IPost>({ path: "posts", query: { orderBy } }),
    staleTime: 5 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [orderBy, refetch]);

  return (
    <>
      <Filter />
      <div className="grid grid-cols-3 gap-5">
        {isLoading ? (
          <>
            <PostLoader />
            <PostLoader />
            <PostLoader />
          </>
        ) : posts && posts.length > 0 ? (
          <>
            {posts.map((post, index) => (
              <PostListItem key={post.id} post={post} index={index} />
            ))}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-gray-500">Aucun poste trouvé</p>
            <PostCreateModal />
          </div>
        )}
      </div>
    </>
  );
};

export default PostsList;
