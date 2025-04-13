<template>
    <div class="bg-dark text-white font-sans">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <!-- <img src="" alt="Logo" height="30" class="me-2" /> -->
        <img src="@/assets/homePageassets/rahul_image-min.png" alt="Icon" class="topIcon" />
          <strong>Rahul Singh <span class="text-warning">Tanwar</span></strong>
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
  
      <!-- Hero Section -->
      <section class="container py-5 text-center text-md-start d-md-flex align-items-center justify-content-between">
        <div class="col-md-6">
          <p class="small">Hi I am</p>
          <h1 class="display-5 fw-bold">Rahul Singh Tanwar <br /><span class="display-4">Full Stack Devloper</span></h1>
          <p class="mt-3 text-muted">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in.</p>
          <a href="#" class="btn btn-warning mt-4">Hire Me</a>
        </div>
        <div class="">
          <img src="@/assets/homePageassets/rahul_image3.png" alt="Profile" class="img-fluid" />
        </div>
      </section>
  
      <!-- About Section -->
      <section id="about" class="container text-center py-5">
        <h2 class="fw-bold mb-3">About Me</h2>
        <p class="text-muted">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in.</p>
        <div class="mx-auto my-4" style="max-width: 500px;">
          <progress-bar :progress="progress" />
          <!-- <div class="mb-3">
            <div class="d-flex justify-content-between">
              <span>UX</span><span>90%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-warning" style="width: 90%"></div>
            </div>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between">
              <span>UX</span><span>90%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-warning" style="width: 90%"></div>
            </div>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between">
              <span>UX</span><span>90%</span>
            </div>
            <div class="progress">
              <div class="progress-bar bg-warning" style="width: 90%"></div>
            </div>
          </div> -->
        </div>
      </section>
  
      <!-- Services Section -->

      <service-carousel />
  
      <!-- Projects Section -->
      <section id="projects" class="container text-center py-5">
        <h2 class="fw-bold mb-4">My Projects</h2>
        <div class="mb-4">
          <button class="btn btn-outline-light me-2">All</button>
          <button class="btn btn-outline-light">Web Design</button>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card text-dark">
              <img src="/project1.png" class="card-img-top" alt="Project">
              <div class="card-body">
                <h5 class="card-title">Web Design</h5>
                <p class="card-text">AirCalling Landing Page Design</p>
              </div>
            </div>
          </div>
          <!-- Repeat for other projects -->
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section id="testimonials" class="container text-center py-5">
        <h2 class="fw-bold mb-4">Testimonials</h2>
        <div class="card bg-secondary text-white mx-auto" style="max-width: 600px;">
          <div class="card-body">
            <p class="mb-4">"Lorem ipsum dolor sit amet consectetur. In enim cursus odio accumsan."</p>
            <div class="d-flex align-items-center justify-content-center">
              <img src="/testimonial1.jpg" alt="User" class="rounded-circle me-3" width="50" height="50" />
              <div class="text-start">
                <strong>Name</strong>
                <p class="text-muted mb-0">CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section id="contact" class="text-center py-5 bg-dark">
        <h2 class="fw-bold mb-3">Let's Design Together</h2>
        <p class="text-muted mx-auto" style="max-width: 600px;">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in.</p>
        <form class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
          <input type="email" placeholder="Enter Your Email" class="form-control w-auto" style="max-width: 300px;" />
          <button class="btn btn-warning">Contact Me</button>
        </form>
      </section>
  
      <!-- Footer -->
      <footer class="text-center text-muted py-4 bg-dark">
        <div class="mb-3">
          <i class="fab fa-facebook me-3"></i>
          <i class="fab fa-twitter me-3"></i>
          <i class="fab fa-instagram me-3"></i>
          <i class="fab fa-linkedin"></i>
        </div>
        <p>© 2023 <span class="text-warning">FawziUIUX</span> All Rights Reserved., Inc.</p>
      </footer>
    </div>
  </template>
  
  <script>

import progressBar from './components/progressBar.vue';
import serviceCarousel from './components/serviceCarousel.vue';
  export default {
    name: 'PortfolioPage',
    components: {
      progressBar,
      serviceCarousel,
    },
    data() {
      return {
        progress: 50,
      };
    },
  };
  </script>
  
<style scoped>
body {
    font-family: 'Inter', sans-serif;
}

.topIcon {
    position: absolute;
    top: 0px;
    left: 203px;
    width: 70px;
    height: 86px;
}
</style>
  