import * as React from "react"
import { clsx } from "clsx"

const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const variants = {
    default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90",
    destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90",
    outline: "border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-900",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80",
    ghost: "hover:bg-zinc-100 hover:text-zinc-900",
    link: "text-zinc-900 underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}

export { Button }

