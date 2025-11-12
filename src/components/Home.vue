<script setup lang="ts">
import { onMounted, ref } from "vue";

import Modal from "./Modal.vue";
import { ListProjects, CreateProject } from '../requests/projects';
import type { ProjectModel } from '../models/project/projectModel';
import { ValidationError, ApiError } from '../errors';
import ProjectCard from "./ProjectCard.vue";

const emit = defineEmits(["click", "add-new"])
const projects = ref<ProjectModel[]>([]);
const isModalOpen = ref(false);
const loading = ref(false);

const error = ref();

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}

async function addNewPoject(data: TProjectCreateParams) {
    toggleModal();
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

async function loadProjects() {
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
}

onMounted(() => {
    loadProjects();
});
</script>

<template>
    <section class="container">
        <h1>Projects</h1>
        <section class="projects-grid">
            <ProjectCard v-for="project in projects" :key="project.id" :project="project"/>
        </section>
        <div class="add-new-project">
            <button class="add-btn" @click="toggleModal">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#e3e3e3">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
            </button>
        </div>
    </section>
    <Modal v-if="isModalOpen" @add-new="addNewPoject" @close="toggleModal">
        <template v-slot:modal-title>Add new project</template>
        <template v-slot:legend>Choose a name for your project</template>
    </Modal>
</template>

<style lang="css" scoped>
.container {
    padding: 2em;
}

h1 {
    margin-bottom: 1em;
}

.projects-list {
    min-height: 10em;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-6);
}

.project-link {
    color: inherit;
    text-decoration: inherit;
}
</style>