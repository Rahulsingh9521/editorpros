<template>
    <div class="bubble-menu" v-if="editor">
            <button @click="editor.commands.insertDrawio(this.preset)" :class="{ 'is-active': this.editor.isActive('bold') }">Bold</button>
            <!-- <button @click="editor.commands.toggleItalic()" :class="{ 'is-active': this.editor.isActive('italic') }">Italic</button>
            <button @click="editor.commands.toggleStrike()" :class="{ 'is-active': this.editor.isActive('strike') }">Strike</button> -->
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
                src: "https://www.draw.io/images/logo.png",
                width: 200,
                height: 200,
                class: "drawio",
            }
        }
    },
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