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
import PostCreateForm from "./form/PostCreateForm";

const PostCreateModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"}>Créer un post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[60%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Créer un post</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le points de créer un post, assurez vous d&apos;avoir
            renseigner tous les champs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <PostCreateForm>
            <AlertDialogFooter>
              <AlertDialogCancel>Retour</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Créer mon post</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </PostCreateForm>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostCreateModal;
