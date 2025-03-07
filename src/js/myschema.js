import { Schema } from "prosemirror-model";
// import { schema } from "prosemirror-schema-basic";
// import { addListNodes } from "prosemirror-schema-list";

const mySchema = new Schema({
  nodes: {
    doc: { content: "paragraph+" },
    paragraph: { content: "text*" },
    text: { inline: true },
    /* ... and so on */
    // ... Add more node types here as needed
  },
});

export default mySchema;
