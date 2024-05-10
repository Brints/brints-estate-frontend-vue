import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import the fontawesome core
import { library } from "@fortawesome/fontawesome-svg-core";

// import fontawesome icon components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import the free solid icons
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faUser,
  faLock,
  faGlobe,
  faPhone,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

// add the imported icons to the library
library.add(faEye, faEyeSlash, faEnvelope, faUser, faLock, faGlobe, faPhone, faVenusMars);

const app = createApp(App);

// make the fontawesome icon component available globally
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
