<template>
    <div class="bg-dark text-white font-sans">
      <!-- Navbar -->
      <topNavigation />
  
      <!-- Hero Section -->
      <div class="container py-3 text-center text-md-start d-md-flex">
        <div class="col-md-6">
          <h3 class="text-warning">Hi I am</h3>
          <h1 class="display-5 fw-bold">Rahul Singh Tanwar <br /><span class="display-6">Software Engineer</span></h1>
          <p class="mt-3">With experience in building scalable web applications and optimizing complex backend systems. Currently working at Samsung SDS, I specialize in <b class="text-warning">Full-stack development</b> using <b class="text-warning">Java (Spring Boot)</b> and modern JavaScript frameworks like <b class="text-warning">Vue.js and React.js</b>.
            I’ve engineered secure RESTful APIs, implemented <b class="text-warning">real-time systems</b>, and designed custom CMS tools from scratch — including a ProseMirror-based rich text editor integrated with embedded diagramming via Draw.io.<br /><br />
            I’m also skilled in <b class="text-warning">DevOps practices</b>, having worked with <b class="text-warning">Docker, Kubernetes, and CI/CD pipelines</b>, which helps me bridge the gap between development and deployment. My projects reflect my focus on performance, scalability, and user experience.
          </p>
          <a href="#" class="btn btn-warning mt-4">Hire Me</a>
        </div>
        <div class="col-md-6">
          <img src="@/assets/homePageassets/rahul_image3.png" alt="Profile" class="img-fluid" />
            <div class="container d-flex justify-content-center">
              <div class="row text-center">
                <div class="col-4">
                  <i class="bi bi-github" @click="handleSocialConnect('github')" style="font-size: 2rem;"></i>
                </div>
                <div class="col-4">
                  <i class="bi bi-linkedin" @click="handleSocialConnect('linkedin')" style="font-size: 2rem;"></i>
                </div>
                <div class="col-4">
                  <i class="bi bi-instagram" @click="handleSocialConnect('instagram')" style="font-size: 2rem;"></i>
                </div>
              </div>
            </div>
        </div>
      </div>
  
      <!-- About Section -->
      <!-- <AboutMe /> -->
  
      <!-- Projects Section -->
      <projectSection />

      <!-- Services Section -->
      <section id="services" class="container text-center py-1">
        <h2 class="fw-bold mb-4">My Services</h2>
        <p class="">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in.</p>
      <service-carousel />
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
        <p>© 2025 <span class="text-warning">Rahul singh Tanwar</span> All Rights Reserved., Inc.</p>
      </footer>
    </div>
  </template>
  
  <script>

// import AboutMe from './components/aboutMe.vue';
import serviceCarousel from './components/serviceCarousel.vue';
import topNavigation from './components/topNavigation.vue';
import projectSection from './components/projectSection.vue';

  export default {
    name: 'PortfolioPage',
    components: {
      serviceCarousel,
      topNavigation,
      projectSection
      // AboutMe
    },
    data() {
      return {
        progress: 50,
      };
    },
    methods: {
      handleSocialConnect(openUrlof) {
        if(openUrlof == 'github'){
          window.open('https://github.com/Rahulsingh9521', '_blank');
        }
        else if(openUrlof == 'linkedin'){
          window.open('https://www.linkedin.com/in/rahulsinghtanwar', '_blank');
        }
        else if(openUrlof == 'instagram'){
          window.open('https://www.instagram.com/simpledevs.in/', '_blank');
        }
      },

    },
  };
  </script>
  
<style scoped>
body {
    font-family: 'Inter', sans-serif;
}


</style>
  