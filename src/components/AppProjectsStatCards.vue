<script setup lang="ts">
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
</script>

<template>
    <div
        class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-5 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-0 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card class="@container/card">
            <CardHeader>
                <CardDescription>Total Projects</CardDescription>
                <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    12
                </CardTitle>
            </CardHeader>
        </Card>
        <Card class="@container/card">
            <CardHeader>
                <CardDescription>Active</CardDescription>
                <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    4
                </CardTitle>
            </CardHeader>
        </Card>
        <Card class="@container/card">
            <CardHeader>
                <CardDescription>Completed</CardDescription>
                <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    7
                </CardTitle>
            </CardHeader>
        </Card>
        <Card class="@container/card">
            <CardHeader>
                <CardDescription>Hibernating</CardDescription>
                <CardTitle class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    1
                </CardTitle>
            </CardHeader>
        </Card>
    </div>
</template>