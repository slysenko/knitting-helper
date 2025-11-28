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
    name: z.string().min(1, { message: "Required" }).max(200, "Not more than 200 letters are allowed"),
    brand: z.string().max(200).optional(),
    yarnType: z.string().max(100).optional(),
    fiberContent: z.string().max(500).optional(),
    color: z.string().max(100).optional(),
    lotNumber: z.string().max(100).optional(),
    length: z.coerce.number().nonnegative().optional(),
    lengthUnit: z.enum(["meters", "yards", "feet"]).default("meters"),
    weight: z.coerce.number().nonnegative().optional(),
    weightUnit: z.enum(["grams", "ounces", "pounds"]).default("grams"),
    pricePerUnit: z.coerce.number().nonnegative().optional(),
    currency: z.string().max(10).default("EUR"),
    purchaseDate: z.string().optional(),
    purchaseLocation: z.string().max(500).optional(),
    quantityInStash: z.coerce.number().int().nonnegative().default(1),
    notes: z.string().max(2000).optional(),
});

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(formSchema),
    initialValues: {
        name: "",
        brand: "",
        yarnType: "",
        fiberContent: "",
        color: "",
        lotNumber: "",
        length: undefined,
        lengthUnit: "meters",
        weight: undefined,
        weightUnit: "grams",
        pricePerUnit: undefined,
        currency: "EUR",
        purchaseDate: "",
        purchaseLocation: "",
        quantityInStash: 1,
        notes: "",
    },
})

const emit = defineEmits(["add-new"]);

const isOpen = ref(false)

const onSubmit = handleSubmit((values) => {
    console.log('Yarn form submitted!', values);

    const yarnData = {
        name: values.name,
        brand: values.brand || undefined,
        yarnType: values.yarnType || undefined,
        fiberContent: values.fiberContent || undefined,
        color: values.color || undefined,
        lotNumber: values.lotNumber || undefined,
        length: values.length || undefined,
        lengthUnit: values.lengthUnit,
        weight: values.weight || undefined,
        weightUnit: values.weightUnit,
        pricePerUnit: values.pricePerUnit || undefined,
        currency: values.currency,
        purchaseDate: values.purchaseDate ? new Date(values.purchaseDate) : undefined,
        purchaseLocation: values.purchaseLocation || undefined,
        quantityInStash: values.quantityInStash,
        notes: values.notes || undefined,
    };

    emit("add-new", yarnData);
    resetForm();
    isOpen.value = false;
})
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger as-child>
            <Button size="sm">
                <Plus class="w-4 h-4 mr-2" />
                Add Yarn
            </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Add New Yarn to Collection</DialogTitle>
            </DialogHeader>
            <form @submit="onSubmit" id="yarnForm">
                <FieldGroup>
                    <VeeField v-slot="{ field, errors }" name="name">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-name" class="label-required">
                                Yarn Name
                            </FieldLabel>
                            <Input id="new-yarn-name" v-bind="field" placeholder="Enter yarn name"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="brand">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-brand">
                                Brand
                            </FieldLabel>
                            <Input id="new-yarn-brand" v-bind="field" placeholder="e.g., Lion Brand"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="yarnType">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-type">
                                Yarn Type
                            </FieldLabel>
                            <Input id="new-yarn-type" v-bind="field" placeholder="e.g., DK, Worsted, Fingering"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="fiberContent">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-fiber">
                                Fiber Content
                            </FieldLabel>
                            <Input id="new-yarn-fiber" v-bind="field" placeholder="e.g., 100% Merino Wool"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="color">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-color">
                                Color
                            </FieldLabel>
                            <Input id="new-yarn-color" v-bind="field" placeholder="e.g., Navy Blue"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="lotNumber">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-lot">
                                Lot Number
                            </FieldLabel>
                            <Input id="new-yarn-lot" v-bind="field" placeholder="Enter lot number"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <div class="grid grid-cols-2 gap-4">
                        <VeeField v-slot="{ field, errors }" name="length">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-yarn-length">
                                    Length
                                </FieldLabel>
                                <Input id="new-yarn-length" v-bind="field" type="number" step="0.01" min="0"
                                    placeholder="0" autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>

                        <VeeField v-slot="{ field, errors }" name="lengthUnit">
                            <Field orientation="responsive" :data-invalid="!!errors.length">
                                <FieldContent>
                                    <FieldLabel for="new-yarn-length-unit">
                                        Length Unit
                                    </FieldLabel>
                                    <FieldError v-if="errors.length" :errors="errors" />
                                </FieldContent>
                                <Select :name="field.name" :model-value="field.value" @update:model-value="field.onChange">
                                    <SelectTrigger id="new-yarn-length-unit" :aria-invalid="!!errors.length">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="meters">Meters</SelectItem>
                                        <SelectItem value="yards">Yards</SelectItem>
                                        <SelectItem value="feet">Feet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </VeeField>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <VeeField v-slot="{ field, errors }" name="weight">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-yarn-weight">
                                    Weight
                                </FieldLabel>
                                <Input id="new-yarn-weight" v-bind="field" type="number" step="0.01" min="0"
                                    placeholder="0" autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>

                        <VeeField v-slot="{ field, errors }" name="weightUnit">
                            <Field orientation="responsive" :data-invalid="!!errors.length">
                                <FieldContent>
                                    <FieldLabel for="new-yarn-weight-unit">
                                        Weight Unit
                                    </FieldLabel>
                                    <FieldError v-if="errors.length" :errors="errors" />
                                </FieldContent>
                                <Select :name="field.name" :model-value="field.value" @update:model-value="field.onChange">
                                    <SelectTrigger id="new-yarn-weight-unit" :aria-invalid="!!errors.length">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        <SelectItem value="grams">Grams</SelectItem>
                                        <SelectItem value="ounces">Ounces</SelectItem>
                                        <SelectItem value="pounds">Pounds</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </VeeField>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <VeeField v-slot="{ field, errors }" name="pricePerUnit">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-yarn-price">
                                    Price per Unit
                                </FieldLabel>
                                <Input id="new-yarn-price" v-bind="field" type="number" step="0.01" min="0"
                                    placeholder="0.00" autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>

                        <VeeField v-slot="{ field, errors }" name="currency">
                            <Field :data-invalid="!!errors.length">
                                <FieldLabel for="new-yarn-currency">
                                    Currency
                                </FieldLabel>
                                <Input id="new-yarn-currency" v-bind="field" placeholder="EUR"
                                    autocomplete="off" :aria-invalid="!!errors.length" />
                                <FieldError v-if="errors.length" :errors="errors" />
                            </Field>
                        </VeeField>
                    </div>

                    <VeeField v-slot="{ field, errors }" name="purchaseDate">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-purchase-date">
                                Purchase Date
                            </FieldLabel>
                            <Input id="new-yarn-purchase-date" v-bind="field" type="date"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="purchaseLocation">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-purchase-location">
                                Purchase Location
                            </FieldLabel>
                            <Input id="new-yarn-purchase-location" v-bind="field" placeholder="e.g., Local yarn shop"
                                autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="quantityInStash">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-quantity">
                                Quantity in Stash
                            </FieldLabel>
                            <Input id="new-yarn-quantity" v-bind="field" type="number" min="0" step="1"
                                placeholder="1" autocomplete="off" :aria-invalid="!!errors.length" />
                            <FieldError v-if="errors.length" :errors="errors" />
                        </Field>
                    </VeeField>

                    <VeeField v-slot="{ field, errors }" name="notes">
                        <Field :data-invalid="!!errors.length">
                            <FieldLabel for="new-yarn-notes">
                                Notes
                            </FieldLabel>
                            <Textarea id="new-yarn-notes" v-bind="field" :aria-invalid="!!errors.length"
                                placeholder="Add any additional notes about this yarn..." class="min-h-[120px]" />
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
                <Button type="submit" form="yarnForm">
                    Add Yarn
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
