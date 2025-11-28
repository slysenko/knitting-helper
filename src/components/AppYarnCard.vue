<script setup lang="ts">
import { computed } from "vue";

import { Spool, FolderOpen } from "lucide-vue-next";
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";

import type { YarnModel } from "@/models/yarn/yarnModel";

type YarnCardProp = {
    yarn: YarnModel;
};

const props = defineProps<YarnCardProp>();

const imageUrl = computed(() => {
    const photo = props.yarn.displayPhoto;
    return photo?.filePath || "";
});

const quantityDisplay = computed(() => {
    const qty = props.yarn.quantityInStash;
    const unit = qty === 1 ? 'skein' : 'skeins';
    return `${qty} ${unit}`;
});

const projectCount = computed(() => props.yarn.projectCount);

const colorValue = computed(() => {
    return '#4a4a4a';
});

function handleClick() {
    // TODO Navigate to yarn detail page when implemented
    // router.push({ name: 'yarn', params: { id: props.yarn._id } });
    console.log('Yarn card clicked:', props.yarn._id);
}
</script>

<template>
    <Card class="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
        @click="handleClick">
        <CardHeader class="pb-3">
            <div class="flex gap-4">
                <div
                    class="w-15 h-15 rounded-md flex items-center justify-center text-3xl bg-gradient-to-br from-muted to-border border flex-shrink-0">
                    <img v-if="imageUrl" :src="imageUrl" :alt="yarn.name"
                        class="w-full h-full object-cover rounded-md" />
                    <Spool v-else class="w-8 h-8 text-muted-foreground" />
                </div>

                <div class="flex-1 min-w-0">
                    <h3 class="text-base font-semibold mb-1 truncate">{{ yarn.name }}</h3>
                    <p v-if="yarn.brand" class="text-sm text-muted-foreground mb-2">{{ yarn.brand }}</p>

                    <Badge v-if="yarn.color" variant="secondary" class="inline-flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full border border-border"
                            :style="{ background: colorValue }"></span>
                        {{ yarn.color }}
                    </Badge>
                </div>
            </div>
        </CardHeader>

        <CardContent class="space-y-3">
            <div class="space-y-2 pt-3 border-t">
                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Yarn Type</span>
                    <span class="font-medium">{{ yarn.yarnType || '' }}</span>
                </div>

                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Fiber</span>
                    <span class="font-medium">{{ yarn.fiberContent || '' }}</span>
                </div>

                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Length</span>
                    <span class="font-medium">{{ yarn.length ? `${yarn.length} ${yarn.lengthUnit}` : '' }}</span>
                </div>

                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Weight</span>
                    <span class="font-medium">{{ yarn.weight ? `${yarn.weight} ${yarn.weightUnit}` : '' }}</span>
                </div>

                <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">In Stash</span>
                    <span class="font-medium">{{ quantityDisplay }}</span>
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