<template>
    <node-view-wrapper :as="node" class="mermaid-container">
    
        <div class="mermaid-container">
            <div ref="mermaidRef" class="mermaid"> </div>
            <div class="mermaid-overlay" v-if="!isEditing && mermaidCode"></div>
        </div>

    </node-view-wrapper>
</template>
<script>

import { NodeViewWrapper } from '@tiptap/vue-3';
import mermaid from 'mermaid';
import { mermaidTemplates } from './mermaidTemplate';


export default{
    components:{
        NodeViewWrapper
    },

    props:{
        node: {
            type: Object,
            required: true,
        },
        updateAttributes: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            isEditing: false,
            mermaidCode: this.node.attrs.code || "",
            isValid: true,
            selectedTemplate: '',
            isNew: !this.node.attrs.content,
            template: mermaidTemplates,
        }
    },

    mounted() {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
        })

        if(this.node.attrs.content){
            this.updateMainDiagram();
        }
    },

    methods: {
        async renderDiagram(container, code){
            if(!container || !code?.trim()){
                container.innerHTML = "";
                return;
            }
            try{
                await mermaid.parse(code);
                const id = `mermaid-${Date.now()}`;

                container.innerHTML = `<div id="${id}">${code}</div>`;
                
                const { svg } = await mermaid.render(id, code);
                container.innerHTML = svg;
                this.isValid = true;
            } catch (error) {
                console.error('Error rendering diagram:', error);
                this.isValid = false;
                container.innerHTML = error;
                container.styl.color = 'red';
                container.style.whiteSpace = 'pre-wrap';
                container.style.alignItems = 'baseline';
            }
        },

        async updatePreview() {
            if(this.$refs.previewRef){
                await this.renderDiagram(this.$refs.previewRef, this.mermaidCode);
            }
        },

        async startEditing() {
            this.isEditing = true;
            this.mermaidCode = this.node.attrs.code || "";
            await this.$nextTick();
            await this.updatePreview();
        },

        cancelEditing() {
            this.isEditing = false;
        },

        async saveDiagram() {
            this.isEditing = false;
            this.updateAttributes({
                code: this.mermaidCode,
                content: this.mermaidCode,
            });
            await this.updatePreview();
        },

        async applyTemplate() {
            if(this.selectedTemplate) {
                this.mermaidCode = this.selectedTemplate;
                await this.updatePreview();
            }
        }
        
    }
}

</script>

<style scoped lang="scss">

.ProseMirror-selectednode {
    outline: 2px solid gray;
}

.mermaid-wrapper{
    margin: 1em 0;
    &.ProseMirror-selectednode {
        outline: 2px solid gray;
    }   
}

.mermaid-container {
    position: relative;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 1em;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mermaid{
    width: 100%;
    display: flex;
    justify-content: center;
}

:deep(svg){
    max-width: 100%;
    height: auto;
}

.inset{
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mermaid-overlay{
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffffcc;
    opacity: 0;
    transition: opacity 0.2s;
}

.mermaid-container:hover .mermaid-overlay{
    opacity: 1;
}

.edit-button{
    padding: 8px 16px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.yellow{
    background: #0d7fd6;
}

.mermaid-dialog{
    position: fixed;
    inset: 0;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.mermaid-dialog-content{
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
}

.dialog-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dialog-header select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    min-width: 200px;
}

.editor-preview-container {
    display: flex;
    gap: 20px;
    min-height: 400px;
    flex: 1;
    overflow: hidden;
}

.code-edior {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.code-edior textarea {
    flex: 1;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    resize: none;
    overflow: auto;
}

.preview-section {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.preview-container {
    flex: 1;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-container :deep(svg){
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
}

.dialog-buttons{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.dialog-buttons button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    color: white;
}

.dialog-buttons button:first-child {
    background: #4caf50;
}

.dilog-buttons button:first-child:disabled{
    background: #cccccc;
    cursor: not-allowed;
}

.dialog-buttons .cancel-button {
    background: red;
}
</style>