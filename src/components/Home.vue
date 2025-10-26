<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref } from "vue";

import Modal from "./Modal.vue";

const emit = defineEmits(["click", "add-new"])
const projects = ref<TProject[]>([]);
const isModalOpen = ref(false);
const loading = ref(false);

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}

function addNewPoject(name: string) {
    toggleModal();
    const id = uuidv4();
    projects.value.push({
        id, name
    });
}

// async function loadProjects() {
//     try {
//         loading.value = true;
//         const prjcts = await await db.select().from(projectsModel);
//         console.log("prjcts:: ", prjcts);
//     } catch (error) {
//         console.error('Failed to load projects:', error);
//     } finally {
//         loading.value = false;
//     }
// }
</script>

<template>
    <section class="container">
        <h1>Projects</h1>
        <section class="projects-list">
            <ul>
                <li class="project-item" v-for="project in projects" :key="project.id">
                    <RouterLink class="project-link" :to="{ name: 'project', params: { id: project.id } }">
                        <span class="title">Name: {{ project.name }}</span>
                    </RouterLink>
                </li>
            </ul>
        </section>
        <div class="add-new-project">
            <button class="add-btn" @click="toggleModal">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
            </button>
        </div>
    </section>
    <Modal v-if="isModalOpen" @add-new="addNewPoject">
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

.project-item {
    list-style: none;
    max-width: 800px;
    padding: 1.5em;
    margin-bottom: 1em;
    border-radius: 1.5em;
    border: 1px solid gray;
}

.project-link {
    color: inherit;
    text-decoration: inherit;
}
</style>