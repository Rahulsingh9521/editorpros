<template>
  <div class="container mt-5">
    <button class="btn btn-primary" >
      Open Bootstrap Modal
    </button>
    <!-- Modal -->
    <div class="modal fade" ref="modalRef" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">SimpleDevs Editor</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <tiptapEditor />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Close</button>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import tiptapEditor from '@/tiptapEditor/TiptapEditor.vue';
import { Modal } from 'bootstrap';
export default {
  nane: 'PopupModal',
  components: {
    tiptapEditor,
  },
  props: {

  },
  data() {
    return {
      modalInstance: null,
    };
  },
  async mounted() {
    this.modalInstance = new Modal(this.$refs.modalRef)
  },
  methods: {
    openModal(){
      this.modalInstance?.show()
    },
    closeModal(){
      this.modalInstance?.hide()
    }
  },
};
</script>

<style scoped>
.modal-body {
  max-height: 400px;
  overflow-y: auto;
}
</style>
  