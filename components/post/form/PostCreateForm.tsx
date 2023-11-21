"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import PostSelectCategories from "./PostSelectCategories";
import ApiService from "@/utils/api.service";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
  categoryId: z.string().min(1),
});

const PostCreateForm = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [characterCount, setCharacterCount] = useState(0);

  function handleContentChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (value: string) => void
  ) {
    const { value } = event.target;
    setCharacterCount(value.length);
    onChange(value);
  }

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
                <Textarea
                  required
                  placeholder="Ecrire ici le contenu de votre poste..."
                  {...field}
                  onChange={(event) =>
                    handleContentChange(event, field.onChange)
                  }
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormDescription>
                  Assurez-vous d&apos;avoir écrit moins de 500 caractères.
                </FormDescription>
                {characterCount > 0 ? (
                  <div className="flex items-baseline gap-2 text-xs">
                    <span className=" text-black/50">Caractères</span>
                    <span
                      className={` ${
                        characterCount > 400
                          ? "text-red-500/50"
                          : characterCount > 200
                          ? "text-yellow-500/50"
                          : "text-black/50"
                      }`}
                    >
                      {characterCount}/500
                    </span>
                  </div>
                ) : null}
              </div>

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
        {children}
      </form>
    </Form>
  );
};

export default PostCreateForm;
