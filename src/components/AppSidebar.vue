<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar'
</script>

<template>
    <Sidebar collapsible="icon" class="sidebar">
        <SidebarHeader class="sidebar-logo">
            🧶 Knit & Crochet
        </SidebarHeader>
        <SidebarContent>

        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
</template>

<style lang="css" scoped>
.sidebar {
    background: hsl(var(--card));
    border-right: 1px solid hsl(var(--border));
    padding: var(--spacing-xl) var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.sidebar-logo {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--primary));
    margin-bottom: var(--spacing-md);
}
</style>