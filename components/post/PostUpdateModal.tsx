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
import PostUpdateForm from "./form/PostUpdateForm";
import { IPost } from "@/types";

const PostUpdateModal = ({
  post,
  children,
}: {
  post: IPost;
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
          <AlertDialogTitle>Modifier un post</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le points de modifier un post !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <PostUpdateForm post={post}>
            <AlertDialogFooter>
              <AlertDialogCancel>Retour</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit">Modifier mon post</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </PostUpdateForm>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostUpdateModal;
