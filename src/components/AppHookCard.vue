<script setup lang="ts">
import { computed } from "vue";

import { Webhook, FolderOpen } from "lucide-vue-next";
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";

import type { HookModel } from "@/models/hook/hookModel";

type HookCardProp = {
    hook: HookModel;
};

const props = defineProps<HookCardProp>();

const projectCount = computed(() => props.hook.projectCount);

function handleClick() {
    console.log('Hook card clicked:', props.hook._id);
}
</script>

<template>
    <Card class="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
        @click="handleClick">
        <CardHeader class="pb-3">
            <div class="flex gap-4">
                <div
                    class="w-15 h-15 rounded-md flex items-center justify-center text-3xl bg-gradient-to-br from-muted to-border border flex-shrink-0">
                    <Webhook class="w-8 h-8 text-muted-foreground" />
                </div>

                <div class="flex-1 min-w-0">
                    <h3 class="text-base font-semibold mb-1 truncate">{{ hook.displaySize }}</h3>
                    <p v-if="hook.brand" class="text-sm text-muted-foreground mb-2">{{ hook.brand }}</p>

                    <Badge v-if="hook.material" variant="secondary">
                        {{ hook.material }}
                    </Badge>
                </div>
            </div>
        </CardHeader>

        <CardContent class="space-y-3">
            <div class="space-y-2 pt-3 border-t">
                <div v-if="hook.sizeUs" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">US Size</span>
                    <span class="font-medium">{{ hook.sizeUs }}</span>
                </div>

                <div v-if="hook.price !== undefined && hook.price !== null" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Price</span>
                    <span class="font-medium">{{ hook.price }} {{ hook.currency }}</span>
                </div>

                <div v-if="hook.notes" class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Notes</span>
                    <span class="font-medium truncate ml-2">{{ hook.notes }}</span>
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
