import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
    component: () => <Terms />
})

function Terms() {
    return (
        <div className="bg-gray-100 text-gray-800 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-4 text-gray-900">Términos de Servicio</h1>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">1. Introducción</h2>
                <p className="mb-4">
                    Bienvenido a <strong>Fuegos 12 de Julio</strong>. Estos Términos de Servicio regulan el uso de nuestra plataforma y todos los servicios relacionados. Al utilizar nuestros servicios, aceptas estos términos en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestros servicios.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">2. Elegibilidad</h2>
                <p className="mb-4">
                    Para utilizar nuestra plataforma, debes tener al menos 18 años y contar con la capacidad legal para contratar y utilizar servicios bajo la legislación aplicable.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">3. Descripción del Servicio</h2>
                <p className="mb-4">
                    Proveemos una plataforma en línea para la compra de carbón y productos relacionados. Los productos ofrecidos en la plataforma están sujetos a disponibilidad y pueden ser modificados sin previo aviso.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">4. Registro de Usuario</h2>
                <p className="mb-4">
                    Para acceder a ciertas funciones, debes crear una cuenta proporcionando información precisa y completa. Es tu responsabilidad mantener la confidencialidad de tu cuenta y contraseña.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">5. Precios y Pagos</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Los precios de los productos y servicios se encuentran indicados en la plataforma.</li>
                    <li>Nos reservamos el derecho de modificar los precios sin previo aviso.</li>
                    <li>Todos los pagos se realizarán a través de métodos electrónicos y seguros.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">6. Devoluciones y Reembolsos</h2>
                <p className="mb-4">
                    Aceptamos devoluciones y emitimos reembolsos conforme a nuestra política de devoluciones. Los reembolsos se procesarán dentro de un plazo de 7 días hábiles tras la recepción de la solicitud.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">7. Uso Aceptable</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>No debes utilizar la plataforma para realizar actividades ilícitas o violar derechos de terceros.</li>
                    <li>No debes intentar acceder sin autorización a nuestros sistemas ni dañar nuestra infraestructura técnica.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">8. Modificaciones a los Términos</h2>
                <p className="mb-4">
                    Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Te notificaremos de cualquier cambio significativo y se te pedirá que los aceptes nuevamente si así fuera necesario.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">9. Limitación de Responsabilidad</h2>
                <p className="mb-4">
                    No seremos responsables por daños indirectos, incidentales, o consecuentes derivados del uso de la plataforma o de los productos adquiridos a través de la misma.
                </p>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">10. Contacto</h2>
                <p className="mb-4">
                    Si tienes preguntas o comentarios sobre estos términos, puedes contactarnos en <a className='text-blue-500' href='mailto:info@fuegos12dejulio.com'>info@fuegos12dejulio.com</a>.
                </p>

                <p className="text-sm text-gray-600">Última actualización:</p>
                <p className="text-sm text-gray-600">23 de Septiembre de 2024</p>
            </div>
        </div>

    )
}