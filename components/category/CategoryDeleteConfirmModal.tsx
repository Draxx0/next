import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

const CategoryDeleteConfirmModal = ({
  deleteFunction,
  children,
}: {
  deleteFunction: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
        asChild
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etes vous vraiment sûre ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer cette catégorie, cette action
            aura pour effet de supprimer tous les postes liés catégorie.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Retour</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFunction}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDeleteConfirmModal;
