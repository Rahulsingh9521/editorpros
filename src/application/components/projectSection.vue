<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card" style="width: 18rem;" @click="openEditor">
                    <img src="@/assets/homePageassets/rahul_image3.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <projectModal ref="projmodal" title="Hello Modal" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import tiptapEditor from '@/tiptapEditor/TiptapEditor.vue';
import projectModal from './projectModal.vue';

export default {
    name: "ProjectSection",
    components: {
        // tiptapEditor,
        projectModal,  

    },
    data() {
        return {
            showModal: false,
        };
    },
    mounted() {
        
    },
    methods: {
        openEditor() {
           this.$refs.projmodal.openModal();
        },
        closeModal() {
            this.$refs.projmodal.modalRef?.hide();
        },
    },
    
};
</script>

<style scoped>
.project-section {
    padding: 20px;
}
</style>