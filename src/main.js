import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./main-css/main.scss";
import "./main-css/prism-dark.css";
import "./main-css/imageUpload.scss";

import store from "./store/index.js";

const app = createApp(App);
app.use(store);

app.mount("#app");
