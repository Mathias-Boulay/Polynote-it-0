import React from 'react';

// src/Tiptap.jsx
import Document from '@tiptap/extension-document';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DragBlock from './blocks/dragBlock';

// Force every component to be wrapped inside drag group
const CustomDocument = Document.extend({
  content: 'drag+',
});

export function Editor() {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      DragBlock,
    ],

    content: `
    <drag-block><p>Hello World!</p></drag-block>
    <drag-block><p>Hello World!</p></drag-block>
    <p>toto</p>`,
  });

  return <EditorContent editor={editor} />;
}
