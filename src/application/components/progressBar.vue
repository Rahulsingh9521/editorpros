<template>
    <div class="progress-bar">
        <div class="progress bg-warning" style="width: 80%"></div>
    </div>
    <div class="progress-bar">
        <div class="progress bg-warning" style="width: 90%"></div>
    </div>
    <div class="progress-bar">
        <div class="progress bg-warning" style="width: 70%"></div>
    </div>
    <div class="progress-bar">
        <div class="progress bg-warning" style="width: 75%"></div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    props: {
        progress: {
            type: Number,
            required: true,
            default: 0,
            validator: (value) => value >= 0 && value <= 100,
        },
    },
};
</script>

<style scoped>
.progress-bar {
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress {
    height: 100%;
    /* background-color: #76c7c0; */
    transition: width 0.3s ease;
}
</style>