import { createApp } from "vue";
import { vuetify } from "./plugins/vuetify";
import { router } from "./router";
import App from "./App.vue";
import "./styles/globals.scss";

const app = createApp(App)
    .use(vuetify)
    .use(router)
    .mount("#app");
