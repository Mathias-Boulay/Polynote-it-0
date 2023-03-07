import Table from '@tiptap/extension-table';
import { InputRule } from '@tiptap/react';

const WIDTH_LIMIT = 5;
const HEIGHT_LIMIT = 10;

const inputRules: InputRule[] = new Array<InputRule>();
for (let width = 0; width < WIDTH_LIMIT; ++width) {
  for (let height = 0; height < HEIGHT_LIMIT; ++height) {
    inputRules.push({
      find: new RegExp(`^/table(${width + 1})[xX](${height + 1})`),
      handler(props) {
        props.chain().setTextSelection(props.range).deleteSelection();
        props.commands.insertTable({
          rows: height + 1,
          cols: width + 1,
          withHeaderRow: true,
        });
      },
    });
  }
}

export const ExtendedTable = Table.extend({
  addInputRules() {
    console.log(inputRules);
    return inputRules;
  },
});
