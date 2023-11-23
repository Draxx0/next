import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { ICategory } from "@/types";
import Link from "next/link";
import CategoryListItemContextMenu from "./CategoryListItemContextMenu";
import { Button } from "../ui/button";

const CategoryListItem = ({
  category,
  index,
}: {
  category: ICategory;
  index: number;
}) => {
  const animationDelay = useMemo(() => index * 100, [index]);
  return (
    <CategoryListItemContextMenu category={category}>
      <Card
        className={`min-h-[250px] flex flex-col justify-between w-full border-neutral-200 opacity-0 animate-fade-in`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg max-w-[75%] font-semibold">
              {category.name}
            </h2>
            <span>
              {category.posts.length} poste
              {category.posts.length > 1 ? "s" : null}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="space-y-4">
            {category.posts.length > 0 ? (
              <>
                <span>Les 3 derniers postes de cette catégorie :</span>

                <ul className="space-y-2">
                  {category.posts.map((post) => (
                    <li key={post.id} className="underline">
                      - <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span>Aucun poste dans cette catégorie</span>
            )}
          </CardDescription>
        </CardContent>

        <CardFooter>
          {category.posts.length > 0 && (
            <div className="flex items-center justify-end w-full">
              <Button>
                <Link href={`/categories/${category.id}`}>Voir les postes</Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </CategoryListItemContextMenu>
  );
};

export default CategoryListItem;
