"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiService from "@/utils/api.service";
import { PencilLine, Trash } from "lucide-react";
import { ICategory } from "@/types";
import { useToast } from "../ui/use-toast";
import CategoryDeleteConfirmModal from "./CategoryDeleteConfirmModal";
import CategoryUpdateModal from "./CategoryUpdateModal";

const CategoryListItemContextMenu = ({
  category,
  children,
}: {
  category: ICategory;
  children: React.ReactNode;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () =>
      ApiService.dlt({ path: "categories", id: String(category.id) }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
      toast({
        title: "Catégorie supprimé",
        description: "La catégorie a été supprimé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur de suppression",
        description:
          "Une erreur est survenue lors de la suppression de la catégorie",
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
          <CategoryUpdateModal category={category}>
            <span className="flex items-center w-full justify-between">
              Modifier
              <ContextMenuShortcut>
                <PencilLine size={15} />
              </ContextMenuShortcut>
            </span>
          </CategoryUpdateModal>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CategoryDeleteConfirmModal deleteFunction={handleDelete}>
            <span className="flex items-center w-full justify-between">
              Supprimer
              <ContextMenuShortcut>
                <Trash size={15} />
              </ContextMenuShortcut>
            </span>
          </CategoryDeleteConfirmModal>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default CategoryListItemContextMenu;
