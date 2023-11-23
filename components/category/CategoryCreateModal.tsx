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
import CategoryCreateForm from "./form/CategoryCreateForm";

const CategoryCreateModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"}>Créer une catégorie</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[60%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Créer une catégorie</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le points de créer une catégorie.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <CategoryCreateForm />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryCreateModal;
