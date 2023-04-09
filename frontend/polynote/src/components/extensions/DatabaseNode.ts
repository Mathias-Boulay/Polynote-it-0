import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, textblockTypeInputRule } from '@tiptap/react';

import { DatabaseBlock } from '../blocks/database/database';

export default Node.create({
  name: 'databaseBlock',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      columns: {
        default: [],
        parseHTML: (element) => element.getAttribute('data-columns'),
        renderHTML: (attributes) => {
          return {
            'data-columns': JSON.stringify(attributes.columns),
          };
        },
      },

      rows: {
        default: [],
        parseHTML: (element) => element.getAttribute('data-rows'),
        renderHTML: (attributes) => {
          return {
            'data-rows': JSON.stringify(attributes.rows),
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'database-block',
      },
    ];
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: new RegExp(`^/db`),
        type: this.type,
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['database-block', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DatabaseBlock);
  },
});
