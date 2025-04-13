<template>
    <div class="main-wrapper">

        <div class="topSection">
            <fixedMenu :editor="editor" />
            <editor-content
                id="editor"
                :editor="editor"
                class="editor-wrapper ProseMirror"
                @dbleclick="this.adjustCursor()"
            ></editor-content>
        </div>

        <div class="bottomSection">
            <div id="htmlObject">
                <h6><u>HTML</u></h6>
                <h6>{{ this.htmlContent }}</h6>
            </div>
            <div id="jsonObject">
                <h6><u>JSON</u></h6>
                <h6>{{ this.jsonContent }}</h6>
            </div>
        </div>

        <bubbleMenu :editor="editor" />
        <linkBubbleMenu :editor="editor" />
        <tableEditMenu :editor="editor" />

    </div>        
        
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3';
// import Globalextensions from './extensionLib/index';
import fixedMenu from './menu/fixedMenu.vue';
import globlaExtensions from './extensionLib/extentions';
// import StarterKit from "@tiptap/starter-kit";
import slashCommand from './menu/slashCommands';
import suggestion from './menu/suggestion';

// import extentions from './extensionLib/extentions';
import linkBubbleMenu from './menu/linkBubbleMenu.vue';
import tableEditMenu from './menu/tableEditMenu.vue';
import bubbleMenu from './menu/bubbleMenu.vue';
import GlobalDragHandle from "../tiptapEditor/darg-utils/dragable.js";

export default {
    components: {
        bubbleMenu,
        fixedMenu,
        EditorContent,
        linkBubbleMenu,
        tableEditMenu
    },

    data() {
        return {
            editor: null,
            htmlContent: '',
            jsonContent: {},

            plusButtonPosition: null,
            showPlusButton: false,

            showdragButton: false,
            dragButtonPosition: null,
            MouseDown: false,

            isSelectectionActive: false,
        }
    },

    computed: {
        plusButtonStyles() {
            if (!this.showPlusButton || !this.plusButtonPosition) {
                return { display: 'none' };
            }
            return {
                top: this.plusButtonPosition.top + 'px',
                left: this.plusButtonPosition.left + 'px',
                display: 'block', // Ensure it's visible,
                // position: 'absolute',
            };
        },
        dragButtonStyle() {
            if(this.MouseDown){
              return {
                  top: this.dragButtonPosition.top + 'px',
                  left: this.dragButtonPosition.left + 'px',
                  display: 'block', // Ensure it's visible,
                  // position: 'absolute',
              };
            }
            else if (!this.showdragButton || !this.dragButtonPosition) {
                return { display: 'none' };
            }
            else{

              return {
                top: this.dragButtonPosition.top + 'px',
                left: this.dragButtonPosition.left + 'px',
                display: 'block', // Ensure it's visible,
                // position: 'absolute',
              };
            }
        },
    },
    
    mounted() {
        // const dropExtensionInstance = new Drop();

        this.editor = new Editor({
            
            // element: document.getElementById('editor'),
            content: '',
            extensions: [
                ...globlaExtensions,
              slashCommand.configure({
                suggestion
              }),
              GlobalDragHandle
            ],
            editable: true,
            onUpdate: ({ editor }) => {
                
                this.htmlContent = editor.getHTML();
                const beautify = require('js-beautify').html;
                this.htmlContent = beautify(this.htmlContent, {indent_size: 2});


                // const some = JSON.parse(editor.getJSON());
                this.jsonContent = JSON.stringify(editor.getJSON(), null, 2);
                // const jsonObject = document.getElementById('jsonObject');
                // jsonObject.innerHTML = this.jsonContent;
            },

        })
        // console.log(globlaExtensions)
    },

    beforeUnmount() {
        this.editor.destroy()
    },
    methods: {
    adjustCursor(){
        if(!this.editor.state.selection.empty && this.isSelectectionActive){
            this.editor.commands.setTextSelection(this.editor.state.selection.to);
            this.isSelectectionActive = false;
        }
        this.editor.chain().focs().run();
    },
      handleDragMouseup(){
        console.log('Mouse up');
        this.MouseDown = false;
      },
      handleDragMouseDown(){
        console.log('Mouse down');
        this.MouseDown = true;
      },
        handleimageUpload() {
            const url = prompt('Enter the URL of the image:')
            if (url) {
                this.editor.chain().focus().setImage({ src: url }).run()
            }
        },
        throtale(event){
            setTimeout(() => {
                this.handleMouseMove(event);
            }, 200);
        },
        handleMouseMove(event) {
            if (!this.editor) return;

            const view = this.editor.view;
            const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });

            if (!pos) {
              this.showPlusButton = false;
              this.showdragButton = false;
              return;
            }

            const resolvedPos = view.state.doc.resolve(pos.pos);


            // console.log("🚀 ~ handleMouseMove ~ resolvedPos:", resolvedPos)
            if (resolvedPos) { 
                
                //     const position = resolvedPos.start(1);

                // if (position != 0) {
                    // console.log(ParentnodePath[1]);
                    const coords = view.coordsAtPos(resolvedPos.start(1));
                    // console.log("🚀 ~ handleMouseMove ~ coords:", coords)
                    

                    this.plusButtonPosition = {
                        top: coords.top,
                        left: 13, // Adjust offset as needed
                    };

                    this.dragButtonPosition = {
                        top: coords.top,
                        left: 13, // Adjust offset as needed
                    };
                    this.showPlusButton = true;
                    this.showdragButton = true;
                } else {
                    this.showPlusButton = false;
                    this.showdragButton = false;
                }
            // }
        },
    }
}
</script>
<style lang="scss">
 
</style>
  