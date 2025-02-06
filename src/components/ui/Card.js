import React from "react";
import { cn } from "../../lib/utils"; // Correct path if `card.js` is inside `src/components/ui/`


export function Card({ className, ...props }) {
  return <div className={cn("rounded-lg border bg-white shadow-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />;
}
