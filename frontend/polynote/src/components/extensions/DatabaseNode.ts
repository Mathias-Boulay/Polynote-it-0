import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, textblockTypeInputRule } from '@tiptap/react';

import { DatabaseBlock } from '../blocks/database/database';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

export default Node.create({
  name: 'databaseBlock',

  group: 'block',

  content: 'inline*',

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
    // FIXME For some reason, I can't make the NodeViewWrapper works as I want.
    return ReactNodeViewRenderer(DatabaseBlock);
  },
});
