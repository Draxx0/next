"use client";
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
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1).max(30),
});

const CategoryCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isFormValid) {
      toast({
        title: "Erreur",
        description: "Le formulaire n'est pas valide !",
        variant: "destructive",
      });
      throw new Error("Form is not valid");
    }

    try {
      await ApiService.post({
        path: "/categories",
        body: values,
      });

      queryClient.invalidateQueries({
        queryKey: ["categories"],
        exact: true,
      });

      form.reset();

      toast({
        title: "Succès",
        description: "Votre catégorie a bien été créé !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la création de la catégorie.",
        variant: "destructive",
      });
      throw error;
    }
  }

  const isFormValid = useMemo(() => {
    return form.formState.isValid;
  }, [form.formState.isValid]);

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
        <AlertDialogFooter>
          <AlertDialogCancel>Retour</AlertDialogCancel>
          {isFormValid ? (
            <AlertDialogAction asChild>
              <Button type="submit">Créer la catégorie</Button>
            </AlertDialogAction>
          ) : (
            <Button type="submit" disabled>
              Créer la catégorie
            </Button>
          )}
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default CategoryCreateForm;
