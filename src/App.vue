<template>
  <!-- <prose-mirror-editor /> -->
   <tiptapEditor/>
   <!-- <editorJs/> -->
</template>

<script>
// import ProseMirrorEditor from './components/ProsMirrorEditor.vue'
import tiptapEditor from './tiptapEditor/TiptapEditor.vue';
// import editorJs from './editorjs/editor.vue'


export default {
  name: 'App',
  components: {
    // ProseMirrorEditor,
    tiptapEditor,
    // editorJs
  }
}
</script>

<style>

#app {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

</style>
