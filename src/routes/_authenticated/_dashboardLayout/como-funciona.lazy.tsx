import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/_dashboardLayout/como-funciona')({
  component: () => <div>Hello /_authenticated/_dashboardLayout/faq!</div>
})