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
import DatabaseNode from './extensions/DatabaseNode';
import { Transaction } from '@tiptap/pm/state';

// Force every component to be wrapped inside drag group
const CustomDocument = Document.extend({
  content: 'drag+ | block+',
});

export interface EditorOptions {
  documentData: any; // Technically, json stuff
  onChange(newDocumentData: any): void;
}

export const Editor: React.FC<EditorOptions> = (props) => {
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
      DatabaseNode,
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

    onUpdate: (newProps) => {
      props.onChange(newProps.editor.getJSON());
    },

    content: props.documentData
      ? props.documentData
      : `
    <drag-block><p>Hello There</p></drag-block>
    <drag-block><p>You can write and drag these blocks</p></drag-block>
    <p>toto</p>
    <drag-block><database-block></database-block></drag-block>`,
  });

  return (
    <div>
      <EditorContent editor={editor} />
      {/* <DatabaseBlock /> */}
    </div>
  );
};
