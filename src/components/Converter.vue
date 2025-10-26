<script setup lang="ts">
import { ref, computed } from "vue";
import { v4 as uuidv4 } from 'uuid';
import ConverterItem from "./ConverterItem.vue";

type TConverterCorrelation = { metric: number, items: number };

const loops = ref(0);
const width = ref(0);
const rows = ref(0);
const height = ref(0);

const widths = ref<Record<string, TConverterCorrelation>>({});
const heights = ref<Record<string, TConverterCorrelation>>({});

const isAddWidthConverterButtonShown = computed(() => {
    return loops.value && width.value;
});

const isAddHeightConverterButtonShown = computed(() => {
    return rows.value && height.value;
});

function addWidthConverterItem() {
    const id = uuidv4();
    widths.value[id] = {
        metric: 0, items: 0
    }
}

function addHeightConverterItem() {
    const id = uuidv4();
    heights.value[id] = {
        metric: 0, items: 0
    }
}

function removeWidthConverterItem(id: string) {
    delete widths.value[id];
}

function addWidth(itemValue: number, metricValue: number, id: string) {
    widths.value[id] = { metric: metricValue, items: itemValue };
}

function addHeight(itemValue: number, metricValue: number, id: string) {
    heights.value[id] = { metric: metricValue, items: itemValue };
}

</script>

<template>
    <section class="container">
        <h1>Converter</h1>
        <div class="content">
            <div class="form">
                <label for="loops">Loops</label>
                <input type="number" name="loops" id="loops" v-model="loops">
                <label for="width">Width</label>
                <input type="number" name="width" id="width" v-model="width">
                <label for="rows">Rows</label>
                <input type="number" name="rows" id="rows" v-model="rows">
                <label for="height">Height</label>
                <input type="number" name="height" id="height" v-model="height">
            </div>
            <div class="calculations">
                <h3>Widths:</h3>
                <ul>
                    <li v-for="(_, key) in widths" :key="key">
                        <ConverterItem :items="loops" :metric="width" :id="key" type="loops" @update="addWidth" />
                        <button class="remove-btn" @click="removeWidthConverterItem(key)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#e3e3e3">
                                <path d="M200-440v-80h560v80H200Z" />
                            </svg>
                        </button>
                    </li>
                </ul>
                <button class="add-btn" v-if="isAddWidthConverterButtonShown" @click="addWidthConverterItem()">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e3e3e3">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                </button>
                <h3>Heights:</h3>
                <ul>
                    <li v-for="(_, key) in heights" :key="key">
                        <ConverterItem :items="rows" :metric="height" :id="key" type="rows" @update="addHeight" />
                        <button class="remove-btn" @click="removeWidthConverterItem(key)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#e3e3e3">
                                <path d="M200-440v-80h560v80H200Z" />
                            </svg>
                        </button>
                    </li>
                </ul>
                <button class="add-btn" v-if="isAddHeightConverterButtonShown" @click="addHeightConverterItem()">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#e3e3e3">
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>