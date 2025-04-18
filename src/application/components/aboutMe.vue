<template>
    <div class="about-me">
        <!-- <section id="about" class="container text-center py-5"> -->
        <h2 class="fw-bold mb-3">About Me</h2>
        <p class="">

</p>
        <div class="mx-auto my-4" style="max-width: 500px;">
          <progress-bar :progress="progress" />
        </div>
      <!-- </section> -->
    </div>
</template>



<script>
import progressBar from "./progressBar.vue";

export default {
    name: "AboutMe",
    components: {
        progressBar
    },
};
</script>

<style scoped>
.about-me {
    text-align: center;
    margin: 20px;
}
</style>