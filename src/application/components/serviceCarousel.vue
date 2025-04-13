<template>
        <div class="container text-center">
            <h2 class="fw-bold mb-4">Services</h2>
                <div class="row g-4">
                    <div class="col-md-3">
                        <service-cards @click="openProject1()"/>
                    </div>
                    <div class="col-md-3">
                        <service-cards />
                    </div>
                    <div class="col-md-3">
                        <service-cards />
                    </div>
                    <div class="col-md-3">
                        <service-cards />
                    </div>
            </div>
    </div>
</template>

<script>
import ServiceCards from "./serviceCards.vue";

export default {
    name: "ServiceCarousel",
    components: {
        ServiceCards,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
.service-carousel {
    text-align: center;
}
</style>