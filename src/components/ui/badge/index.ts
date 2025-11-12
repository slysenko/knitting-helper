import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Badge } from "./Badge.vue"

export const badgeVariants = cva(
  "badge",
  {
    variants: {
      variant: {
        default: "badge-default",
        primary:
          "badge-primary",
        secondary:
          "badge-secondary",
        destructive:
         "badge-destructive",
        success: "badge-success",
        warning: "badge-warning",
        outline:
          "badge-outline",
      },
      size: {
        "sm": "badge-sm",
        "lg": "badge-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
