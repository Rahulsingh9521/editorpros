<template>
        <bubble-menu
            class="bubble-menu"
            :tippy-options="{ duration: 100 }"
            :editor="editor"
            v-if="this.editor"
            >
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': this.editor.isActive('bold') }">
                Bold
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': this.editor.isActive('italic') }">
                Italic
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': this.editor.isActive('strike') }">
                Strike
            </button>
            <button @click="handleimageUpload" :class="{ 'is-active': this.editor.isActive('image') }">
                image
            </button>
        </bubble-menu>

        <div 
            id="editor" 
            class="editor-wrapper" 
            @mousemove="handleMouseMove"  
            ></div>

        <fixedMenu :editor="editor"/>

        <div> {{ this.htmlContent }} </div>
        <div id="jsonObject"> </div>
        
        <!-- <editor-content :editor="editor" /> -->
</template>

<script>
import { Editor, BubbleMenu } from '@tiptap/vue-3';
import Globalextensions from './extensions/index';
import fixedMenu from './menu/fixedMenuLis.vue/fixedMenu.vue';


export default {
    components: {
        BubbleMenu,
        fixedMenu
    },

    data() {
        return {
            editor: null,
            htmlContent: '',
            jsonContent: '',

            plusButtonPosition: null,
            showPlusButton: false,

            showdragButton: false,
            dragButtonPosition: null,
            MouseDown: false,
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
            
            element: document.getElementById('editor'),
            content: '',
            extensions: [
              ...Globalextensions
            ],
            onUpdate: ({ editor }) => {
                
                this.htmlContent = editor.getHTML();
                const text = new DOMParser().parseFromString(this.htmlContent, 'text/html').body.textContent;

                this.htmlContent = text;
                // const some = JSON.parse(editor.getJSON());
                this.jsonContent = JSON.stringify(editor.getJSON(), null, 2);
                const jsonObject = document.getElementById('jsonObject');
                jsonObject.innerHTML = this.jsonContent;
            },

        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
    methods: {
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
  