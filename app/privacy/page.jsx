import Link from "next/link";

export const metadata = {
  title: "Privacidad y datos | MediControl",
  description:
    "Política de privacidad de MediControl: datos de salud, tratamiento, terceros, derechos y eliminación de cuenta (RGPD / Google Play).",
};

function Section({ title, children }) {
  return (
    <section className="mt-6 space-y-2 text-sm text-slate-700">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Política de privacidad</h1>
        <p className="mt-2 text-xs text-slate-500">Versión: 1 de abril de 2026</p>
        <p className="mt-3 text-sm text-slate-600">
          Esta política describe cómo MediControl trata datos personales y datos relativos a la salud en
          la aplicación web/PWA y servicios asociados. Cumple los requisitos habituales de transparencia
          (RGPD) y facilita completar la declaración de <strong>Seguridad de datos</strong> en Google Play
          y otras tiendas.
        </p>

        <nav className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-emerald-700">
          <a href="#es" className="rounded-lg bg-emerald-50 px-2 py-1 hover:bg-emerald-100">
            Español
          </a>
          <a href="#de" className="rounded-lg bg-slate-100 px-2 py-1 hover:bg-slate-200">
            Deutsch
          </a>
          <a href="#en" className="rounded-lg bg-slate-100 px-2 py-1 hover:bg-slate-200">
            English
          </a>
        </nav>

        {/* ── ES ── */}
        <article id="es" lang="es" className="mt-8 border-t border-slate-100 pt-8">
          <h2 className="text-xl font-extrabold text-slate-900">Español</h2>

          <Section title="1. Responsable del tratamiento">
            <p>
              Responsable: MediControl (Suiza). Contacto para privacidad y ejercicio de derechos:{" "}
              <a href="mailto:support@medicontrol.app" className="text-emerald-600 underline">
                support@medicontrol.app
              </a>
              .
            </p>
          </Section>

          <Section title="2. Finalidades del tratamiento">
            <ul className="list-inside list-disc space-y-1">
              <li>Prestar la función de gestión de medicación, recordatorios y stock.</li>
              <li>Autenticación de usuarios y seguridad del servicio.</li>
              <li>Procesar suscripciones y pagos (mediante proveedor de pagos).</li>
              <li>Mejora del servicio, soporte y comunicaciones relacionadas con la cuenta.</li>
              <li>
                Medición de campañas publicitarias solo si has aceptado cookies de marketing (Google
                Ads / etiquetas asociadas).
              </li>
            </ul>
          </Section>

          <Section title="3. Categorías de datos (alineado con tiendas de aplicaciones)">
            <p className="font-medium text-slate-800">Datos personales e identificación</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Nombre, correo electrónico, identificadores de cuenta y familia, idioma preferido.</li>
              <li>
                Datos de autenticación (contraseña u otros métodos); las contraseñas se almacenan de
                forma segura (p. ej. hash), no en texto plano.
              </li>
            </ul>
            <p className="mt-3 font-medium text-slate-800">Datos de salud y bienestar</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Medicamentos, dosis, horarios, confirmación de tomas, alertas de stock, datos de médico
                de cabecera si los introduces, presión arterial si usas esa función.
              </li>
              <li>
                Fecha de nacimiento u otros datos solo cuando son necesarios para validar la identidad
                del paciente (p. ej. tras escaneo).
              </li>
            </ul>
            <p className="mt-3 font-medium text-slate-800">Fotos e imágenes</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Imágenes que subes para escaneo OCR de etiquetas o recetas; se procesan para extraer
                texto y datos de medicación. No usamos tus fotos con fines publicitarios.
              </li>
            </ul>
            <p className="mt-3 font-medium text-slate-800">Actividad y técnicos</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Registros técnicos necesarios para seguridad (p. ej. logs de acceso, errores), dirección
                IP en medida necesaria para proteger el servicio.
              </li>
              <li>
                Notificaciones push: identificadores de dispositivo/suscripción gestionados por el
                sistema o proveedor de notificaciones del navegador/plataforma.
              </li>
            </ul>
            <p className="mt-3 font-medium text-slate-800">Pagos</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                Los datos de pago (tarjeta, etc.) los trata <strong>Stripe</strong> u otro procesador
                indicado en el flujo de pago; MediControl no almacena el número completo de tarjeta.
              </li>
            </ul>
          </Section>

          <Section title="4. Base legal (RGPD)">
            <ul className="list-inside list-disc space-y-1">
              <li>Ejecución del contrato / condiciones de uso del servicio.</li>
              <li>Interés legítimo en seguridad, prevención de abusos y mejora del servicio.</li>
              <li>
                Datos de salud: consentimiento explícito al usar funciones que los tratan, o necesidad
                para la prestación solicitada.
              </li>
              <li>Obligaciones legales cuando resulten aplicables.</li>
              <li>Consentimiento para cookies no esenciales y mediciones de marketing.</li>
            </ul>
          </Section>

          <Section title="5. Destinatarios y encargados del tratamiento">
            <p>
              Solo cedemos datos a proveedores que necesitamos para operar el servicio, con contratos o
              garantías adecuadas (alojamiento en la UE o país con decisión de adecuación / cláusulas
              tipo):
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Proveedor de alojamiento / infraestructura (servidores y base de datos).</li>
              <li>Stripe (pagos).</li>
              <li>Proveedor de correo para notificaciones transaccionales.</li>
              <li>Google (solo si activas marketing: mediciones relacionadas con Google Ads).</li>
            </ul>
          </Section>

          <Section title="6. Conservación">
            <p>
              Conservamos los datos mientras mantengas la cuenta activa y el tiempo necesario para
              obligaciones legales, reclamaciones o seguridad. Tras solicitar la eliminación de la
              cuenta, borraremos o anonimizaremos los datos personales en un plazo razonable (salvo
              conservación legal).
            </p>
          </Section>

          <Section title="7. Seguridad">
            <p>
              Utilizamos conexiones cifradas (HTTPS/TLS), controles de acceso y buenas prácticas para
              proteger la información. Ningún sistema es 100 % invulnerable; si detectamos un incidente
              grave que te afecte, te informaremos cuando la ley lo exija.
            </p>
          </Section>

          <Section title="8. Derechos">
            <p>
              Puedes solicitar acceso, rectificación, supresión, limitación, portabilidad y oposición
              cuando corresponda, así como retirar el consentimiento para tratamientos basados en él.
              Contacto:{" "}
              <a href="mailto:support@medicontrol.app" className="text-emerald-600 underline">
                support@medicontrol.app
              </a>
              . También puedes reclamar ante una autoridad de protección de datos.
            </p>
          </Section>

          <Section title="9. Menores">
            <p>
              El servicio no está dirigido a menores de 16 años como usuarios autónomos. Si tienes
              edad inferior, el uso debe ser con supervisión de un adulto responsable.
            </p>
          </Section>

          <Section title="10. Eliminación de cuenta (requisito Google Play)">
            <p>
              Puedes solicitar la eliminación de tu cuenta y datos en:{" "}
              <Link href="/delete-account" className="text-emerald-600 underline">
                Eliminar cuenta
              </Link>
              . La eliminación no exime de obligaciones legales previas (p. ej. facturación ya
              emitida).
            </p>
          </Section>

          <Section title="11. Cambios">
            <p>
              Podemos actualizar esta política; publicaremos la nueva versión en esta URL con la fecha
              de actualización. El uso continuado del servicio tras cambios relevantes implica que has
              tomado conocimiento.
            </p>
          </Section>
        </article>

        {/* ── DE ── */}
        <article id="de" lang="de" className="mt-10 border-t border-slate-100 pt-10">
          <h2 className="text-xl font-extrabold text-slate-900">Deutsch (Kurzfassung)</h2>
          <p className="text-sm text-slate-700">
            Verantwortlicher: MediControl (Schweiz), Kontakt:{" "}
            <a href="mailto:support@medicontrol.app" className="text-emerald-600 underline">
              support@medicontrol.app
            </a>
            . Es werden u. a. Kontodaten, Gesundheitsdaten (Medikation, Einnahmezeiten, optional
            Blutdruck), Bilder für OCR, technische Logs und Zahlungsdaten über Stripe verarbeitet.
            Zwecke: Bereitstellung der App, Sicherheit, Abrechnung, Support; Marketing-Messung nur mit
            Einwilligung (z. B. Google Ads). Rechtsgrundlagen: Vertrag, berechtigtes Interesse,
            Einwilligung für besondere Daten und Cookies. Daten können in der EU/EEA oder mit
            geeigneten Garantien verarbeitet werden. Sie haben Auskunfts-, Berichtigungs-,
            Löschungs- und weitere Rechte. Kontolöschung:{" "}
            <Link href="/delete-account" className="text-emerald-600 underline">
              Konto löschen
            </Link>
            . Details entsprechen der spanischen Fassung oben.
          </p>
        </article>

        {/* ── EN ── */}
        <article id="en" lang="en" className="mt-10 border-t border-slate-100 pt-10">
          <h2 className="text-xl font-extrabold text-slate-900">English (summary)</h2>
          <p className="text-sm text-slate-700">
            <strong>Controller:</strong> MediControl (Switzerland). Contact:{" "}
            <a href="mailto:support@medicontrol.app" className="text-emerald-600 underline">
              support@medicontrol.app
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-slate-700">
            <strong>Data collected</strong> includes account identifiers (name, email, family
            context), health-related data you enter (medications, schedules, adherence, optional blood
            pressure, doctor details), images you upload for OCR scanning, technical logs, and payment
            data processed by <strong>Stripe</strong> (we do not store full card numbers).{" "}
            <strong>Purposes:</strong> provide the service, security, billing, support;{" "}
            <strong>marketing measurement</strong> (e.g. Google Ads tags) only if you consent via the
            cookie banner.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            <strong>Legal bases (GDPR):</strong> contract, legitimate interests (security), explicit
            consent where required for health data and optional cookies. <strong>Retention:</strong> as
            long as your account is active, then deleted or anonymised within a reasonable period after a
            deletion request, subject to legal obligations. <strong>Rights:</strong> access, rectification,
            erasure, restriction, portability, objection — contact us at the email above.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            <strong>Account deletion:</strong>{" "}
            <Link href="/delete-account" className="text-emerald-600 underline">
              Delete account
            </Link>
            . <strong>Children:</strong> not directed at children under 16 without parental supervision.
          </p>
        </article>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-100 pt-6 text-sm">
          <Link href="/terms" className="text-emerald-600 underline">
            Términos y condiciones
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/cookies" className="text-emerald-600 underline">
            Cookies
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/delete-account" className="text-emerald-600 underline">
            Eliminar cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
