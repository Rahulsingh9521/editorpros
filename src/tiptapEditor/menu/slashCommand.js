import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
// import render from "./suggestion.js";

export default Extension.create({
  name: "slscommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, props, range }) => {
          console.log(
            "🚀 ~ file: slashCommand.js ~ line 26 ~ command: ~ props"
          );
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
