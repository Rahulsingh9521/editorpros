import { mergeAttributes } from "@tiptap/core";
import CodeBlock from "@tiptap/extension-code-block";
import Prism, { languages } from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";

export const codeBlockExtend = CodeBlock.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: "javascript",
      },
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const language = HTMLAttributes.language || "javascript";
    const languageClass = `language-${language}`;

    const heightlightedCode = Prism.highlight(
      node.textContent,
      Prism.languages[language],
      language
    );

    return [
      "pre",
      mergeAttributes(HTMLAttributes),
      ["code", { class: languageClass }, heightlightedCode],
    ];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setCodeBlockLanguage:
        (language) =>
        ({ commands }) => {
          return commands.updateAttributes("codeBlock", { language });
        },
    };
  },
});
