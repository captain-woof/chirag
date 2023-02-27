import { createApp } from "vue";
import { vuetify } from "./plugins/vuetify";
import { pinia } from "./plugins/pinia";
import { toast } from "./plugins/toast";
import { router } from "./router";
import App from "./App.vue";
import "./styles/globals.scss";

// Create app
const app = createApp(App)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(toast);

// Mount app
app.mount("#app");
