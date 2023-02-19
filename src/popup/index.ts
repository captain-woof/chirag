import { createApp } from "vue";
import { vuetify } from "./plugins/vuetify";
import { router } from "./router/index";
import App from "./App.vue";

const app = createApp(App)
    .use(vuetify)
    .use(router)
    .mount("#app");
