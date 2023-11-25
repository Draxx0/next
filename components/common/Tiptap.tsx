"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { FormDescription } from "../ui/form";

const Tiptap = ({
  onChange,
  characterCount,
  setCharacterCount,
}: {
  onChange: (content: string) => void;
  characterCount: number;
  setCharacterCount: (value: number) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold.configure({ HTMLAttributes: { class: "font-bold" } }),
      Underline,
      Strike,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        itemTypeName: "listItem",
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
      setCharacterCount(editor.getText().length);
    },

    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[96px] max-h-[250px] overflow-y-scroll border border-input bg-transparent px-3 py-2 text-sm shadow-sm rounded-md",
      },
    },
    injectCSS: true,
  });

  return (
    <div className="flex flex-col gap-3">
      {editor && (
        <>
          <ToggleGroup
            className="justify-start bg-gray-900 px-4 py-2 gap-4 text-white rounded-sm "
            type="multiple"
            variant={"default"}
          >
            <ToggleGroupItem
              aria-pressed={editor.isActive("bold")}
              data-state={editor.isActive("bold") ? "on" : "off"}
              onClick={() => editor.chain().focus().toggleBold().run()}
              value="bold"
              aria-label="Toggle bold"
            >
              <BoldIcon size={13} />
            </ToggleGroupItem>

            <ToggleGroupItem
              aria-pressed={editor.isActive("italic")}
              data-state={editor.isActive("italic") ? "on" : "off"}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              value="italic"
              aria-label="Toggle italic"
            >
              <Italic size={13} />
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-pressed={editor.isActive("underline")}
              data-state={editor.isActive("underline") ? "on" : "off"}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              value="underline"
              aria-label="Toggle underline"
            >
              <UnderlineIcon size={13} />
            </ToggleGroupItem>

            <ToggleGroupItem
              aria-pressed={editor.isActive("heading", { level: 1 })}
              data-state={
                editor.isActive("heading", { level: 1 }) ? "on" : "off"
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              value="h1"
              aria-label="Toggle h1"
            >
              <Heading1 size={13} />
            </ToggleGroupItem>

            <ToggleGroupItem
              aria-pressed={editor.isActive("heading", { level: 2 })}
              data-state={
                editor.isActive("heading", { level: 2 }) ? "on" : "off"
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              value="h2"
              aria-label="Toggle h2"
            >
              <Heading2 size={13} />
            </ToggleGroupItem>

            <ToggleGroupItem
              aria-pressed={editor.isActive("heading", { level: 3 })}
              data-state={
                editor.isActive("heading", { level: 3 }) ? "on" : "off"
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              value="h3"
              aria-label="Toggle h3"
            >
              <Heading3 size={13} />
            </ToggleGroupItem>

            <ToggleGroupItem
              aria-pressed={editor.isActive("bulletList")}
              data-state={editor.isActive("bulletList") ? "on" : "off"}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              value="bullet list"
              aria-label="Toggle bullet list"
            >
              <List size={13} />
            </ToggleGroupItem>

            <ToggleGroupItem
              value="strike"
              aria-label="Toggle strike"
              aria-pressed={editor.isActive("strike")}
              data-state={editor.isActive("strike") ? "on" : "off"}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <StrikethroughIcon size={13} />
            </ToggleGroupItem>
          </ToggleGroup>

          <EditorContent editor={editor} />

          <div className="flex justify-between items-center">
            <FormDescription>
              Assurez-vous d&apos;avoir écrit moins de 2000 caractères.
            </FormDescription>
            {characterCount > 0 ? (
              <div className="flex items-baseline gap-2 text-xs">
                <span className=" text-black/50">Caractères</span>
                <span
                  className={` ${
                    characterCount > 1800
                      ? "text-red-500/50"
                      : characterCount > 1500
                      ? "text-yellow-500/50"
                      : "text-black/50"
                  }`}
                >
                  {characterCount}/2000
                </span>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Tiptap;
