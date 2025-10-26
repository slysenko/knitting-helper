<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["click", "add-new"])
const objectName = ref("")

function createNewObject() {
    emit("add-new", objectName.value);
}
</script>

<template>
    <Teleport to="body">
        <div class="container">
            <div class="content">
                <h3 class="title">
                    <slot name="modal-title"></slot>
                </h3>
                <div class="add-new-form">
                    <output class="project-name">{{ objectName }}</output>
                    <fieldset>
                        <legend>
                            <slot name="legend"></slot>
                        </legend>
                        <div>
                            <input type="text" id="name" v-model="objectName" />
                        </div>
                    </fieldset>
                    <button class="create-object-btn" @click="createNewObject">Create</button>
                </div>
            </div>
        </div>
    </Teleport>

</template>

<style lang="css" scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    backdrop-filter: blur(5px);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    border: 1px solid lightgray;
    border-radius: 2em;
    min-width: 800px;
    width: 800px;
    padding: 2em;
}

.add-new-form {
    height: 50%;
    margin-top: 2em;
}

.project-name {
    display: inline-block;
    height: 1.1em;
    font-weight: 700;
    font-size: 1.1em;
    text-transform: uppercase;
}

fieldset {
    margin-top: 1.5em;
    padding: 1.5em 1em;
    border-radius: 0.5em;
}

fieldset div input {
    width: 80%;
    height: 2.5em;
    border-color: gray;
    border-radius: 0.3em;
    padding: 1em;
    font-size: 1em;
    font-weight: 500;
}

.create-project-btn {
    background-color: steelblue;
    border: 1px solid gray;
    border-radius: 0.4em;
    padding: 1em;
    margin-top: 2em;
    color: aliceblue;
}
</style>