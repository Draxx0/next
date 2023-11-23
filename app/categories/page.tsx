import CategoriesList from "@/components/category/CategoriesList";
import CategoryCreateModal from "@/components/category/CategoryCreateModal";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function CategoriesListPage() {
  return (
    <>
      <div className="animate-page-transition absolute inset-0 w-screen h-screen"></div>
      <div className="max-w-[80%] mx-auto py-10 space-y-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-black/80">
            Liste des catégories
          </h1>
          <CategoryCreateModal />
        </div>
        <Separator />
        <CategoriesList />
      </div>
    </>
  );
}
