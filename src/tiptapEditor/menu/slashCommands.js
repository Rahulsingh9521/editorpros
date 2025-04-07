import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export default Extension.create({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        cahr: "/",
        command: ({ editor, props, range }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
