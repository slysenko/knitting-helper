import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        primary:
          "btn-primary",
        secondary:
          "btn-secondary",
        destructive:
          "btn-destructive",
        outline:
          "btn-outline",
        ghost:
          "btn-ghost",
        link: "btn-link",
      },
      size: {
        "xs": "btn-xs",
        "sm": "btn-sm",
        "md": "btn-md",
        "lg": "btn-lg",
        "xl": "btn-xl",
        "icon": "btn-icon",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
