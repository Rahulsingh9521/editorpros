import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import drawioComponent from "./drawioComponent.vue";

const DrawioNode = Node.create({
  name: "drawio",

  group: "block",
  //   content: "block*", // Allow block elements (like iframe, img)
  atom: true,
  selectable: true,
  draggable: true,
  allowGapCursor: true,

  addAttributes() {
    return {
      url: {
        default: "",
      },
      isCreated: {
        default: false, // Initially, the diagram is not created
      },
      class: {
        default: "drawio-wrapper",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-drawio]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", HTMLAttributes.class];
  },

  addNodeView() {
    return VueNodeViewRenderer(drawioComponent);
  },

  addCommands() {
    return {
      insertDrawio:
        (options) =>
        ({ commands, editor }) => {
          const { from } = editor.state.selection;
          return commands.insertContentAt(from, [
            {
              type: this.name,
              attrs: {
                url: options.url,
                isCreated: true,
              },
            },
            { type: "paragraph", content: "" },
          ]);
        },
    };
  },
});

export default DrawioNode;
