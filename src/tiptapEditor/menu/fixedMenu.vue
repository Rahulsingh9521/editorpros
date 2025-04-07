<template>
    <div class="fixed-menu-wrapper" v-if="this.editor">

        <text-formatting/>
        <span class="sapratore"></span>
        <button @click="this.editor.chain().toggleBold().run()" :class="{ 'is-active': this.editor.isActive('bold')}"><i class="bi bi-type-bold"></i></button>
        <button @click="this.editor.chain().toggleItalic().run()" :class="{ 'is-active': this.editor.isActive('italic')}"><i class="bi bi-type-italic"></i></button>
        <button @click="this.editor.chain().toggleUnderline().run()" :class="{ 'is-active': this.editor.isActive('underline')}"><i class="bi bi-type-underline"></i></button>
        <button @click="this.editor.chain().toggleStrike().run()" :class="{ 'is-active': this.editor.isActive('underline')}"><i class="bi bi-type-strickthrough"></i></button>
        <button @click="this.editor.chain().toggleCode().run()" :class="{ 'is-active': this.editor.isActive('code')}"><i class="bi bi-code"></i></button>
        <button @click="editor.commands.setTextAlign('left')"><i class="bi bi-text-left"></i></button>
        <button @click="editor.commands.setTextAlign('center')"><i class="bi bi-text-center"></i></button>
        <button @click="editor.commands.setTextAlign('right')"><i class="bi bi-text-right"></i></button>

        <span class="sapratore"></span>
        <button @click="handleimageUpload()"><i class="bi bi-image"></i></button>
        <button @click="handleDrawioInsert()"><i class="bi bi-share-fill"></i></button>
        <button @click="toggleLink()"><i class="bi bi-link-45deg" style="font-size: 20px;"></i></button>
        <button @click="handleQuots()"><i class="bi bi-chat-right-quote"></i></button>

        <span class="sapratore"></span>
        <button @click="editor.chain().focus().toggleOrderedList().run()"><i class="bi bi-list-ul"></i></button>
        <button @click="editor.chain().focus().toggleBulletList().run()"><i class="bi bi-list-ol"></i></button>
        <button @click="handleTableInsert()"><i class="bi bi-table"></i></button>
        <button @click="insertMermaid"><i class="bi bi-table"></i></button>

        
        <!-- <button @click="this.toggleLink()"><i class="bi bi-link-45deg" style="font-size: 20px;"></i></button>
        <button @click="this.handleformat('Lower')"><i class="bi bi-alphabet"></i></button>
        <button @click="this.handleformat('Upper')"><i class="bi bi-alphabet-uppercase"></i></button>
        <button @click="this.handleformat('Capitalize')">Tt</button>
        <button @click="this.handleformat('subscript')" :class="{'is-active': this.editor.isActive('subscript')}"><i class="bi bi-subscript"></i></button>
        <button @click="this.handleformat('superscript')" :class="{'is-active': this.editor.isActive('superscript')}"><i class="bi bi-superscript"></i></button>
        <button @click="this.handleformat('highlight')"><i class="bi bi-highlight"></i></button> -->
    </div>
</template>

<script>
import textFormatting from '';
export default {
    name: 'FixedMenu',
    components: {
        textFormatting,
    },
    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            drawioDefault:{
                url: "",
                isCreated: true,
            }
        };
    },
    methods: {
        handleDrawioInsert() {
            this.editor.chain().focus().insertDrawio(this.drawioDefault).run();
        },
        toggleLink() {
            const { selection } = this.editor.view.state;

            if (selection.empty) {
                return;
            }

            this.editor.chain().focus().run();
            this.$store.commit('toggleShownLinkMenu', true);
        },
        insetNewLine() {
            const { selection } = this.editor.view.state;
            const { $from } = selection;
            const { node } = $from.node(1);

            let nodePos = null;
            
            this.editor.view.state.doc.descendants((dscNode, pos) => {
                if(dscNode == node){
                    nodePos = pos;
                    return false;
                }
            })

            const from = nodePos;
            const to = from + node.nodeSize;
            this.editor.commands.insertContentAt(to, '<p></p>');
        },

        handleTableInsert() {
            this.editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        },
        handleimageUpload() {
            this.editor.chain().focus().addImage.run();
        },
        handleQuots() {
            let noQuoteNeeded = (this.editor.isActive('table') | 
                this.editor.isActive('image') |
                this.editor.isActive('codeBlock') 
            );

            if(!noQuoteNeeded){
                this.editor.chain().focus().toggleBlockquote().run();
            }
        },
        insetHorizontalRule() {
            this.editor.commands.setHorizontalRule();
            this.editor.chain().focus();
        },
        insertMermaid() {
            this.editor.chain().focus().createParagraphNear().insertContent(
                {
                    type: 'mermaid',
                    content: ''
                }
            ).createParagraphNear().run();
        },

    },
};
</script>

<style scoped>

</style>