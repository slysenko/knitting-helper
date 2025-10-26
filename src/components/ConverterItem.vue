<script setup lang="ts">
import { ref, computed, watch }  from "vue";

type TConverterInput = {
    id: string,
    items: number,
    metric: number,
    type: 'loops' | "rows"
}

const emit = defineEmits(["update"])

const props = defineProps<TConverterInput>()

const inputMetricValue = ref(0);
const outputItemValue = computed(() => {
    return props.items * inputMetricValue.value / props.metric;
});

watch(outputItemValue, (newVal) => {
    emit("update", newVal, inputMetricValue.value, props.id);
})
</script>

<template>
    <div class="wrapper">
        <label for="input-value">
            <slot name="input-label"></slot>
        </label>
        <input type="number" id="input-value" name="input-value" v-model="inputMetricValue">cm</input> =
        <label>
            <slot name="output-label"></slot>
        </label>
        <output>{{ outputItemValue }}</output> {{ props.type }}
    </div>
</template>

<style lang="css" scoped></style>