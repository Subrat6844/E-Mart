import { cn } from '@/lib/utils'
import { AppSidebar } from './Sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 w-full overflow-auto">
          <main className={cn('h-full bg-background', className)} {...props}>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

