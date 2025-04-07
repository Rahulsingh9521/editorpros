import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

// import Document from "@tiptap/extension-document";
import slashCommand from "../menu/slashCommand.js";
import suggestion from "../menu/suggestion.js";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import GlobalDragHandle from "../darg-utils/dragable.js";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { CodeBlockPrism } from "./codeBlock/tiptap-extension-code-block-prism.js";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Dropcursor from "@tiptap/extension-dropcursor";
import UplodImage from "./imageUploadExtension.js";
import drawio from "./drawioExtentionLib/drwioNode.js";
import { Mermaid } from "./mermaidExtensionLib/mermaidExtension.js";

export default [
  StarterKit.configure({
    codeBlock: {
      HTMLAttributes: {
        class: "CodeBlock",
      },
    },
    code: {
      HTMLAttributes: {
        class: "inlineCode",
      },
    },
  }),
  Image,
  Dropcursor.configure({
    color: "#aeddfd",
    width: 10,
  }),
  CodeBlockPrism.configure({
    defaultLanguage: "jsx",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph", "uploadImage", "image", "table"],
    alignments: ["left", "center", "right"],
  }),
  Subscript,
  Superscript,
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: "highLighter",
    },
  }),
  UplodImage.configure({
    uploadFn: ImageUploadFucntion,
    inline: true,
  }),
  drawio,
  Link.configure({
    openOnClick: false,
    defaultProtocol: "https",
    autolink: false,
    HTMLAttributes: {
      class: "linkUrl",
    },
  }),
  Underline,
  GlobalDragHandle,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name !== "drawio") {
        return "Type / to browse options";
      }
      return "";
    },
  }),
  TextStyle.configure({
    mergeNestedSpanStyles: true,
  }),
  FontFamily.configure({
    types: ["textStyle"],
  }),
  Mermaid,
  slashCommand.configure({
    suggestion,
  }),
  Table.configure({
    resizable: true,
    allowTableNodeSelection: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];

function ImageUploadFucntion(file) {
  const uploadPromise = new Promise((res) => {
    let somefile = new FileReader();

    somefile.readAsDataURL(file);

    setTimeout(() => {
      res(somefile.result);
    }, 1000);
  });

  return uploadPromise;
}
