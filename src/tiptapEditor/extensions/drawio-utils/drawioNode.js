import { Node } from "@tiptap/core";

export const DrawioNode = Node.create({
  name: "drawio",

  group: "block",

  addAttributes() {
    return {
      imageSrc: {
        default: null,
      },
      alt: {
        default: null,
      },
      iframeUrl: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "drawio",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", HTMLAttributes];
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("div");
      dom.classList.add("drawio");

      const image = document.createElement("img");

      if (node.attrs.imageSrc) {
        image.src = node.attrs.imageSrc;
      }

      if (node.attrs.alt) {
        image.alt = node.attrs.alt;
      }

      if (node.attrs.width) {
        image.width = node.attrs.width;
      }

      if (node.attrs.height) {
        image.height = node.attrs.height;
      }

      dom.appendChild(image);

      return {
        dom,
      };
    };
  },

  addCommands() {
    return {
      insertDrawio:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "drawio",
            attrs: {
              imageSrc: attributes.imageSrc,
              alt: attributes.alt,
              iframeUrl: attributes.iframeUrl,
              width: attributes.width,
              height: attributes.height,
            },
          });
        },
    };
  },
});
