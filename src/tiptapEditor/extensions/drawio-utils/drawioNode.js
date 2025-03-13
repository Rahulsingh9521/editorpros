import { Node, mergeAttributes } from "@tiptap/core";

export const DrawioNode = Node.create({
  name: "drawio",

  group: "block",

  atom: true, // It's a single, non-editable element

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
      class: {
        default: "drawio-container", // Default CSS class
      },
      // You can add more attributes as needed
    };
  },

  parseHTML() {
    return [
      {
        tag: "div.drawio-container img",
        getAttrs: (element) => ({
          src: element.getAttribute("src"),
          width: element.parentElement.style.width || "100%",
          height: element.parentElement.style.height || "500px",
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`,
        class: HTMLAttributes.class,
      }),
      ["img", { src: HTMLAttributes.src }],
    ];
  },

  addCommands() {
    return {
      insertDrawio:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
