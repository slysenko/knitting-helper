<script setup lang="ts">
import { ref } from "vue";

import AppProjectsStatCards from './AppProjectsStatCards.vue';
import AppProjectCard from "./AppProjectCard.vue";
import AppNewProjectModal from "./AppNewProjectModal.vue";

import { ListProjects, CreateProject } from '../requests/projects';
import type { ProjectModel } from '../models/project/projectModel';
import { ValidationError, ApiError } from '../errors';

const emit = defineEmits(["click", "add-new"])
const projects = ref<ProjectModel[]>([]);

const loading = ref(false);
const error = ref();

(async function loadProjects() {
    loading.value = true;
    try {
        const request = new ListProjects({});
        projects.value = await request.call();
    } catch (e) {
        if (e instanceof ValidationError) {
            console.error('Validation failed:', e.issues);
            error.value = 'Invalid data received from server';
        } else if (e instanceof ApiError) {
            console.error('API error:', e.status, e.data);
            error.value = e.message;
        } else {
            console.error('Unknown error:', e);
            error.value = 'An unexpected error occurred';
        }
    }
})();

async function addNewPoject(data: TProjectCreateParams) {
    loading.value = true;
    try {
        const request = new CreateProject(data);
        projects.value.push(await request.call());
    } catch (e) {
        if (e instanceof ValidationError) {
            console.error('Validation failed:', e.issues);
            error.value = 'Invalid data received from server';
        } else if (e instanceof ApiError) {
            console.error('API error:', e.status, e.data);
            error.value = e.message;
        } else {
            console.error('Unknown error:', e);
            error.value = 'An unexpected error occurred';
        }
    }
}

</script>

<template>
    <div class="flex flex-1 flex-col px-40">
        <div class="@container/main flex flex-1 flex-col gap-2 p-4 pt-0">
            <div class="flex flex-col gap-5 py-4 md:gap-6 md:py-6">
                My projects
                <AppProjectsStatCards />
                <div class="flex flex-1 flex-col gap-5 pt-0">
                    <div class="grid auto-rows-min gap-5 md:grid-cols-3">
                        <AppProjectCard v-for="project in projects" :key="project.id" :project="project" />
                    </div>
                    <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </div>
        </div>
        <AppNewProjectModal @add-new="addNewPoject"/>
    </div>
</template>