<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();

const id = computed(() => {
    return route.params.id;
})

</script>

<template>
<section class="container">
    <h1>Project {{ id }}</h1>
    <div class="content">
        <ul>
            <li>
                <RouterLink :to="{ name: 'decreases', params: { id } }">Decreases</RouterLink>
            </li>
            <li>
                <RouterLink :to="{ name: 'converter', params: { id } }">Converter</RouterLink>
            </li>
        </ul>
    </div>
</section>

</template>

<style lang="css" scoped>

</style>