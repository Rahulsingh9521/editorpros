<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <!-- <img src="" alt="Logo" height="30" class="me-2" /> -->
        <img src="@/assets/homePageassets/rahul_image-min.png" alt="Icon" class="topIcon" />
          <strong>Simple-<span class="text-warning">Devs</span></strong>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="#about">About Me</a></li>
            <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
            <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
            <li class="nav-item"><a class="nav-link" href="#testimonials">Testimonials</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
          </ul>
          <a class="btn btn-warning ms-3" href="#">Download CV</a>
        </div>
      </nav>
</template>

<script>
export default {
    name: "TopNavigation",
};
</script>

<style scoped>
.topIcon {
    position: absolute;
    top: 0px;
    left: 138px;
    width: 70px;
    height: 86px;
}
</style>