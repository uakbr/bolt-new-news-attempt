"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/components/ui/use-mobile"

const SidebarContext = React.createContext({
  expanded: true,
  setExpanded: (expanded: boolean) => {},
  collapsible: null as null | "icon" | "hide",
  setCollapsible: (collapsible: "icon" | "hide" | null) => {},
})

export function SidebarProvider({
  children,
  defaultExpanded = true,
  defaultCollapsible = null,
}: {
  children: React.ReactNode
  defaultExpanded?: boolean
  defaultCollapsible?: "icon" | "hide" | null
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const [collapsible, setCollapsible] = React.useState(defaultCollapsible)

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        setExpanded,
        collapsible,
        setCollapsible,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    collapsible?: "icon" | "hide" | null
  }
>(({ className, collapsible, ...props }, ref) => {
  const { setCollapsible } = useSidebar()

  React.useEffect(() => {
    if (collapsible) {
      setCollapsible(collapsible)
    }
  }, [collapsible, setCollapsible])

  return (
    <div
      ref={ref}
      data-collapsible={collapsible}
      className={cn(
        "group/sidebar-wrapper relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-sidebar border-r border-border",
        className,
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { expanded, setExpanded, collapsible } = useSidebar()
    const isMobile = useIsMobile()

    if (!collapsible) return null

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
          className,
        )}
        onClick={() => setExpanded(!expanded)}
        {...props}
      >
        {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        <span className="sr-only">Toggle Sidebar</span>
      </button>
    )
  },
)
SidebarTrigger.displayName = "SidebarTrigger"

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-14 items-center border-b border-border px-4 group-data-[collapsible=icon]:h-14",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 overflow-auto py-2", className)} {...props} />
  },
)
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex items-center border-t border-border p-4", className)} {...props} />
  },
)
SidebarFooter.displayName = "SidebarFooter"

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("px-2 py-2", className)} {...props} />
  },
)
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-2 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:text-center",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("grid gap-1", className)} {...props} />
  },
)
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("relative", className)} {...props} />
  },
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "group relative flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-sidebar-foreground",
        ghost: "hover:bg-sidebar-accent/50",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "ghost"
  size?: "default" | "sm" | "lg"
  tooltip?: string
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, variant, size, tooltip, ...props }, ref) => {
    const { expanded, collapsible } = useSidebar()
    const showTooltip = tooltip && collapsible === "icon" && !expanded

    return (
      <button
        ref={ref}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        data-tooltip={showTooltip ? tooltip : undefined}
        {...props}
      />
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    showOnHover?: boolean
  }
>(({ className, showOnHover, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        showOnHover && "opacity-0 group-hover:opacity-100",
        className,
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

export const SidebarMenuSub = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "ml-4 grid gap-1 pl-4 before:absolute before:left-3.5 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuSub.displayName = "SidebarMenuSub"

export const SidebarMenuSubItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("relative", className)} {...props} />
  },
)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  return (
    <Comp
      ref={ref}
      className={cn(
        "relative flex w-full items-center rounded-md px-3 py-1.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { expanded, collapsible } = useSidebar()

    if (collapsible !== "icon") return null

    return (
      <div
        ref={ref}
        data-state={expanded ? "expanded" : "collapsed"}
        className={cn(
          "absolute inset-y-0 right-0 w-px bg-border opacity-0 transition-opacity duration-300 ease-in-out data-[state=collapsed]:opacity-100",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarRail.displayName = "SidebarRail"

export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { expanded, collapsible } = useSidebar()
    const isMobile = useIsMobile()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col transition-[margin] duration-300 ease-in-out",
          collapsible === "icon" &&
            !isMobile &&
            (expanded ? "lg:ml-[--sidebar-width]" : "lg:ml-[--sidebar-icon-width]"),
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarInset.displayName = "SidebarInset"

