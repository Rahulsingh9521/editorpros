import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import MermaidComponent from "./MermaidComponent.vue";

export const Mermaid = Node.create({
  name: "mermaid",

  group: "block",

  selectable: false,

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      content: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-content"),
        renderHTML: (attributes) => ({
          "data-content": attributes.content,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="mermaid"]',
        getAttrs: (element) => {
          return element.getAttribute("data-content");
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        "data-type": "mermaid",
        ...HTMLAttributes,
      },
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(MermaidComponent);
  },
});
