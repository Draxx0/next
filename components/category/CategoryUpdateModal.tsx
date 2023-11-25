import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { ICategory } from "@/types";
import CategoryUpdateForm from "./form/CategoryUpdateForm";

const CategoryUpdateModal = ({
  category,
  children,
}: {
  category: ICategory;
  children: React.ReactNode;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[60%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Modifier une catégorie</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le points de modifier une catégorie !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <CategoryUpdateForm category={category}>
            <AlertDialogFooter>
              <AlertDialogCancel>Retour</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Modifier la catégorie</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </CategoryUpdateForm>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryUpdateModal;
