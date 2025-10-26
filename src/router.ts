import { createWebHistory, createRouter } from "vue-router";

import Home from "../src/components/Home.vue";
import Project from "./components/Project.vue";
import Decreases from "./components/Decreases.vue";
import DecreasesItem from "./components/DecreasesItem.vue";
import Converter from "./components/Converter.vue";

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/projects/:id", name: 'project', component: Project },
    { path: "/projects/:id/descreases", name: 'decreases', component: Decreases },
    { path: "/projects/:id/descreases/:uuid", name: 'decreasesItem', component: DecreasesItem },
    { path: "/projects/:id/converter", name: 'converter', component: Converter },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
