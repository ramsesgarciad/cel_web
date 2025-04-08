import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function ContactoPage() {
  return (
    <div>
      <PageHeader
        title="Contacto"
        description="Estamos aquí para ayudarte. Contáctanos y descubre cómo podemos colaborar en tu próximo proyecto."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">
                Cuéntanos tu idea. Nosotros hacemos el resto.
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Si tienes un proyecto entre manos y no sabes cómo desarrollarlo, nosotros te ayudamos. Rellena el
                formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nombre
                        </label>
                        <input id="name" type="text" className="w-full p-2 border rounded-md" placeholder="Tu nombre" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 border rounded-md"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Empresa
                      </label>
                      <input
                        id="company"
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="project" className="text-sm font-medium">
                        Tipo de Proyecto
                      </label>
                      <select id="project" className="w-full p-2 border rounded-md">
                        <option value="">Selecciona una opción</option>
                        <option value="pcb">Diseño de PCB</option>
                        <option value="firmware">Programación de Microcontroladores</option>
                        <option value="prototype">Prototipado Electrónico</option>
                        <option value="iot">Desarrollo IoT</option>
                        <option value="manufacturing">Fabricación</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        className="w-full p-2 border rounded-md"
                        rows={4}
                        placeholder="Cuéntanos sobre tu proyecto o idea"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-blue-light">
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-marine">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-muted-foreground">+1 (809) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">info@caribbeanembeddedlabs.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Dirección</h4>
                      <p className="text-muted-foreground">
                        Calle Principal #123, Zona Tecnológica
                        <br />
                        Santo Domingo, República Dominicana
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Horario</h4>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 AM - 6:00 PM
                        <br />
                        Sábado: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-marine">Ubicación</h3>
                <div className="aspect-video rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711154905!2d-69.98961235!3d18.48602125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89f1107ea5ab%3A0xd6c587b82715c164!2sSanto%20Domingo%2C%20Dominican%20Republic!5e0!3m2!1sen!2sus!4v1649697977305!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-marine">Síguenos</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Preguntas Frecuentes</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros servicios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-bold mb-2 text-blue-marine">
                ¿Cuánto tiempo tarda el desarrollo de un proyecto?
              </h3>
              <p className="text-muted-foreground">
                El tiempo de desarrollo varía según la complejidad del proyecto. Un prototipo simple puede estar listo
                en 2-4 semanas, mientras que proyectos más complejos pueden llevar varios meses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-bold mb-2 text-blue-marine">
                ¿Ofrecen servicios de mantenimiento post-proyecto?
              </h3>
              <p className="text-muted-foreground">
                Sí, ofrecemos servicios de mantenimiento y soporte técnico para todos nuestros proyectos, asegurando que
                tu solución funcione correctamente a largo plazo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-bold mb-2 text-blue-marine">¿Trabajan con clientes internacionales?</h3>
              <p className="text-muted-foreground">
                Sí, trabajamos con clientes de todo el mundo. Utilizamos herramientas de comunicación digital para
                mantener una colaboración fluida independientemente de la ubicación.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-bold mb-2 text-blue-marine">¿Cómo protegen la propiedad intelectual?</h3>
              <p className="text-muted-foreground">
                Firmamos acuerdos de confidencialidad (NDA) con todos nuestros clientes para proteger su propiedad
                intelectual y garantizar la confidencialidad de sus proyectos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

