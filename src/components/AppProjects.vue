<script setup lang="ts">
import { ref } from "vue";

import AppProjectsStatCards from './AppProjectsStatCards.vue';
import AppProjectCard from "./AppProjectCard.vue";
import AppNewProjectModal from "./AppNewProjectModal.vue";

import { ListProjects, CreateProject } from '../requests/projects';
import type { ProjectModel } from '../models/project/projectModel';
import { ValidationError, ApiError } from '../errors';
import { CreateYarn } from "@/requests/yarns";
import type { YarnCreateParams } from "@/models/schemas/yarn";
import type { YarnModel } from "@/models/yarn/yarnModel";

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

async function createNewProject(projectData: TProjectCreateParams, yarnData: YarnCreateParams) {
    const yarnsUsed = await addNewYarn(yarnData);
    await addNewPoject(projectData, yarnsUsed);
}

async function addNewPoject(projectData: TProjectCreateParams, _yarnsUsed: YarnModel[]) {
    loading.value = true;
    try {
        projectData = {
            ...projectData,
            ... { yarnsUsed: _yarnsUsed.map((y) => {
                return {
                    yarn: y._id,
                    isPrimary: true,
                    quantityUsed: 1,
                    quantityUnit: "skeins",
                    costPerUnit: 0,
                }
            })}
        };
        const request = new CreateProject(projectData);
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
    } finally {
        loading.value = false;
    }
}

async function addNewYarn(yarnData: YarnCreateParams): Promise<YarnModel[]> {
    let usedYarns = [] as YarnModel[];
    loading.value = true;
    try {
        const request = new CreateYarn(yarnData);
        usedYarns.push(await request.call());
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
    } finally {
        loading.value = true;
    }
    return usedYarns;
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
        <AppNewProjectModal @add-new="createNewProject"/>
    </div>
</template>