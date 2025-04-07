import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import drawioComponent from "./drawioComponent.vue";

const DrawioNode = Node.create({
  name: "drawio",

  group: "block",
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
        default: false,
      },
      calss: {
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
      insertDraiwo: (options) => {
        ({ commands, editor }) => {
          const { form } = editor.state.selection;
          return commands.insertConstAt(form, [
            {
              type: this.name,
              attrs: {
                url: options.url,
                isCreated: false,
              },
            },
            { type: "paragraph", content: "" },
          ]);
        };
      },
    };
  },
});

export default DrawioNode;
