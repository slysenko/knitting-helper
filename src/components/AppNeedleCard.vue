<script setup lang="ts">
import { computed } from "vue";

import { Pipette, FolderOpen } from "lucide-vue-next";
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";

import type { NeedleModel } from "@/models/needle/needleModel";

type NeedleCardProp = {
    needle: NeedleModel;
};

const props = defineProps<NeedleCardProp>();

const projectCount = computed(() => props.needle.projectCount);

const displaySize = computed(() => props.needle.displaySize);
const displayType = computed(() => props.needle.displayType);
const displayLength = computed(() => props.needle.displayLength);

function handleClick() {
    console.log('Needle card clicked:', props.needle._id);
}
</script>

<template>
    <Card class="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
        @click="handleClick">
        <CardHeader class="pb-3">
            <div class="flex gap-4">
                <div
                    class="w-15 h-15 rounded-md flex items-center justify-center text-3xl bg-gradient-to-br from-muted to-border border flex-shrink-0">
                    <Pipette class="w-8 h-8 text-muted-foreground" />
                </div>

                <div class="flex-1 min-w-0">
                    <h3 class="text-base font-semibold mb-1 truncate">{{ displaySize }}</h3>
                    <p class="text-sm text-muted-foreground mb-2">{{ displayType }}</p>

                    <Badge v-if="needle.brand" variant="secondary">
                        {{ needle.brand }}
                    </Badge>
                </div>
            </div>
        </CardHeader>

        <CardContent class="space-y-3">
            <div class="space-y-2 pt-3 border-t">
                <div v-if="displayLength" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Length</span>
                    <span class="font-medium">{{ displayLength }}</span>
                </div>

                <div v-if="needle.material" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Material</span>
                    <span class="font-medium">{{ needle.material }}</span>
                </div>

                <div v-if="needle.price" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Price</span>
                    <span class="font-medium">{{ needle.price }} {{ needle.currency }}</span>
                </div>

                <div v-if="needle.notes" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Notes</span>
                    <span class="font-medium truncate">{{ needle.notes }}</span>
                </div>
            </div>

            <Badge v-if="projectCount > 0" variant="outline"
                class="w-full justify-center gap-2 bg-accent/10 text-accent border-accent/20">
                <FolderOpen class="w-3 h-3" />
                Used in {{ projectCount }} {{ projectCount === 1 ? 'project' : 'projects' }}
            </Badge>
        </CardContent>
    </Card>
</template>
