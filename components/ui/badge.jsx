import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        success: "bg-mint-100 text-mint-700",
        danger: "bg-red-100 text-red-700",
        info: "bg-brand-100 text-brand-700",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
