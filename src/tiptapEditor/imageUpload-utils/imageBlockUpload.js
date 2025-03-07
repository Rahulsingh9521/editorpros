import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export const ImageUploadNode = Node.create({
  name: "imageUpload",

  group: "block",

  content: "paragraph*",

  parseHTML() {
    return [{ tag: "div[data-image-upload]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-image-upload": "" }),
      0,
    ];
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: null,
      },
      align: {
        default: "left",
      },
    };
  },

  addCommands() {
    return {
      insertImageUpload:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [{ type: "paragraph" }],
          });
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        view: (editorView) => {
          let tippyInstance = null;

          const createTippy = (dom, pos) => {
            if (tippyInstance) {
              tippyInstance.destroy();
            }

            const popup = document.createElement("div");
            popup.style.display = "flex";
            popup.style.flexDirection = "column";
            popup.style.padding = "10px";
            popup.style.background = "#fff";
            popup.style.border = "1px solid #ccc";
            popup.style.borderRadius = "5px";
            popup.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";

            const widthInput = document.createElement("input");
            widthInput.type = "number";
            widthInput.placeholder = "Width";
            widthInput.value =
              editorView.state.doc.nodeAt(pos).attrs.width || "";
            widthInput.addEventListener("change", (e) => {
              const width = e.target.value ? parseInt(e.target.value) : null;
              editorView.dispatch(
                editorView.state.tr.setNodeMarkup(pos, undefined, {
                  ...editorView.state.doc.nodeAt(pos).attrs,
                  width,
                })
              );
            });
            popup.appendChild(widthInput);

            const alignSelect = document.createElement("select");
            const aligns = ["left", "center", "right"];
            aligns.forEach((align) => {
              const option = document.createElement("option");
              option.value = align;
              option.textContent = align;
              if (editorView.state.doc.nodeAt(pos).attrs.align === align) {
                option.selected = true;
              }
              alignSelect.appendChild(option);
            });
            alignSelect.addEventListener("change", (e) => {
              const align = e.target.value;
              editorView.dispatch(
                editorView.state.tr.setNodeMarkup(pos, undefined, {
                  ...editorView.state.doc.nodeAt(pos).attrs,
                  align,
                })
              );
            });
            popup.appendChild(alignSelect);

            tippyInstance = tippy(dom, {
              content: popup,
              interactive: true,
              placement: "bottom",
              onHidden: () => {
                tippyInstance = null;
              },
            });
          };

          return {
            update: (view, prevState) => {
              view.state.doc.descendants((node, pos) => {
                if (node.type.name === this.name) {
                  const dom = view.nodeDOM(pos);
                  if (dom && !dom.querySelector('input[type="file"]')) {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.addEventListener("change", (event) => {
                      const file = event.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const src = e.target.result;
                          const nodePos = pos;
                          const transaction = view.state.tr
                            .replaceWith(
                              nodePos,
                              nodePos + node.nodeSize,
                              ProseMirrorNode.fromJSON(view.state.schema, {
                                type: "image",
                                attrs: { src, width: null, align: "left" },
                              })
                            )
                            .setSelection(
                              view.state.tr.selection.constructor.create(
                                view.state.tr.doc,
                                nodePos
                              )
                            );
                          view.dispatch(transaction);
                        };
                        reader.readAsDataURL(file);
                      }
                    });
                    dom.appendChild(input);
                  }
                }
                if (node.type.name === "image") {
                  const dom = view.nodeDOM(pos);
                  if (dom && !tippyInstance) {
                    createTippy(dom, pos);
                  }
                }
              });
            },

            destroy: () => {
              if (tippyInstance) {
                tippyInstance.destroy();
              }
            },
          };
        },
      }),
    ];
  },
});
