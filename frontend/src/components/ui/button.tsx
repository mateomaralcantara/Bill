// components/ui/button.tsx
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantClass =
      variant === "outline"
        ? "bg-transparent border-2 border-sky-400 text-sky-200 hover:bg-sky-800"
        : "bg-sky-700 text-white hover:bg-sky-500";

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center px-4 py-2 font-semibold rounded-2xl transition ${variantClass} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
