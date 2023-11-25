"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ApiService from "@/utils/api.service";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "@/types";
import useDetectSpace from "@/hook/useDetectSpace";

const formSchema = z.object({
  name: z.string().min(1).max(30),
});

const CategoryUpdateForm = ({
  children,
  category,
}: {
  children: React.ReactNode;
  category: ICategory;
}) => {
  const { data: currentPost, isLoading } = useQuery<ICategory>({
    queryKey: ["category", category.id],
    queryFn: () =>
      ApiService.getOne({ path: "categories", id: String(category.id) }),
    enabled: !!category,
    refetchOnWindowFocus: false,
  });

  useDetectSpace();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!isLoading && currentPost) {
      form.reset({
        name: currentPost.name,
      });
    }
  }, [isLoading, currentPost, form]);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isFormValid = await form.trigger();

    if (!isFormValid) {
      toast({
        title: "Erreur",
        description: "Le formulaire n'est pas valide !",
        variant: "destructive",
      });
      throw new Error("Form is not valid");
    }

    try {
      await ApiService.update({
        path: "/categories",
        id: String(category.id),
        body: values,
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
        exact: true,
      });

      form.reset();

      toast({
        title: "Succès",
        description: "Votre catégorie a bien été modifié !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la modification de la catégorie.",
        variant: "destructive",
      });
      throw error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la catégorie</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Ecrire ici le nom de la catégorie"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export default CategoryUpdateForm;
