import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
