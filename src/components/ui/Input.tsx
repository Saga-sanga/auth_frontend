import * as React from "react"

import { cn } from "../../lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md  border-gray-300 bg-transparent px-3 py-2 text-sm  file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 border-2 focus-visible:border-2 focus-visible:outline-none text-start focus-visible:border-gray-400 focus-visible:ring-black focus-within:ring-black",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
