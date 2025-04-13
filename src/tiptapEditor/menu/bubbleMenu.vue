<template>
    <BubbleMenu
        :editor="editor"
        :tippy-options="{ 
            duration: [200, 100],
            placement: 'top-start',
            theme: 'custom-theam',
            interactive: true,
            arrow: true,
            hideOnClick: true,    
        }"
        v-if="editor"
        :should-show="( {editor}) => {
            const { selection } = editor.view.state;

            if(selection.empty) {
                return false;
            }

            let isImageActive = editor.isActive('uploadImage');
            let isTableActive = editor.isActive('table');
            let iscodeBlockActive = editor.isActive('codeBlock');

            if(isImageActive || isTableActive || iscodeBlockActive){
                return false;
            }
            else{
                return true;
            }
        }"

          
    >

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
            <button @click="this.handleformat('highlight')"><i class="bi bi-highlight"></i></button>

        </div>
    </BubbleMenu>

</template>

<script>

import { BubbleMenu } from '@tiptap/vue-3';
import { formatUtils } from '../text-utils/textFormat';

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
            showPlusButton: false,
            plusButtonPosition: null,
            showdragButton: false,
            dragButtonPosition: null,
            MouseDown: false,
        };
    },

    methods: {
        toggleLink() {
            const { selection } = this.editor.view.state;

            if(selection.empty) {
                return;
            }

            this.editor.chain().focus().run();
            this.$store.commit('toggleShowLinkMenu', true);
        },
        handleformat(command){
            formatUtils.formatText(command, this.editor);
        },
        handleToShow(editor){
            
            if(editor){
                let isImageActive = editor.isActive('image');
                let isTableActive = editor.isActive('table');
                let iscodeBlockActive = editor.isActive('codeBlock');

                if(isImageActive || isTableActive || iscodeBlockActive){
                    return false;
                }
                else{
                    return true;
                }
                
            }

            return false;
        }
    },
}

</script>

<style scoped lang="scss">

.bubble-menu {
    background-color: white;
    border: 1px solid gray;
    border-radius: 3px;
    box-shadow: 1px 2px 2px #eee;
    display: flex;

    button{
        border: none;
        background-color: unset;
        padding: 4px 10px;
        border-radius: 3px;

        &:hover{
            background-color: gray;
            border: 5px;
            color: white;
        }

        &.is-active{
            background-color: rgb(238, 194, 194);
            &:hover{
                background-color: rgb(242, 215, 215);
            }   
        }
    }
}

.tippy-content{
    padding: 8px 8px 8px 2px;
}

</style>