<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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
    PieChart,
    Send,
    Settings2,
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
                                <span class="truncate text-xs">Enterprise</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            Some content
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
</template>
