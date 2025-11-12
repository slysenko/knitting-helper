<script setup lang="ts">
import { ref } from "vue";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { ProjectModel } from "@/models/project/projectModel";

type ProjectProp = { project: ProjectModel };

const props = defineProps<ProjectProp>();
</script>

<template>
    <Card>
        <div class="card-header-filler"></div>
        <CardContent>
            <div class="card-title-wrapper">
                <div>
                    <CardTitle>
                        {{ project.name }}
                    </CardTitle>
                    <Badge variant="primary" size="badge-sm">{{ project.projectType }}</Badge>
                </div>
            </div>
            <div class="main-info-wrapper">
                <div class="main-info-row" v-for="yarn in project.yarnsUsed">
                    {{ yarn }}
                </div>
                <div class="main-info-row">
                    Started {{ project.createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                    }}
                </div>
            </div>
            <div class="progress-bar-wrapper">
                <div class="progess-bar-label-row">
                    <span>Progress</span>
                    <span class="progress-bar-label-value">
                        65%
                    </span>
                </div>
                <Progress :model-value="65" />
            </div>
        </CardContent>
        <CardFooter>
            <Badge variant="success">{{ project.status }}</Badge>
            <Button as-child variant="outline">
                <RouterLink :to="{ name: 'project', params: { id: project.id } }">Details</RouterLink>
            </Button>
        </CardFooter>
    </Card>
</template>

<style lang="css" scoped>
.card-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: var(--spacing-3);
}

.main-info-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    color: hsl(var(--muted-foreground));
    font-size: var(--text-sm);
}

.main-info-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
}

.progress-bar-wrapper {
    margin-top: var(--spacing-4);
}

.progess-bar-label-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-2);
    font-size: var(--text-sm);
}

.progress-bar-label-value {
    font-weight: var(--font-semibold);
}

.card-header-filler {
    width: 100%;
    height: 160px;
    background: linear-gradient(135deg,
            hsl(var(--primary) / 0.2) 0%,
            hsl(var(--accent) / 0.2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
}
</style>