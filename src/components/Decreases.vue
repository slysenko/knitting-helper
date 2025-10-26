<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref, computed } from "vue";

import { useRoute } from 'vue-router';

const route = useRoute();

const projectId = computed(() => {
    return route.params.id;
});

import Modal from "./Modal.vue";

const emit = defineEmits(["click", "add-new"])
const decreases = ref<TProject[]>([]);
const isModalOpen = ref(false);

function toggleModal() {
    isModalOpen.value = !isModalOpen.value;
}

function addNewDecreasesItem(name: string) {
    toggleModal();
    const id = uuidv4();
    decreases.value.push({
        id, name
    });
}

</script>

<template>
    <section class="container">
        <h1>Decreases</h1>
        <section class="decreases-list">
            <ul>
                <li class="decreases-item" v-for="decreasesItem in decreases" :key="decreasesItem.id">
                    <RouterLink class="decreases-item-link" :to="{ name: 'decreasesItem', params: { id: projectId, uuid: decreasesItem.id } }">
                        <span class="title">Name: {{ decreasesItem.name }}</span>
                    </RouterLink>
                </li>
            </ul>
        </section>
        <div class="add-new-decreases-item">
            <button class="add-btn" @click="toggleModal">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
            </button>
        </div>
    </section>
    <Modal v-if="isModalOpen" @add-new="addNewDecreasesItem">
        <template v-slot:modal-title>Add new descreases/increases</template>
        <template v-slot:legend>Choose a name for your decreases/increases chart</template>
    </Modal>
</template>

<style lang="css"></style>