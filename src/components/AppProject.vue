<script setup lang="ts">
import { ref, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from 'vue-router';

import type { ProjectModel } from '../models/project/projectModel';
import { ValidationError, ApiError } from '../errors';

import { GetProject } from '../requests/projects';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Item, ItemHeader, ItemContent } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const route = useRoute();

const project = ref<ProjectModel>([]);
const loading = ref(false);
const error = ref();

const id = computed(() => {
    return String(route.params.id || '');
});

onBeforeMount(() => {
    loadProject();
});

async function loadProject() {
    loading.value = true;
    try {
        const request = new GetProject({ id: id.value });
        project.value = await request.call();
    } catch (e) {
        if (e instanceof ValidationError) {
            console.error('Validation failed:', e.issues);
            error.value = 'Invalid data received from server';
        } else if (e instanceof ApiError) {
            console.error('API error:', e.status, e.data);
            error.value = e.message;
        } else {
            console.error('Unknown error:', e);
            error.value = 'An unexpected error occurred';
        }
    }
};

</script>

<template>
    <div class="flex flex-1 flex-col 2xl:px-40 xl:px-20">
        <div class="@container/main flex flex-1 flex-col gap-2 p-4 pt-0">
            <div class="flex flex-col gap-5 py-4 md:gap-6 md:py-6">
                <div
                    class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-5 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-0">
                    <Card class="@container/card">
                        <CardHeader>
                            <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {{ project.name }}
                            </CardTitle>
                            <Badge variant="outline" class="bg-pink-500">{{ project.projectType }}</Badge>
                        </CardHeader>
                        <CardContent class="flex flex-row flex-wrap gap-4 px-1">
                            <Item class="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0">
                                <ItemHeader>
                                    Status
                                </ItemHeader>
                                <ItemContent>
                                    <Badge variant="outline" class="bg-green-500">{{ project.status }}</Badge>
                                </ItemContent>
                            </Item>
                            <Item class="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0">
                                <ItemHeader>
                                    Yarn
                                </ItemHeader>
                                <ItemContent>
                                    Merino Wool - Charcoal
                                </ItemContent>
                            </Item>
                            <Item class="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0">
                                <ItemHeader>
                                    Needls
                                </ItemHeader>
                                <ItemContent>
                                    4.0mm Circular
                                </ItemContent>
                            </Item>
                            <Item class="flex-1 basis-[calc(50%-0.5rem)] lg:basis-0">
                                <ItemHeader>
                                    Started
                                </ItemHeader>
                                <ItemContent>
                                    {{
                                        project?.createdAt?.toLocaleDateString(undefined, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                    }}
                                </ItemContent>
                            </Item>
                        </CardContent>
                    </Card>
                    <div>
                        <Tabs default-value="converter">
                            <TabsList>
                                <TabsTrigger value="converter">
                                    Converter
                                </TabsTrigger>
                                <TabsTrigger value="decreases">
                                    Decreases
                                </TabsTrigger>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="photos">
                                    Photos
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="converter">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Gauge Converter</CardTitle>
                                    </CardHeader>
                                    <CardContent class="grid gap-6">
                                        Current gauge
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="decreases">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Decreases</CardTitle>
                                    </CardHeader>
                                    <CardContent class="grid gap-6">
                                        Decreases
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="overview">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent class="grid gap-6">
                                        Current overview
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="photos">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Photos</CardTitle>
                                    </CardHeader>
                                    <CardContent class="grid gap-6">
                                        My photos
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
