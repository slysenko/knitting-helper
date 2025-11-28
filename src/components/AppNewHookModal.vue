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
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    sizeMm: z.coerce.number().positive({ message: "Size must be a positive number" }),
    sizeUs: z.string().max(50).optional(),
    material: z.string().max(100).optional(),
    brand: z.string().max(200).optional(),
    price: z.coerce.number().nonnegative().optional(),
    currency: z.string().max(10).default("EUR"),
    notes: z.string().max(2000).optional(),
});

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
        sizeMm: undefined,
        sizeUs: "",
        material: "",
        brand: "",
        price: undefined,
        currency: "EUR",
        notes: "",
    },
})

const emit = defineEmits(["add-new"]);

const isOpen = ref(false)

const onSubmit = handleSubmit((values) => {
    console.log('Hook form submitted!', values);

    const hookData = {
        sizeMm: values.sizeMm,
        sizeUs: values.sizeUs || undefined,
        material: values.material || undefined,
        brand: values.brand || undefined,
        price: values.price || undefined,
        currency: values.currency,
        notes: values.notes || undefined,
    };

    emit("add-new", hookData);
    resetForm();
    isOpen.value = false;
})
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button size="sm">
                <Plus class="w-4 h-4 mr-2" />
                Add Hook
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Add New Hook to Collection</DialogTitle>
            </DialogHeader>
            <form @submit="onSubmit" id="hookForm">
                <FieldGroup>
                    <VeeField v-slot="{ field, errors }" name="sizeMm">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-hook-size-mm" class="label-required">
                                Size (mm)
                            </FieldLabel>
                            <Input id="new-hook-size-mm" v-bind="field" type="number" step="0.01" min="0.01"
                                placeholder="e.g., 5.0" autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="sizeUs">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-hook-size-us">
                                US Size
                            </FieldLabel>
                            <Input id="new-hook-size-us" v-bind="field" placeholder="e.g., H/8, J/10"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="material">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-hook-material">
                                Material
                            </FieldLabel>
                            <Input id="new-hook-material" v-bind="field" placeholder="e.g., Aluminum, Bamboo, Steel"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="brand">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-hook-brand">
                                Brand
                            </FieldLabel>
                            <Input id="new-hook-brand" v-bind="field" placeholder="e.g., Clover, Tulip"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <div class="grid grid-cols-2 gap-4">
                        <VeeField v-slot="{ field, errors }" name="price">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-hook-price">
                                    Price
                                </FieldLabel>
                                <Input id="new-hook-price" v-bind="field" type="number" step="0.01" min="0"
                                    placeholder="0.00" autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>

                        <VeeField v-slot="{ field, errors }" name="currency">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-hook-currency">
                                    Currency
                                </FieldLabel>
                                <Input id="new-hook-currency" v-bind="field" placeholder="EUR"
                                    autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>
                    </div>

                    <VeeField v-slot="{ field, errors }" name="notes">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-hook-notes">
                                Notes
                            </FieldLabel>
                            <Textarea id="new-hook-notes" v-bind="field" :aria-invalid="!!errors.length"
                                placeholder="Add any additional notes about this hook..." class="min-h-[120px]" />
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
                <Button type="submit" form="hookForm">
                    Add Hook
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
