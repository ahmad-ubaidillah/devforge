import { createSignal, onMount } from 'solid-js';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

export function TipTapEditor(props: { initialContent: string; onSave: (content: string) => void }) {
  let editorElement: HTMLDivElement;
  const [editor, setEditor] = createSignal<Editor | null>(null);

  onMount(() => {
    const tiptapEditor = new Editor({
      element: editorElement,
      extensions: [StarterKit],
      content: props.initialContent || '<p>Hello World!</p>',
      onUpdate: ({ editor }) => {
        props.onSave(editor.getHTML());
      },
    });
    setEditor(tiptapEditor);
  });

  return (
    <div class="tiptap-editor-container bg-white p-4 border rounded shadow-sm">
      <div ref={editorElement!} class="prose max-w-none min-h-[300px] focus:outline-none" />
      <button
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition"
        onClick={() => {
          if (editor()) {
            props.onSave(editor()!.getHTML());
          }
        }}
      >
        Save Post
      </button>
    </div>
  );
}
