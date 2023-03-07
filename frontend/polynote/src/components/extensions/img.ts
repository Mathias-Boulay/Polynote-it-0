import Image from '@tiptap/extension-image';
import { nodeInputRule, textblockTypeInputRule } from '@tiptap/react';

const imageRegex =
  /\/img\((https?:\/\/(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*))\)/;

export const ExtendedImage = Image.extend({
  addInputRules() {
    return [
      {
        find: new RegExp(imageRegex),

        handler: (props) => {
          console.log(props);
          console.log(this);
          props.chain().setTextSelection(props.range).deleteSelection().setImage({
            src: props.match[1],
          });
        },
      },
    ];
  },
});
