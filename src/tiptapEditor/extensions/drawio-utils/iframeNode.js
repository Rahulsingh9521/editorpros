import { Node } from "@tiptap/core";

export default Node.create({
  name: "drawioIframe",

  group: "block",

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", HTMLAttributes];
  },

  // addCommands() {
  //     return {
  //         setDrawioIframe: (options) => ({ commands }) => {
  //             return commands.insertContent({
  //                 type: this.name,
  //                 attrs: options,
  //             });
  //         },
  //     };
  // },
});
