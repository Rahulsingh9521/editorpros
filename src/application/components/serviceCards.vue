<template>
    <div class="card bg-secondary text-white h-100">
        <div class="card-body">
            <img :src="serviceImage" alt="serviceCardsImage" class="serviceImage" />
            <h5 class="card-title">{{ this.title }}</h5>
            <p class="card-text">{{this.description}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCards",
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    computed: {
        serviceImage() {
            return require(`@/assets/homePageassets/${this.icon}`);
        },
    },
    // methods: {
    //     serviceImage() {
    //         return require(this.icon);
    //     },
    // },
        data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
.serviceImage {
    height: 200px;
    width: 100%;
}
</style>