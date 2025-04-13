<template>
    <NodeViewWrapper class="drawio-component">
        <div class="drawio-container">
            <button v-if="!this.node.attrs.isCreated" & !this.isEditing calss="drawio-btn" @click="this.openDrawioIframe()">
                Create Digram
            </button>

            <div v-if="this.node.attrs.isCreated & !this.isEditing">
                <button class="drawio-btn edit-btn" @click="this.openDrawioIframe()">
                    Edit Digram
                </button>
                <img :src="this.node.attrs.url" v-if="this.node.attrs.url" class="drawio-img"/>
            </div>

            <div v-if="this.isEditing" class="iframe-wrapper">
                <iframe
                    ref="drawioIframe"
                    class="drawio-iframe"
                    src="https://embaded.digram.net/?embed=1&libraries=1&ui=sketch&spin=1&modified=unsavedChanges&proto=json"
                >
                </iframe>
            </div>
        </div>
    </NodeViewWrapper>
</template>

<script>
import { NodeViewWrapper } from '@tiptap/vue-3';
import { drawioUtils } from './drawio-digram';

export default {
    components: {
        NodeViewWrapper,
    },
    props: {
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
            drawio: null,
            xml: null,
            isCreated: false,
        };
    },
    watch:{
        "$store.getters.drawIoImageChange": function(newVal) {
        
            this.handleChangeDrawio(newVal);
        },
    },
    methods: {
        handleChangeDrawio(DrawioObj){
            let DrawioUrl = DrawioObj.dataUrl;

            this.updateAttributes({
                url: DrawioUrl,
                isCreated: true,
            })
        },
        openDrawioIframe() {
            let initSVG = "";

            if(this.node.attrs.url == "") {
                initSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
                    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="20">No Diagram</text>
                </svg>`;
            }
            else{
                initSVG = this.node.attrs.url;
                initSVG = atob(initSVG.substring(initSVG.indexOf(",") + 1));
            }

            let ele = new DOMParser().parseFromString(initSVG, "text/html").body.firstChild;

            let iframDiv = document.createElement("div");
            iframDiv.setAttribute("id", "drawIoParent");
            iframDiv.setAttribute("class", "DrawIop");

            document.body.appendChild(iframDiv);

            let drawioInstance = new drawioUtils(ele);
            drawioInstance.editElement();
        }
    }
}
</script>

<style scoped>

.drawIop {
    width: 100%;
    height: 100%;
}

.drawio-container {
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &.ProseMirror-selectednode {
        outline: 2px solid gray;
    }

    .drawio-btn{
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 12px;
        font-size: 14px;
        margin-bottom: 10px;
        border-radius: 4px;
        cursor: pointer;
    }

    .edit-btn{
        background: greenyellow;
    }

    .drawio-img{
        width: 500px;
        height: auto;
        border: 1px solid #ccc;
        margin-top: 5px;
    }

    .iframe-wrapper{
        margin-top: 10px;
        position: relative;
    }

    .drawio-iframe{
        width: 100%;
        height: 400px;
        border: none;
    }
}

</style>