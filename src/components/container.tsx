import { cn } from '@/lib/utils'

export default function Container({
  className,
  children,
}: Readonly<{
  className?: string | undefined
  children: React.ReactNode
}>) {
  return (
    <div className={cn('container mx-auto px-5', className)}>{children}</div>
  )
}
