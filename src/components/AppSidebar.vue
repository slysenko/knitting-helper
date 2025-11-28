<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import type { SidebarProps } from "@/components/ui/sidebar";

import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    FolderOpenDot,
    PencilRuler,
    PieChart,
    Send,
    Settings2,
    Spool,
    SquareTerminal,
} from "lucide-vue-next"

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: "icon",
});
</script>

<template>
    <Sidebar class="top-(--header-height) h-[calc(100svh-var(--header-height))]!" v-bind="props">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <a href="#">
                            <div
                                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Command class="size-4" />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-medium">Acme Inc</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton as-child>
                                <RouterLink :to="{ name: 'projects' }" >
                                    <PencilRuler />
                                    <span>Projects</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton as-child>
                                <RouterLink :to="{ name: 'materials' }" >
                                    <Spool />
                                    <span>Materials</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
</template>
