// Use the ~single tilde~ markdown shortcut
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import { markInputRule } from '@tiptap/core';
import { Extension, nodeInputRule, textblockTypeInputRule } from '@tiptap/react';

// Default:
// const inputRegex = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/

// New:
const inputRegex = /(?:^|\s)((?:~)((?:[^~]+))(?:~))$/;

export const CustomStrike = Strike.extend({
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
});
