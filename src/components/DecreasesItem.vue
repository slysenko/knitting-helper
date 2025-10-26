<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useRoute } from 'vue-router';

const route = useRoute();

const id = computed(() => {
    return route.params.uuid;
});

const loopsNumber = ref(0);
const rowsNumber = ref(0);
const isFront = ref(true);
const isSteep = ref(false);

const step = 10;

const slope = ref<number[]>([]);

const activeCells = ref(new Set());

const rowTitles = computed(() => {
    return [...Array(Math.floor(rowsNumber.value / step)).keys()].map(i => (i + 1) * step).concat(rowsNumber.value > 0 && rowsNumber.value % 10 > 0 ? rowsNumber.value : []);
});

const table = computed(() => {
    const result: number[] = [];
    let listIndex = 0;

    for (const value of rowTitles.value) {
        result.push(value);

        const elementsToAdd = Math.min(step, slope.value.length - listIndex);
        for (let j = 0; j < elementsToAdd; j++) {
            result.push(slope.value[listIndex++]!);
        }
    }

    return [...result];
});

const rows = computed(() => {
    const rows = [];
    const itemsPerRow = step + 1;

    for (let i = 0; i < table.value.length; i += itemsPerRow) {
        const row = table.value.slice(i, i + itemsPerRow);
        rows.push(row);
    }

    return rows;
});


function calculateSlope() {
    const result: number[] = new Array(rowsNumber.value).fill(0);

    const availableSlots: number[] = [];
    for (let i = 0; i < rowsNumber.value; i++) {
        if (isFront.value && i % 2 === 1) {
            availableSlots.push(i);
        } else if (!isFront.value && i % 2 === 0) {
            availableSlots.push(i);
        }
    }

    const numSlots = availableSlots.length;

    if (numSlots) {
        const fullPasses = Math.floor(loopsNumber.value / numSlots);
        const remainder = loopsNumber.value % numSlots;

        console.log("fullPasses", fullPasses, "remainder", remainder);

        for (let pass = 0; pass < fullPasses; pass++) {
            distributeOnePass(result, availableSlots, 0, numSlots, numSlots);
        }

        if (remainder > 0) {
            distributeOnePass(result, availableSlots, 0, numSlots, remainder);
        }
    }

    slope.value = result;
}

function distributeLoopsEvenly(
    result: number[],
    availableSlots: number[],
    start: number,
    end: number,
    loops: number
): void {
    const rangeSize = end - start;

    if (rangeSize === 0 || loops === 0) {
        return;
    }
    if (availableSlots[start] === undefined || result[availableSlots[start]!] === undefined) {
        return;
    }

    if (loops === 1) {
        result[availableSlots[start]]! += 1;
    } else if (loops === 2) {
        result[availableSlots[start]]! += 1;
        const middleIdx = start + Math.floor(rangeSize / 2);
        result[availableSlots[middleIdx]!]! += 1;
    } else {
        result[availableSlots[start]]! += 1;
        result[availableSlots[end - 1]!]! += 1;

        const spacing = (rangeSize - 1) / (loops - 1);

        for (let i = 1; i < loops - 1; i++) {
            const idx = start + Math.round(i * spacing);
            result[availableSlots[idx]!]! += 1;
        }
    }
    console.log("result", result);
}

function distributeOnePass(
    result: number[],
    availableSlots: number[],
    start: number,
    end: number,
    loops: number,
): void {
    const rangeSize = end - start;
    if (isSteep.value) {
        const part1Size = Math.floor(rangeSize / 3);
        const part2Size = Math.floor(rangeSize / 3);
        const part3Size = rangeSize - part1Size - part2Size;

        const loopsForPart1 = Math.floor(loops / 2);
        const remainingLoops = loops - loopsForPart1;
        const loopsForPart2 = Math.floor(remainingLoops * 2 / 3);
        const loopsForPart3 = remainingLoops - loopsForPart2;

        distributeLoopsEvenly(result, availableSlots, start, start + part1Size, loopsForPart1);
        distributeLoopsEvenly(result, availableSlots, start + part1Size, start + part1Size + part2Size, loopsForPart2);
        distributeLoopsEvenly(result, availableSlots, start + part1Size + part2Size, end, loopsForPart3);
    } else {
        distributeLoopsEvenly(result, availableSlots, start, end, loops);
    }
    console.log("result in distributeOnePass", result);
}

function toggleCell(rowIdx: number, cellIdx: number) {
    const key = `${rowIdx}-${cellIdx}`;
    if (activeCells.value.has(key)) {
        activeCells.value.delete(key);
    } else {
        activeCells.value.add(key);
    }
    activeCells.value = new Set(activeCells.value);
}
function isCellActive(rowIdx: number, cellIdx: number) {
    return activeCells.value.has(`${rowIdx}-${cellIdx}`);
}

watch([loopsNumber, rowsNumber], ([newLoops, newRows]) => {
    if (newLoops > 0 && newRows > 0) {
        calculateSlope();
    }
});

watch([isFront, isSteep], (_, __) => {
    if (loopsNumber.value > 0 && rowsNumber.value > 0) {
        calculateSlope();
    }
});

</script>

<template>
    <div class="container">
        <h2 class="title">Decreases {{ id }}</h2>
        <form class="">
            <div class="">
                <label for="loops">Loops: </label>
                <input type="number" name="loops" id="loops" required v-model="loopsNumber" />
            </div>
            <div class="">
                <label for="rows">Rows: </label>
                <input type="number" name="rows" id="rows" required v-model="rowsNumber" />
            </div>
            <div class="">
                <label for="isFront">front loops?: </label>
                <input type="checkbox" name="front" id="front" v-model="isFront" />
            </div>
            <div class="">
                <label for="isSteep">steep?: </label>
                <input type="checkbox" name="steep" id="steep" v-model="isSteep" />
            </div>
        </form>
    
        <div class="grid-wrapper" v-if="rows.length">
            <div class="grid-container">
                <div class="cell header-cell"></div>
                <div v-for="i in step" :key="'header-' + i" class="cell header-cell">
                    {{ i }}
                </div>
    
                <template v-for="(row, rowIdx) in rows" :key="'row-' + rowIdx">
                    <div class="cell row-header">
                        {{ row[0] }}
                    </div>
    
                    <div v-for="(cell, cellIdx) in row.slice(1)" :key="'cell-' + rowIdx + '-' + cellIdx"
                        class="cell data-cell" :class="{ active: isCellActive(rowIdx, cellIdx) }"
                        @click="toggleCell(rowIdx, cellIdx)">
                        {{ cell > 0 ? cell : '' }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="css"></style>