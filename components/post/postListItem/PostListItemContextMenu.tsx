"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "../../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/utils/api.service";
import { PencilLine, Trash } from "lucide-react";

const PostListItemContextMenu = ({
  postId,
  children,
}: {
  postId: string;
  children: React.ReactNode;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => ApiService.dlt({ path: "posts", id: postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
      toast({
        title: "Poste supprimé",
        description: "Le poste a été supprimé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur de suppression",
        description: "Une erreur est survenue lors de la suppression du poste",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset className="cursor-pointer">
          Modifier
          <ContextMenuShortcut>
            <PencilLine size={15} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={handleDelete}
          inset
          className="cursor-pointer"
        >
          Supprimer
          <ContextMenuShortcut>
            <Trash size={15} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PostListItemContextMenu;
