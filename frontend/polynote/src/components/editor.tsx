import React from 'react';

// src/Tiptap.jsx
import Document from '@tiptap/extension-document';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import DragBlock from './blocks/dragBlock';
import { CustomStrike } from './extensions/commands';
import { ExtendedHeading } from './extensions/headings';
import { ExtendedBulletList, ExtendedOrderedList } from './extensions/lists';
import ColumnExtension from '@gocapsule/column-extension';
import { ExtendedColumn } from './extensions/columns';
import { ExtendedImage } from './extensions/img';
import { ExtendedTable } from './extensions/tables';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';

// Force every component to be wrapped inside drag group
const CustomDocument = Document.extend({
  content: 'drag+ | block+',
});

export function Editor() {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
        strike: false,
        heading: false,
        bulletList: false,
        orderedList: false,
      }),

      ColumnExtension.configure({
        columnBlock: false,
      }),
      ExtendedColumn,
      CustomStrike,
      ExtendedHeading,
      ExtendedBulletList,
      ExtendedOrderedList,
      ExtendedImage,
      TableCell,
      TableRow,
      TableHeader,
      ExtendedTable,
      DragBlock,
    ],

    content: `
    <drag-block><p>Hello World!</p></drag-block>
    <drag-block><p>Hello World!</p></drag-block>
    <p>toto</p>`,
  });

  return <EditorContent editor={editor} />;
}
