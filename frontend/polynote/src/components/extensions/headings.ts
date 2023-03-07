import Heading from '@tiptap/extension-heading';
import { textblockTypeInputRule } from '@tiptap/react';

/**
 * Extend the commands on the heading extension
 */

export const ExtendedHeading = Heading.extend({
  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^/h${level}`),
        type: this.type,
        getAttributes: {
          level,
        },
      });
    });
  },
});
