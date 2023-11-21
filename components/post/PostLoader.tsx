"use client";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostLoader = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-full h-6 animate-pulse" />
      <Skeleton className="w-full h-48 animate-pulse" />
    </div>
  );
};

export default PostLoader;
