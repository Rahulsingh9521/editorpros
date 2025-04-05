<template>
    <div class="bubble-menu" v-if="editor">
            <button @click="handleDrawioInset()" :class="{ 'is-active': this.editor.isActive('bold') }">Bold</button>
            <button @click="wirte()" >Italic</button>
            <!-- <button @click="editor.commands.toggleStrike()" :class="{ 'is-active': this.editor.isActive('strike') }">Strike</button> -->
    </div>
</template>

<script>

export default {
    components: {
    },
    props: {
        editor: {
            type: Object,
            default: null
        },
        
    },
    data() {
        return {
            preset: {
                // url: "https://www.draw.io/images/logo.png",
                url: "",
                isCreated: true,
            }
        }
    },
    methods: {
        handleDrawioInset() {
            // this.editor.chain().focus().run();

            // const { from } = this.editor.state.selection;


            // this.editor.chain().focus()
            //     .createParagraphNear()
            //     .insertContent({
            //         type: 'drawio',
            //         attrs: {
            //             url: "https://www.draw.io/images/logo.png",
            //             isCreated: true,
            //         },
            //         content: ''
            //     })
            //     .createParagraphNear()
            //     .run();
            this.editor.chain().focus().insertDrawio(this.preset).run();
            // this.editor.commands.insertContent({
            //     type: 'paragraph',
            //     content: [
            //     {
            //         type: 'text',
            //         text: '',
            //     },
            //     ],
            // },); 
        },
        wirte() {
            let some = this.editor.getHTML();
            let some2 = this.editor.getJSON();

            console.log("🚀 ~ wirte ~ some:", some, some2)
        }
    }
}
</script>

<style>
.bubble-menu {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 8px;
    padding: 8px;
}

.bubble-menu button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
}

.bubble-menu button.is-active {
    background: #efefef;
}
</style>