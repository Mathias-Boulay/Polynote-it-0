import TOTO from '@gocapsule/column-extension';
import { nodeInputRule, textblockTypeInputRule, wrappingInputRule } from '@tiptap/react';
import { ColumnBlock, Column } from '@gocapsule/column-extension';

const columnRegex = /^\/col/;

export const ExtendedColumn = ColumnBlock.extend({
  addInputRules() {
    return [
      {
        find: columnRegex,
        handler(props) {
          console.log('input rule triggered !');
          props.commands.setColumns(2);
        },
      },
    ];
  },
});
