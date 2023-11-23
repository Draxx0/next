import { Button } from "@/components/ui/button";
import Link from "next/link";

const PostSelectCategoriesError = () => {
  return (
    <div className="w-full border rounded-md py-2 px-3 shadow-sm space-y-4">
      <p className="text-sm text-muted-foreground">Aucune catégorie trouvé</p>
      <Button>
        <Link href={"/categories/create"}>Créer une catégorie</Link>
      </Button>
    </div>
  );
};

export default PostSelectCategoriesError;
