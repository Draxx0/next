"use client";
import { useEffect, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IPost } from "@/types";
import Tiptap from "@/components/common/Tiptap";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
  categoryId: z.string().min(1),
});

const PostUpdateForm = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: IPost;
}) => {
  const { data: currentPost, isLoading } = useQuery<IPost>({
    queryKey: ["post", post.id],
    queryFn: () => ApiService.getOne({ path: "posts", id: String(post.id) }),
    enabled: !!post,
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (!isLoading && currentPost) {
      form.reset({
        title: currentPost.title,
        content: currentPost.content,
        categoryId: String(currentPost.categoryId),
      });
      setCharacterCount(currentPost.content.length);
    }
  }, [isLoading, currentPost, form]);

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [characterCount, setCharacterCount] = useState(
    currentPost?.content.length || 0
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isFormValid = await form.trigger();

    console.log("submitted");

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
        path: "/posts",
        id: String(post.id),
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
        description: "Votre post a bien été modifié !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du post.",
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
                <Tiptap
                  characterCount={characterCount}
                  defaultContent={post.content}
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
              <PostSelectCategories
                field={field}
                defaultCategoryId={String(post.categoryId)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export default PostUpdateForm;
