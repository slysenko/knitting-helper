<script setup lang="ts">
import { ref } from "vue";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import type { YarnModel } from "@/models/yarn/yarnModel";
import type { NeedleModel } from "@/models/needle/needleModel";
import type { HookModel } from "@/models/hook/hookModel";
import { ListYarns, CreateYarn } from "@/requests/yarns";
import { ListNeedles, CreateNeedle } from "@/requests/needles";
import { ListHooks, CreateHook } from "@/requests/hooks";
import { ApiError, ValidationError } from "@/errors";
import type { YarnCreateParams } from "@/models/schemas/yarn";
import type { NeedleCreateParams } from "@/models/schemas/needle";
import type { HookCreateParams } from "@/models/schemas/hook";
import AppYarnCard from "@/components/AppYarnCard.vue";
import AppNewYarnModal from "@/components/AppNewYarnModal.vue";
import AppNeedleCard from "@/components/AppNeedleCard.vue";
import AppNewNeedleModal from "@/components/AppNewNeedleModal.vue";
import AppHookCard from "@/components/AppHookCard.vue";
import AppNewHookModal from "@/components/AppNewHookModal.vue";
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
} from "@/components/ui/empty";

const yarns = ref<YarnModel[]>([]);
const needles = ref<NeedleModel[]>([]);
const hooks = ref<HookModel[]>([]);
const activeTab = ref("yarns");

const loading = ref(false);
const error = ref();

async function loadYarns() {
    loading.value = true;
    try {
        const request = new ListYarns({});
        yarns.value = await request.call();
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
    } finally {
        loading.value = false;
    }
}

async function loadNeedles() {
    loading.value = true;
    try {
        const request = new ListNeedles({});
        needles.value = await request.call();
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
    } finally {
        loading.value = false;
    }
}

async function handleAddYarn(yarnData: YarnCreateParams) {
    try {
        const request = new CreateYarn(yarnData);
        await request.call();
        // Reload the yarns list after successful creation
        await loadYarns();
    } catch (e) {
        if (e instanceof ValidationError) {
            console.error('Validation failed:', e.issues);
            error.value = 'Invalid yarn data';
        } else if (e instanceof ApiError) {
            console.error('API error:', e.status, e.data);
            error.value = e.message;
        } else {
            console.error('Unknown error:', e);
            error.value = 'Failed to create yarn';
        }
    }
}

async function handleAddNeedle(needleData: NeedleCreateParams) {
    try {
        const request = new CreateNeedle(needleData);
        await request.call();
        await loadNeedles();
    } catch (e) {
        if (e instanceof ValidationError) {
            console.error('Validation failed:', e.issues);
            error.value = 'Invalid needle data';
        } else if (e instanceof ApiError) {
            console.error('API error:', e.status, e.data);
            error.value = e.message;
        } else {
            console.error('Unknown error:', e);
            error.value = 'Failed to create needle';
        }
    }
}

async function loadHooks() {
    loading.value = true;
    try {
        const request = new ListHooks({});
        hooks.value = await request.call();
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
    } finally {
        loading.value = false;
    }
}

async function handleAddHook(hookData: HookCreateParams) {
    try {
        const request = new CreateHook(hookData);
        await request.call();
        // Reload the hooks list after successful creation
        await loadHooks();
    } catch (e) {
        if (e instanceof ValidationError) {
            console.error('Validation failed:', e.issues);
            error.value = 'Invalid hook data';
        } else if (e instanceof ApiError) {
            console.error('API error:', e.status, e.data);
            error.value = e.message;
        } else {
            console.error('Unknown error:', e);
            error.value = 'Failed to create hook';
        }
    }
}

loadYarns();
loadNeedles();
loadHooks();
</script>

<template>
    <div class="flex flex-1 flex-col px-40">
        <div class="@container/main flex flex-1 flex-col gap-2 p-4 pt-0">
            <div class="flex flex-col gap-5 py-4 md:gap-6 md:py-6">
                My Materials
                <Card>
                    <CardHeader>
                        <div class="flex justify-between items-center">
                            <CardTitle>My Collection</CardTitle>
                            <AppNewYarnModal v-if="activeTab === 'yarns'" @add-new="handleAddYarn" />
                            <AppNewNeedleModal v-if="activeTab === 'needles'" @add-new="handleAddNeedle" />
                            <AppNewHookModal v-if="activeTab === 'hooks'" @add-new="handleAddHook" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs default-value="yarns" v-model="activeTab">
                            <TabsList>
                                <TabsTrigger value="yarns">
                                    Yarns
                                </TabsTrigger>
                                <TabsTrigger value="needles">
                                    Needles
                                </TabsTrigger>
                                <TabsTrigger value="hooks">
                                    Hooks
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="yarns" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <template v-if="yarns.length > 0">
                                    <AppYarnCard v-for="yarn in yarns" :key="yarn._id" :yarn="yarn" />
                                </template>
                                <Empty v-else class="col-span-full">
                                    <EmptyHeader>
                                        <EmptyTitle>No yarns yet</EmptyTitle>
                                        <EmptyDescription>
                                            Start building your yarn collection by adding your first yarn.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </TabsContent>
                            <TabsContent value="needles" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <template v-if="needles.length > 0">
                                    <AppNeedleCard v-for="needle in needles" :key="needle._id" :needle="needle" />
                                </template>
                                <Empty v-else class="col-span-full">
                                    <EmptyHeader>
                                        <EmptyTitle>No needles yet</EmptyTitle>
                                        <EmptyDescription>
                                            Start building your needle collection by adding your first needle.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </TabsContent>
                            <TabsContent value="hooks" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <template v-if="hooks.length > 0">
                                    <AppHookCard v-for="hook in hooks" :key="hook._id" :hook="hook" />
                                </template>
                                <Empty v-else class="col-span-full">
                                    <EmptyHeader>
                                        <EmptyTitle>No hooks yet</EmptyTitle>
                                        <EmptyDescription>
                                            Start building your hook collection by adding your first hook.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>