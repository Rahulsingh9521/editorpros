import StarterKit from "@tiptap/starter-kit";
import slashCommand from "../menu/slashCommand.js";
import suggestion from "../menu/suggestion.js";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import GlobalDragHandle from "./darg-utils/dragable.js";
import Placeholder from "@tiptap/extension-placeholder";

export default [
  StarterKit,
  // Draggable.configure({
  //   buttonElement: document.querySelector('#dragButton'),
  // }),
  GlobalDragHandle,
  Placeholder.configure({
    placeholder: "Type / to browse options  ",
  }),
  slashCommand.configure({
    suggestion,
  }),
  Image.configure({
    inline: true,
    buttonContent: "image",
    // addImage: this.handleimageUpload,
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: "language-html",
    },
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];
