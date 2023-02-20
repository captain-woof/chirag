import { RouteRecordRaw } from "vue-router";
import Home from "../components/pages/home/index.vue";
import About from "../components/pages/about/index.vue";
import Editor from "../components/pages/editor/index.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        name: "home",
        path: "/",
        component: Home
    },
    {
        name: "about",
        path: "/about",
        component: About
    },
    {
        name: "editor",
        path: "/editor",
        component: Editor
    }
]