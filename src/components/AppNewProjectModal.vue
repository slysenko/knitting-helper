<script setup lang="ts">
import { ref } from "vue";

import { toTypedSchema } from '@vee-validate/zod';
import { useForm, Field as VeeField } from 'vee-validate';
import * as z from 'zod';

import { Plus } from "lucide-vue-next";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    name: z.string().min(1, { message: "Required" }).max(256, "Not more than 256 letters are allowed"),
    projectType: z.enum(["knitting", "crochet"]),
    primaryYarn: z.string().optional(),
    comments: z.string().optional(),
});

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
        name: "",
        projectType: "knitting",
        primaryYarn: "",
        comments: "",
    },
})

const emit = defineEmits(["click", "add-new", "close", "submit"]);

const isOpen = ref(false)

const onSubmit = handleSubmit((values) => {
    console.log('Form submitted!', values);
    emit("add-new", values);
    resetForm();
    isOpen.value = false;
})
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button class="fixed bottom-10 right-10" size="icon-lg">
                <Plus />
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create new project</DialogTitle>
            </DialogHeader>
            <form @submit="onSubmit" id="projectForm">
                <FieldGroup>
                    <VeeField v-slot="{ field, errors }" name="name">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-project-name" class="label-required">
                                Project Name
                            </FieldLabel>
                            <Input id="new-project-name" v-bind="field" placeholder="Enter project name"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>
                    <VeeField v-slot="{ field, errors }" name="projectType">
                        <Field orientation="responsive" :data-invalid="!!errors.length">
                            <FieldContent>
                                <FieldLabel for="new-project-type">
                                    Project Type
                                </FieldLabel>
                                <FieldError v-if="errors.length" :errors="errors" />
                            </FieldContent>
                            <Select :name="field.name" :model-value="field.value" @update:model-value="field.onChange">
                                <SelectTrigger id="new-project-type" :aria-invalid="!!errors.length"
                                    class="min-w-[120px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="knitting">
                                        Knitting
                                    </SelectItem>
                                    <SelectItem value="crochet">
                                        Crochet
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </VeeField>
                    <VeeField v-slot="{ field, errors }" name="primaryYarn">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-project-primary-yarn">
                                Yarn name
                            </FieldLabel>
                            <Input id="new-project-primary-yarn" v-bind="field" placeholder="e.g., Merino Wool"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>
                    <!-- <VeeField v-slot="{ field, errors }" name="primaryYarn">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-project-primary-tool">
                                Needle/Hook Size
                            </FieldLabel>
                            <Input id="new-project-primary-tool" v-bind="field" placeholder="e.g., 4.0mm"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField> -->
                    <VeeField v-slot="{ field, errors }" name="about">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="form-vee-textarea-about">
                                Comments / Description
                            </FieldLabel>
                            <Textarea id="form-vee-textarea-about" v-bind="field" :aria-invalid="!!errors.length"
                                placeholder="Add notes about your project..." class="min-h-[120px]" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>
                </FieldGroup>
            </form>
            <DialogFooter class="sm:justify-start">
                <DialogClose as-child>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button type="button" variant="outline" @click="resetForm">
                    Reset
                </Button>
                <Button type="submit" form="projectForm">
                    Submit
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>