import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import HeaderBar from "../src/components/layout/HeaderBar.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// app.component("header-bar", HeaderBar);

app.mount("#app");
