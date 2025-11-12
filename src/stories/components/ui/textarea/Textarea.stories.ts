import { Textarea } from "@/components/ui/textarea";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
    title: "UI/Textarea",
    component: Textarea,
    tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { Textarea },
        setup() {
            return { args };
        },
        template: '<Textarea placeholder="Enter project name"/>',
    }),
};