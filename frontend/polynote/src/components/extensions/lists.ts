import List from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TextStyle from '@tiptap/extension-text-style';
import { textblockTypeInputRule, wrappingInputRule } from '@tiptap/react';

/**
 * Extend the commands on the heading extension,
 * input rules are copy pasted from the extensions
 */

const bulletListRegex = /^\/ul/;

export const ExtendedBulletList = List.extend({
  addInputRules() {
    let inputRule = wrappingInputRule({
      find: bulletListRegex,
      type: this.type,
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: bulletListRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyle.name);
        },
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});

const orderedListRegex = /^\/ol/;

export const ExtendedOrderedList = OrderedList.extend({
  addInputRules() {
    let inputRule = wrappingInputRule({
      find: orderedListRegex,
      type: this.type,
    });

    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = wrappingInputRule({
        find: orderedListRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyle.name);
        },
        editor: this.editor,
      });
    }
    return [inputRule];
  },
});
