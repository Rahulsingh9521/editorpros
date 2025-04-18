<template>
    <div class="service-card-popup">
        <div class="container text-center text-warning py-5">
            <h2 class="fw-bold mb-4">My Services</h2>
            <p class="text-warning">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCardPopup",
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped lang="scss">
.service-card-popup {
    position: fixed;
    z-index: 0;
    opacity: 0.2;
    // background: gray;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    padding: 16px;

    .container{
        opacity: 1 !important;
    }
    

}
</style>