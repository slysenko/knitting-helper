<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["click", "add-new", "close"]);
const objectName = ref("")

type TProjectForm = {
    name: string, projectType: "knitting" | "crochet", primaryYarn: string, comments: string
}
const newProject = ref<TProjectForm>({
    name: '',
    projectType: 'knitting',
    primaryYarn: '',
    comments: ''
});

// function createNewObject() {
//     emit("add-new", objectName.value);
// }

function resetForm() {
    newProject.value = {
        name: '',
        projectType: 'knitting',
        primaryYarn: "",
        comments: ''
    }
}

function closeModal() {
    emit("close");
}

function handleCreateProject() {
    emit("add-new", newProject.value);
    resetForm();
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

                    <!-- <fieldset>
                        <legend>
                            <slot name="legend"></slot>
                        </legend>
                        <div>
                            <input type="text" id="name" v-model="objectName" />
                        </div>
                    </fieldset>
                    <button class="create-object-btn" @click="createNewObject">Create</button> -->

                    <form @submit.prevent="handleCreateProject" class="modal-body">
                        <div class="form-group">
                            <label for="projectName" class="required">Project Name</label>
                            <input id="projectName" v-model="newProject.name" type="text"
                                placeholder="e.g., Winter Sweater" required maxlength="100" />
                        </div>

                        <div class="form-group">
                            <label class="required">Project Type</label>
                            <div class="radio-group">
                                <label class="radio-label">
                                    <input type="radio" v-model="newProject.projectType" value="knitting" required />
                                    <span>🧶 Knitting</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" v-model="newProject.projectType" value="crochet" required />
                                    <span>🪡 Crochet</span>
                                </label>
                            </div>
                        </div>

                        <!-- <div class="form-group">
                            <label for="yarnSelect">Yarn (Optional)</label>
                            <select id="yarnSelect" v-model="newProject.yarnId">
                                <option :value="null">Select a yarn...</option>
                                <option v-for="yarn in availableYarns" :key="yarn.id" :value="yarn.id">
                                    {{ yarn.name }} {{ yarn.brand ? `- ${yarn.brand}` : '' }} {{ yarn.color ?
                                        `(${yarn.color})` : '' }}
                                </option>
                            </select>
                            <small class="help-text">You can add or change yarn later</small>
                        </div> -->

                        <div class="form-group">
                            <label for="projectComments">Notes / Comments</label>
                            <textarea id="projectComments" v-model="newProject.comments" rows="4"
                                placeholder="Add any notes about this project..." maxlength="1000"></textarea>
                            <small class="char-count">{{ newProject.comments?.length || 0 }} / 1000</small>
                        </div>

                        <!-- Modal Actions -->
                        <div class="modal-actions">
                            <button type="button" @click="closeModal" class="btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" class="btn-primary">Create</button>
                        </div>
                    </form>
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