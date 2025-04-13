<template>
  <!-- <prose-mirror-editor /> -->
   <!-- <tiptapEditor/> -->
   <homePage/>
   <!-- <editorJs/> -->
</template>

<script>
// import ProseMirrorEditor from './components/ProsMirrorEditor.vue'
// import tiptapEditor from './tiptapEditor/TiptapEditor.vue';
import homePage from './application/homePage.vue';

export default {
  name: 'App',
  components: {
    homePage,
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}

</style>
