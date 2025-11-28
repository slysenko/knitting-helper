import { createWebHistory, createRouter } from "vue-router";

import Decreases from "./components/Decreases.vue";
import DecreasesItem from "./components/DecreasesItem.vue";
import Converter from "./components/Converter.vue";
import AppProjects from "./components/AppProjects.vue";
import AppProject from "./components/AppProject.vue";
import AppMaterials from "./components/AppMaterials.vue";

const routes = [
    { path: "/", name: "projects", component: AppProjects },
    { path: "/projects/:id", name: 'project', component: AppProject },
    { path: "/projects/:id/descreases", name: 'decreases', component: Decreases },
    { path: "/projects/:id/descreases/:uuid", name: 'decreasesItem', component: DecreasesItem },
    { path: "/projects/:id/converter", name: 'converter', component: Converter },
    { path: "/materials", name: "materials", component: AppMaterials },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
