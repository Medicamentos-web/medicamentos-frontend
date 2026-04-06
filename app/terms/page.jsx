import Link from "next/link";

export const metadata = {
  title: "Términos y condiciones | MediControl",
  description:
    "Condiciones de uso de MediControl: no es asesoramiento médico, uso de la app y limitaciones.",
};

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Términos y condiciones de uso</h1>
        <p className="mt-2 text-xs text-slate-500">Última actualización: abril de 2026</p>

        <section className="mt-6 space-y-4 text-sm text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">1. Naturaleza del servicio</h2>
          <p>
            MediControl es una herramienta de organización y recordatorios para la medicación que tú o
            tu médico hayáis definido. <strong>No sustituye el consejo, diagnóstico o tratamiento médico</strong>.
            Ante urgencias, contacta con servicios de emergencia (p. ej. 112) o con tu médico.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Sin relación médico-paciente</h2>
          <p>
            El uso de la aplicación no crea una relación médico-paciente con MediControl ni con sus
            operadores. Las decisiones sobre medicación son responsabilidad del usuario y, en su caso,
            de profesionales sanitarios.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Exactitud de los datos</h2>
          <p>
            Eres responsable de la exactitud de los datos que introduces (medicamentos, horarios,
            escaneos, etc.). Las funciones de escaneo (OCR) pueden cometer errores; revisa siempre la
            información frente a la etiqueta o prescripción.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Edad y elegibilidad</h2>
          <p>
            La aplicación está dirigida a personas mayores de 16 años (o la edad mínima digital de tu
            país). Si eres menor, el uso debe ser supervisado por un padre, madre o tutor legal.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Suscripciones y pagos</h2>
          <p>
            Los pagos pueden procesarse a través de Stripe según los planes mostrados en la app. Las
            condiciones comerciales concretas (precios, períodos) se muestran en el momento de la
            contratación. Puedes gestionar o cancelar la suscripción según las opciones indicadas en la
            sección de facturación.
          </p>

          <h2 className="text-lg font-bold text-slate-900">6. Limitación de responsabilidad</h2>
          <p>
            En la medida permitida por la ley aplicable, MediControl no se hace responsable de daños
            indirectos o consecuencia de un uso indebido de la app, de interrupciones del servicio o de
            decisiones tomadas únicamente con base en la información de la aplicación sin consultar a un
            profesional sanitario.
          </p>

          <h2 className="text-lg font-bold text-slate-900">7. Uso aceptable</h2>
          <p>
            No debes usar la aplicación para fines ilegales, para suplantar a otra persona o para
            interferir con la seguridad del servicio. Nos reservamos el derecho a restringir el acceso
            ante incumplimientos graves.
          </p>

          <h2 className="text-lg font-bold text-slate-900">8. Legislación aplicable</h2>
          <p>
            Salvo que la ley imperativa de tu país disponga lo contrario, rigen las disposiciones
            aplicables en Suiza y el marco europeo de protección de datos cuando corresponda.
          </p>

          <h2 className="text-lg font-bold text-slate-900">9. Contacto</h2>
          <p>
            Para consultas sobre estos términos:{" "}
            <a href="mailto:support@medicontrol.app" className="text-emerald-600 underline">
              support@medicontrol.app
            </a>
          </p>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6 text-sm">
            <Link href="/privacy" className="text-emerald-600 underline">
              Política de privacidad
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
        </section>
      </div>
    </main>
  );
}
