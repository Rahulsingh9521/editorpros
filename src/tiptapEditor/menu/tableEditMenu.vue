<template>
    <BubbleMenu
        :editor="editor"
        :tippy-options="{ 
            duration: [200, 100],
            placement: 'auto',
            theme: 'custom-theam',
            interactive: true, 
            arrow: true,
            hideclick: true,    
        }"
        v-if="editor"
        :should-show="( {editor}) => {
            const { selection } = editor.view.state;

            if(selection.empty) {
                return false;
            }

            const { $from } = selection;

            if($from.node(3) && ($from.node(3).type.name === 'tableCell' || $from.node(3).type.name === 'tableHeader')) {
                return true;
            }
            else{
                return false;
            }
        }"

          
    >

    <div class="table-edit-bubble-menu">

            <button @click="this.editor.chain().focus().addColumnBefore().run()"><i class="bi bi-arrow-bar-left"></i></button>
            <button @click="this.editor.chain().focus().addColumnAfter().run()" ><i class="bi bi-arrow-bar-right"></i></button>
            <button @click="this.editor.chain().focus().addRowBefore().run()" ><i class="bi bi-arrow-bar-up"></i></button>
            <button @click="this.editor.chain().focus().addRowAfter().run()" ><i class="bi bi-arrow-bar-down"></i></button>

            <span class="sapratore"></span>
            <button @click="this.editor.chain().focus().deleteColumn().run()" ><i class="bi bi-trash-fill"></i></button>
            <button @click="this.editor.chain().focus().deleteRow().run()" ><i class="bi bi-trash-fill"></i></button>
            <button @click="this.editor.chain().focus().deleteTable().run()" ><i class="bi bi-trash-fill"></i></button>
            <button @click="this.editor.chain().focus().mergeCells().run()" ><span>Merge Cell</span></i></button>
            <button @click="this.editor.chain().focus().splitCell().run()" ><span>Split Cell</span></button>

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

    methods: {
        handleMergeTable
    },

}

</script>

<style scoped lang="scss">

.table-edit-bubble-menu {
    background: #fff;
    border: 1px solid gray;
    width: 150px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;
    padding: 0.5rem;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    box-shadow: 1px 2px 2px #000;

    button{
        border: none;
        background: #fff;
        align-items: flex-start;
        display: flex;
        text-align: left;
        width: 100%;
        font-size: 12px;
        padding: 4px 10px;
        border-radius: 5px;
        border-bottom: 1px solid #efefef;

        span{
            margin-left: 5px;
            line-height: 1.2;
        }

        &.is-selected{
            background-color: #f5f5f5;
            color: #000;
        }
        &:hover{
            background-color: #f5f5f5;
            color: #000;
        }
    }
}


</style>