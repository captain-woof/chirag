import { createApp } from "vue";
import { vuetify } from "./plugins/vuetify";
import { pinia } from "./plugins/pinia";
import { router } from "./router";
import App from "./App.vue";

const app = createApp(App)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .mount("#app");
