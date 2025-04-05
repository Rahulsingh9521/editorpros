import { Node } from "@tiptap/core";

export default Node.create({
  name: "drawioImage",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "500px",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", HTMLAttributes];
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
