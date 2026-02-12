import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200",
        className
      )}
      {...props}
    />
  );
});

const AvatarImage = React.forwardRef(function AvatarImage(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});

const AvatarFallback = React.forwardRef(function AvatarFallback(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600",
        className
      )}
      {...props}
    />
  );
});

export { Avatar, AvatarImage, AvatarFallback };
