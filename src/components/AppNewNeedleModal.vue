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
    sizeMm: z.coerce.number().positive({ message: "Size must be positive" }),
    sizeUs: z.string().max(20).optional(),
    type: z.enum(["straight", "circular", "dpn"], {
        required_error: "Needle type is required"
    }),
    lengthCm: z.coerce.number().positive().optional(),
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
        type: undefined,
        lengthCm: undefined,
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
    console.log('Needle form submitted!', values);

    const needleData = {
        sizeMm: values.sizeMm!,
        type: values.type!,
        sizeUs: values.sizeUs || undefined,
        lengthCm: values.lengthCm || undefined,
        material: values.material || undefined,
        brand: values.brand || undefined,
        price: values.price || undefined,
        currency: values.currency,
        notes: values.notes || undefined,
    };

    emit("add-new", needleData);
    resetForm();
    isOpen.value = false;
})
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button size="sm">
                <Plus class="w-4 h-4 mr-2" />
                Add Needle
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Add New Needle to Collection</DialogTitle>
            </DialogHeader>
            <form @submit="onSubmit" id="needleForm">
                <FieldGroup>
                    <VeeField v-slot="{ field, errors }" name="sizeMm">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-needle-size-mm" class="label-required">
                                Size (mm)
                            </FieldLabel>
                            <Input id="new-needle-size-mm" v-bind="field" type="number" step="0.25" min="0.1"
                                placeholder="e.g., 4.0" autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="sizeUs">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-needle-size-us">
                                US Size
                            </FieldLabel>
                            <Input id="new-needle-size-us" v-bind="field" placeholder="e.g., US 6"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="type">
                        <Field orientation="responsive" :data-invalid="!!errors.length">
                            <FieldContent>
                                <FieldLabel for="new-needle-type" class="label-required">
                                    Needle Type
                                </FieldLabel>
                                <FieldError v-if="errors.length" :errors="errors" />
                            </FieldContent>
                            <Select :name="field.name" :model-value="field.value" @update:model-value="field.onChange">
                                <SelectTrigger id="new-needle-type" :aria-invalid="!!errors.length">
                                    <SelectValue placeholder="Select needle type" />
                                </SelectTrigger>
                                <SelectContent position="item-aligned">
                                    <SelectItem value="straight">Straight</SelectItem>
                                    <SelectItem value="circular">Circular</SelectItem>
                                    <SelectItem value="dpn">Double-Pointed (DPN)</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="lengthCm">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-needle-length">
                                Length (cm)
                            </FieldLabel>
                            <Input id="new-needle-length" v-bind="field" type="number" step="0.5" min="0.1"
                                placeholder="e.g., 80" autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="material">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-needle-material">
                                Material
                            </FieldLabel>
                            <Input id="new-needle-material" v-bind="field" placeholder="e.g., Bamboo, Metal, Wood"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="brand">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-needle-brand">
                                Brand
                            </FieldLabel>
                            <Input id="new-needle-brand" v-bind="field" placeholder="e.g., ChiaoGoo, Addi"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <div class="grid grid-cols-2 gap-4">
                        <VeeField v-slot="{ field, errors }" name="price">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-needle-price">
                                    Price
                                </FieldLabel>
                                <Input id="new-needle-price" v-bind="field" type="number" step="0.01" min="0"
                                    placeholder="0.00" autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>

                        <VeeField v-slot="{ field, errors }" name="currency">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-needle-currency">
                                    Currency
                                </FieldLabel>
                                <Input id="new-needle-currency" v-bind="field" placeholder="EUR"
                                    autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>
                    </div>

                    <VeeField v-slot="{ field, errors }" name="notes">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-needle-notes">
                                Notes
                            </FieldLabel>
                            <Textarea id="new-needle-notes" v-bind="field" :aria-invalid="!!errors.length"
                                placeholder="Add any additional notes about this needle..." class="min-h-[120px]" />
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
                <Button type="submit" form="needleForm">
                    Add Needle
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
