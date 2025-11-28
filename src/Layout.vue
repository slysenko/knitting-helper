<script setup lang="ts">
// import { RouterView } from 'vue-router';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';

</script>

<template>
    <div class="[--header-height:calc(--spacing(14))]">
        <SidebarProvider class="flex flex-col">
            <AppHeader />
            <div class="flex flex-1">
                <AppSidebar />
                <SidebarInset>
                    <header
                        class="bg-secondary sticky top-(--header-height) z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div class="flex items-center gap-2 px-4">
                            <SidebarTrigger class="-ml-1" />
                            <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem class="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Building Your Application
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator class="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <RouterView />
                </SidebarInset>
            </div>
        </SidebarProvider>
    </div>
</template>
