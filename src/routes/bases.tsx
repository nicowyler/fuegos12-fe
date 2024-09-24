import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bases')({
  component: () => <Bases />
})

function Bases() {
  return (
    <div className="bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Bases y Condiciones de Uso</h1>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">1. Introducción</h2>
        <p className="mb-4">Bienvenido a <strong>Fuegos 12 de Julio</strong>, una plataforma dedicada a la venta de carbón y productos relacionados. Al utilizar nuestra aplicación o realizar una compra, aceptas los términos y condiciones descritos a continuación.</p>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">2. Aceptación de Términos</h2>
        <p className="mb-4">Al acceder y utilizar esta aplicación, aceptas cumplir con estas bases y condiciones, así como con las leyes locales aplicables.</p>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">3. Uso de la Aplicación</h2>
        <ul className="list-disc list-inside mb-4">
          <li>El usuario debe ser mayor de edad y contar con la capacidad legal para realizar transacciones.</li>
          <li>El uso de la app es exclusivo para la compra de productos relacionados con el carbón.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">4. Productos</h2>
        <p className="mb-4">Los productos disponibles en la aplicación están sujetos a disponibilidad. Nos reservamos el derecho de modificar o descontinuar cualquier producto en cualquier momento sin previo aviso.</p>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">5. Pagos y Facturación</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Todos los pagos se realizan a través de métodos seguros y electrónicos.</li>
          <li>Las facturas se emiten automáticamente tras la confirmación del pago.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">6. Devoluciones y Reembolsos</h2>
        <p className="mb-4">Las devoluciones solo se aceptarán bajo las condiciones estipuladas por la ley vigente, y los reembolsos se procesarán en un plazo de 7 días hábiles tras la validación de la solicitud.</p>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">7. Modificaciones de Términos</h2>
        <p className="mb-4">Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en la aplicación.</p>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">8. Contacto</h2>
        <p className="mb-4">Para cualquier consulta o duda sobre estos términos, puedes ponerte en contacto con nuestro equipo de soporte a través de <a className='text-blue-500' href='mailto:info@fuegos12dejulio.com'>info@fuegos12dejulio.com</a>.</p>

        <p className="text-sm text-gray-600">Última actualización:</p>
        <p className="text-sm text-gray-600">23 de Septiembre de 2024</p>
      </div>
    </div>
  )
}