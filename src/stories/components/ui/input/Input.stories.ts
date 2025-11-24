import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
    title: "UI/Input",
    component: Input,
    tags: ["autodocs"],
    // argTypes: {
    //     type: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "icon"] },
    //     variant: { control: "select", options: ["primary", "destructive", "outline", "secondary", "ghost", "link"] },
    // },
    // args: {
    //     default: false,
    // },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { Input },
        setup() {
            return { args };
        },
        template: '<Input type="text" placeholder="Enter project name"/>',
    }),
};

export const Success: Story = {
    render: () => ({
        components: { Input },
        setup() {
            return { name: "craftlover123" };
        },
        template: '<Input type="text" :class="{ success: true }" v-model="name"/>',
    }),
};

export const Disabled: Story = {
    render: () => ({
        components: { Input },
        setup() {
            return { name: "PRJ-12345" };
        },
        template: '<Input type="text" v-model="name" disabled />',
    }),
};