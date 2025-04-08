import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-blue-marine text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        {description && <p className="text-xl text-white/80 max-w-3xl">{description}</p>}
        {children}
      </div>
    </div>
  )
}

