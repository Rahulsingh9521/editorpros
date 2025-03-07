<template>
  <div id="editor" class="editor-wrapper">
    <h1>ProseMirror Editor</h1>
  </div>
  <div id="content" contenteditable="true" style="display:none">

    <b>ProseMirror Editor</b>
    <h1>ProseMirror Editor</h1>
    <h2>ProseMirror Editor</h2>
  </div>
</template>

<script>
import { schema } from "prosemirror-schema-basic";
import { 
  TextSelection,
  EditorState,} from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { undo, redo, history } from "prosemirror-history";
import { baseKeymap, pcBaseKeymap, macBaseKeymap } from "prosemirror-commands";
import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
// import {} from "prosemirror-model";
// import { mySchema } from "../js/myschema.js";
import { Schema } from "prosemirror-model";
// import { addListNodes } from "prosemirror-schema-list";
// import { schema } from "prosemirror-schema-basic";
// import { addListNodes } from "prosemirror-schema-list";

const mySchema = new Schema({
  nodes: schema.spec.nodes,
  marks: {
    em: { tag: "em" },
    strong: { tag: "strong" },
    // ... Add more mark types here as needed
  }
});


export default {  
  data() {  
    return {
      state: null,
      view: null,
      isMouseDown: false,
      startPos: null
    };
  },
  mounted() {
    // let docc = schema.node("doc", null, [
    //   schema.node("paragraph", null, [schema.text("One.")]),
    //   schema.node("horizontal_rule"),
    //   schema.node("paragraph", null, [schema.text("Two!")])
    // ])

    // console.log(docc.content.size, docc.resolve(2));
    console.log(mySchema);
    this.state = EditorState.create(
      {
        schema: mySchema,
        plugins: [
          history(),
          keymap({"Mod-z": undo, "Mod-y": redo}),
          keymap({...baseKeymap, ...pcBaseKeymap, ...macBaseKeymap}),
        ]
      }
    );

    this.view = new EditorView(
      document.querySelector("#editor"), 
      {
        state: this.state, 
        dispatchTransaction: this.dispatchTransaction,
        // handleDOMEvents:{
        //   mousedown: this.handleMouseDown,
        //   mouseup: this.handleMouseUp,
        //   mousemove: this.handleMouseMove,
        // },
      }
    );

    // this.view.dom.addEventListener('dblclick', this.handleDoubleClick);

  },
  beforeUnmount() {
    
  },
  methods: {
    dispatchTransaction(transaction) {
      console.log( this.view.state);
      const newState = this.view.state.apply(transaction);
      this.view.updateState(newState);
    },
    handleMouseDown(view, event) {
      this.isMouseDown = true;
      const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
      if (pos) {
        this.startPos = pos.pos;
      }
    },
    handleMouseMove(view, event) {
      if (!this.isMouseDown || this.startPos === null) return;
      const pos = view.dom.selection();
      console.log("🚀 ~ handleMouseMove ~ pos:", pos)
      if (pos) {
        const selection = TextSelection.create(view.state.doc, this.startPos, pos.pos);
        view.dispatch(view.state.tr.setSelection(selection));
      }
    },
    handleMouseUp(view, event) {
      this.isMouseDown = false;
      this.startPos = null;
    }

  } 
};
</script>


<style>
/* Style your editor container as needed */

.ProseMirror{
  border: 1px solid #eb3737;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  min-height: 200px;
}
</style>