import { Select } from "@/components/ui/select";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
    title: "UI/Select",
    component: Select,
    tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { Select },
        setup() {
            return { args };
        },
        template: '<Select type="text" placeholder="Enter project name"/>',
    }),
};
