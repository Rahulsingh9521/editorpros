<template>
    <!-- <div class="carousel-wrrapper"> -->

    <div>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators carind">
                <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <div class="carousel-inner service-carousel">
                <div class="carousel-item active">
                    <div class="row">
                        <div class="col-md-4" v-for="(card, index) in cards.slice(0, 3)" :key="index">
                            <service-cards 
                                :title="card.title" 
                                :description="card.description" 
                                :icon="card.icon"
                                @click="openProject1()" 
                            />
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="row">
                        <div class="col-md-4" v-for="(card, index) in cards.slice(3)" :key="index + 3">
                            <service-cards 
                                :title="card.title" 
                                :description="card.description"
                                :icon="card.icon"
                                @click="index === 0 && openProject1()" 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <!-- <service-card-popup  :card="selectedCard" @close="closePopup" /> -->
    </div>
        <!-- </div> -->
</template>

<script>
import ServiceCards from "./serviceCards.vue";
// import serviceCardPopup from "./serviceCardPopup.vue";

export default {
    name: "ServiceCarousel",
    components: {
        ServiceCards,
        // serviceCardPopup
    },
    data() {
        return {
            cards: [
                {
                    title: "Frontend Development:",
                    icon: 'frontEndDev.png',
                    description: `Building the user interface (UI) and user experience (UX) of the web application or website. 
                    This involves using technologies like HTML, CSS, JavaScript, and frontend frameworks/libraries (e.g., React, Angular, Vue.js). 
                    The goal is to create interactive, responsive, and visually appealing interfaces that users can easily navigate and interact with.`,
                },
                {
                    title: "Backend Development",
                    icon: 'frontEndDev.png',

                    description: `Developing the server-side logic, databases, and APIs (Application Programming Interfaces) that power the frontend. 
                    This involves using backend programming languages (e.g., Node.js, Python, Java, Ruby, PHP), databases (e.g., PostgreSQL, MySQL, MongoDB), and backend frameworks (e.g., Express.js, Django, Spring). 
                    The focus is on data management, security, performance, and ensuring the application functions correctly behind the scenes.`,
                },
                {
                    title: "Full-Stack Development ",
                    icon: 'frontEndDev.png',

                    description: `Handling both the frontend and backend aspects of a project. 
                    This offers clients a single point of contact and can lead to better cohesion and understanding across the entire application development process.`,
                },

                {
                    title: "Infrastructure Consultation & Setup",
                    icon: 'devops.jpeg',

                    description: `Advising on and setting up the necessary infrastructure to host and run the application. 
                    This includes choosing cloud providers (e.g., AWS, Azure, Google Cloud), configuring servers, setting up networking, and implementing deployment pipelines (CI/CD). 
                    This ensures the application is scalable, reliable, and secure in its production environment.`,
                },
                {
                    title: "API Development and Integration",
                    icon: 'frontEndDev.png',

                    description: `Creating and integrating APIs that allow different parts of the application to communicate with each other or with external services. 
                    This includes designing RESTful or GraphQL APIs, 
                    implementing authentication and authorization, 
                    and ensuring data exchange is secure and efficient.`,
                },
                {
                    title: "Deployment and Maintenance",
                    icon: 'frontEndDev.png',

                    description: ` Deploying the application to the production environment and providing ongoing maintenance, 
                    including bug fixes, updates, and monitoring to ensure the application remains stable and secure.`,
                },
            ]
        };
    },
    methods: {
        openProject1() {
            this.isPopupVisible = !this.isPopupVisible;
            this.selectedCard = this.cards[0];

            console.log('clicked');
        },
    },
};
</script>

<style scoped>
.service-carousel {
    text-align: center;
}
.service-carousel{
    margin: 10px;
}
.carousel{

    .carousel-control-prev{
        left: -105px;
    }

    .carousel-control-next{
        left: 1224px;
    }

}

.carind{
    top: 300px;
}
</style>