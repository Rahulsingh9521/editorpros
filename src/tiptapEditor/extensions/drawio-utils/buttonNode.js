import { Node } from "@tiptap/vue-3";

export default Node.create({
  name: "buttonNode",

  group: "block",

  addAttributes() {
    return {
      class: {
        default: "drawio-button",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "button[data-type='drawioButton']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["button", HTMLAttributes, 0];
  },
});
