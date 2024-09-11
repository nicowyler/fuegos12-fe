import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contacto')({
    component: () => <Contacto />
})

export default function Contacto() {
    return (
        <div>contecto</div>
    )
}
