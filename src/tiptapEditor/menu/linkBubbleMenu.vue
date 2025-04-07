<template>
    <BubbleMenu
        :editor="editor"
        :tippy-options="{ 
            duration: [200, 100],
            placement: 'bottom-start',
            theme: 'custom-theam',
            interactive: true,
            arrow: true,
            hideOnclick: true,    
        }"
        v-if="editor"
        :should-show="( {editor}) => {
            const { selection } = editor.view.state;

            if(selection.empty) {
                this.$store.commit('toggleShownLinkMenu', false);
                return false;
            }

            let isLinkActive = editor.isActive('link');

            if(isLinkActive){
                this.linkUrl = this.editor.getAttributes('link').href;
                this.isActiveLinkEdit = false;
            }
            else{
                this.linkUrl = 'https://';
                this.isActiveLinkEdit = true;
            }

            return (this.$store.getters.getShowLinkMenu | isLinkActive);
        }"

          
    >

    <div>

        <div class="link-bubble-menu" v-if="this.isActiveLinkEdit">
            <input v-model="linkUrl" @input="updateURL" @keydown="handleKeydown" placeholder="Enter URL" />
            <button @click="confirmeLink()"><i class="bi bi-check-circle-fill"></i></button>
        </div>
        <div class="link-bubble-menu" v-if="!this.isActiveLinkEdit">
            <a :href="this.linkUrl" target="_blank">{{ this.linkUrl }}</a>
            <button @click="handleEditorLink()"><i class="bi bi-pencil-fill"></i></button>
        </div>
    <!-- </div>

        <div class="bubble-menu">

            <button @click="this.editor.chain().toggleBold().run()" :class="{ 'is-active': this.editor.isActive('bold')}"><i class="bi bi-type-bold"></i></button>
            <button @click="this.editor.chain().toggleItalic().run()" :class="{ 'is-active': this.editor.isActive('italic')}"><i class="bi bi-type-italic"></i></button>
            <button @click="this.editor.chain().toggleUnderline().run()" :class="{ 'is-active': this.editor.isActive('underline')}"><i class="bi bi-type-underline"></i></button>
            <button @click="this.editor.chain().toggleStrike().run()" :class="{ 'is-active': this.editor.isActive('underline')}"><i class="bi bi-type-strickthrough"></i></button>
            <button @click="this.editor.chain().toggleCode().run()" :class="{ 'is-active': this.editor.isActive('code')}"><i class="bi bi-code"></i></button>

            <button @click="this.toggleLink()"><i class="bi bi-link-45deg" style="font-size: 20px;"></i></button>
            <button @click="this.handleformat('Lower')"><i class="bi bi-alphabet"></i></button>
            <button @click="this.handleformat('Upper')"><i class="bi bi-alphabet-uppercase"></i></button>
            <button @click="this.handleformat('Capitalize')">Tt</button>
            <button @click="this.handleformat('subscript')" :class="{'is-active': this.editor.isActive('subscript')}"><i class="bi bi-subscript"></i></button>
            <button @click="this.handleformat('superscript')" :class="{'is-active': this.editor.isActive('superscript')}"><i class="bi bi-superscript"></i></button>
            <button @click="this.handleformat('highlight')"><i class="bi bi-highlight"></i></button> -->

        </div>
    </BubbleMenu>

</template>

<script>

import { BubbleMenu } from '@tiptap/vue-3';

export default {
    components: {
        BubbleMenu,
    },

    props: {
        editor: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            linkUrl: '',
            isActiveLinkEdit: true,
        };
    },


    methods: {
        confirmeLink() {
            this.editor.commands.setLink({ href: this.linkUrl, target: '_blank' });
            this.$store.commit('toggleShownLinkMenu', false);
            this.isActiveLinkEdit = false;
        },
        updateURL(event) {
            this.linkUrl = event.target.value;
        },
        handleKeydown(event) {
            if (event.key === 'Enter') {
                this.confirmeLink();
            }
        },
        handleEditorLink() {
            this.isActiveLinkEdit = true;
        },
    },
}

</script>

<style scoped lang="scss">

.link-bubble-menu {
    background-color: white;
    border: 1px solid gray;
    border-radius: 0 0 8px 8px;
    box-shadow: 0px 5px 10px #000;
    display: flex;
    width: 400px;

    input 
    {
        display: flex;
        width: calc(100% - 75px);
        box-sizing: border-box;
        margin: 12px;
        padding: 8px 12px;
        border-radius: 15px;
        background-color: #eee;
        font-size: 15px;
        color: #050505;
        border: 0;
        outline: 0;
    }

    a {
        display: inline-block;
        margin: 12px;
        padding: 8px 12px;
        border-radius: 15px;
        background-color: #eee;
        width: 300px;
        text-align: left;
    }

    button {
        border: none;
        background-color: unset;
        padding: 4px 10px;
        border-radius: 0.7rem;
    }
}

</style>