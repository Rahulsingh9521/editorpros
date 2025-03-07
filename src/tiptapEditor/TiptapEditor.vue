<template>
    <div>
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
    </div>
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
 #jsonObject {
    border: 1px solid #ccc;
    padding: 10px;
    font-family: monospace; /* Use a monospace font for better readability */
    white-space: pre-wrap; /* Allow wrapping of long lines */
    max-height: 250px;
    overflow: auto;
  }
.editor-wrapper{
    border: 1px solid black;
    border-radius: 0.5px;
    margin: 1px 0px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
}
/* Basic editor styles */
.tiptap {
    outline: none;
    margin: 0px;
    // width: 50%;
    // align-items: center;
  /* Text styles */max-height: 500px;
  /* List styles */
  ul,
  ol {
    padding: 0px 0px 0px 40px;
    // margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2
  {
    padding: 0px 0px 0px 40px;
    line-height: 1.1;
    margin-top: 3px;
    text-wrap: pretty;
    margin-bottom: 3px;

  }

  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 40px;
  }


  pre {
    background: black;
    border-radius: 2px;
    color: white;
    font-family: 'JetBrainsMono', monospace;
    margin: 5px 5px 5px 20px;
    padding: 1px 10px;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  /* Placeholder (on every new line) */
  p{
    padding: 0px 0px 0px 40px;
    line-height: 1.5;
  };
  p.is-empty::before {
    color: rgb(93, 93, 93);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  } 

  /* Basic editor styles */
  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid gray;
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: gray;
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: gray;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: purple;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: a uto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

.bubble-menu {
  background-color: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;

  button {
    background-color: unset;

    &:hover {
      background-color: var(--gray-3);
    }

    &.is-active {
      background-color: var(--purple);

      &:hover {
        background-color: var(--purple-contrast);
      }
    }
  }
   
}

.notion-drag-button{
    position: absolute;
    left: 0px;
    background-color: #eee; /* Or any style you want */
    border-radius: 50%; /* Make it round */
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;

    cursor: grab;
    z-index: 10; /* Ensure it's above the editor content */
    user-select: none; /* Prevent text selection */
}
.notion-plus-button {
    position: absolute;
    background-color: #eee; /* Or any style you want */
    border-radius: 50%; /* Make it round */
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    z-index: 10; /* Ensure it's above the editor content */
    user-select: none; /* Prevent text selection */
}  

.draggable-wrapper {
  display: flex;
  align-items: flex-start;
}

// .drag-handle {
//   cursor: grab;
//   margin-right: 10px;
//   padding: 5px;
//   background-color: #f0f0f0;
// }

.wrapper-content {
  flex-grow: 1;
}


/**
  this is a Global CSS after testing needs to be placed in global css file
*/

.drag-handle {
  position: fixed;
  opacity: 1;
  transition: opacity ease-in 0.2s;
  border-radius: 0.25rem;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(0, 0, 0, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
  background-size: calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
  background-repeat: no-repeat;
  background-position: center;
  width: 1.2rem;
  height: 1.5rem;
  z-index: 50;
  cursor: grab;

  &:hover {
    background-color: var(--novel-stone-100);
    transition: background-color 0.2s;
  }

  &:active {
    background-color: var(--novel-stone-200);
    transition: background-color 0.2s;
    cursor: grabbing;
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
    pointer-events: none;
  }
}

</style>
  