import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
    title: "UI/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "icon"] },
        variant: { control: "select", options: ["primary", "destructive", "outline", "secondary", "ghost", "link"] },
    },
    args: {
        default: false,
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args">Button</Button>',
    }),
    args: { variant: "primary", size: "md" },
};

export const WithIcon: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args"><span>➕</span><span>Add Project</span></Button>',
    }),
    args: { variant: "primary", size: "md" },
};

export const Disabled: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args" disabled>Disabled</Button>',
    }),
};

export const Loading: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args" class="loading">Loading...</Button>',
    }),
};