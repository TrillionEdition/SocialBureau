import * as React from "react"
import { clsx } from "clsx"

const Card = ({ className, ...props }) => (
  <div
    className={clsx(
      "rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm",
      className
    )}
    {...props}
  />
)

const CardHeader = ({ className, ...props }) => (
  <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props} />
)

const CardTitle = ({ className, ...props }) => (
  <h3
    className={clsx("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
)

const CardDescription = ({ className, ...props }) => (
  <p
    className={clsx("text-sm text-zinc-500", className)}
    {...props}
  />
)

const CardContent = ({ className, ...props }) => (
  <div className={clsx("p-6 pt-0", className)} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div className={clsx("flex items-center p-6 pt-0", className)} {...props} />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

