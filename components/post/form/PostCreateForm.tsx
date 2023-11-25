"use client";
import { useMemo, useState } from "react";
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
import PostSelectCategories from "./PostSelectCategories";
import ApiService from "@/utils/api.service";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/common/Tiptap";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(2000),
  categoryId: z.string().min(1),
});

const PostCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  const [characterCount, setCharacterCount] = useState(0);

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
        path: "/posts",
        body: values,
      });

      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });

      form.reset();

      setCharacterCount(0);

      toast({
        title: "Succès",
        description: "Votre post a bien été créé !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du post.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du post</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Ecrire ici le titre de votre poste..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu du post</FormLabel>
              <FormControl>
                <Tiptap
                  characterCount={characterCount}
                  setCharacterCount={setCharacterCount}
                  onChange={(content) => field.onChange(content)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <PostSelectCategories field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Retour</AlertDialogCancel>
          {isFormValid ? (
            <AlertDialogAction asChild>
              <Button type="submit">Créer mon post</Button>
            </AlertDialogAction>
          ) : (
            <Button type="submit" disabled>
              Créer mon post
            </Button>
          )}
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default PostCreateForm;
