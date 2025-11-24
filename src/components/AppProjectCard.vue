<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

import { Camera, Spool, CalendarDays } from "lucide-vue-next";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Progress } from '@/components/ui/progress';
import { Button } from "@/components/ui/button";

import type { ProjectModel } from "@/models/project/projectModel";

type ProjectProp = { project: ProjectModel };

const props = defineProps<ProjectProp>();
const router = useRouter()

const imageUrl = ref("");
const title = ref("Image title");

function handleClick() {
    router.push({ name: 'project', params: { id: props.project.id } });
}
</script>

<template>
    <Card
        class="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] pt-0 overflow-hidden">
        <div
            class="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl">
            <img v-if="imageUrl" :src="imageUrl" :alt="title" class="w-full h-full object-cover" />
            <span v-else class="text-muted-foreground">
                <Camera />
            </span>
        </div>
        <CardHeader>
            <CardTitle>{{ project.name }}</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <Badge variant="secondary">{{ project.projectType }}</Badge>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
            <Item v-for="yarn in project.yarnsUsed">
                <ItemMedia>
                    <Spool />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>{{ yarn }}</ItemTitle>
                </ItemContent>
            </Item>
            <Item>
                <ItemMedia>
                    <Spool />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Merino Wool - Charcoal</ItemTitle>
                </ItemContent>
            </Item>
            <Item>
                <ItemMedia>
                    <CalendarDays />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>
                        Started {{
                            project.createdAt.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                        }}
                    </ItemTitle>
                </ItemContent>
            </Item>
            <p class="pb-4">Progress</p>
            <Progress :model-value="33" />
        </CardContent>
        <CardFooter class=" w-full justify-between">
            <Badge variant="secondary">Active</Badge>
            <Button @click="handleClick">View Details</Button>
        </CardFooter>
    </Card>
</template>