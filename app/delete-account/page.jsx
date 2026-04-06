import Link from "next/link";

export const metadata = {
  title: "Eliminar cuenta | MediControl",
  description: "Solicita la eliminación de tu cuenta y datos en MediControl.",
};

const SUPPORT_EMAIL = "support@medicontrol.app";

export default function DeleteAccountPage() {
  const subject = encodeURIComponent("Solicitud de eliminación de cuenta");
  const body = encodeURIComponent(
    "Hola,\n\nSolicito la eliminación de mi cuenta y todos mis datos asociados en MediControl.\n\nEmail de la cuenta: [indica tu email]\n\nGracias."
  );
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Eliminar cuenta</h1>
        <p className="mt-3 text-sm text-slate-600">
          Puedes solicitar la eliminación de tu cuenta y todos tus datos en cualquier momento.
        </p>

        <section className="mt-6 space-y-4 text-sm text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">Cómo solicitar la eliminación</h2>
          <p>
            Envíanos un email indicando que deseas eliminar tu cuenta. Procesaremos tu solicitud en
            un plazo máximo de 30 días y eliminaremos todos tus datos personales.
          </p>

          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Solicitar eliminación por email
          </a>

          <h2 className="text-lg font-bold text-slate-900">Cancelar suscripción</h2>
          <p>
            Si tienes una suscripción activa, puedes cancelarla en cualquier momento desde la
            página de facturación. La cancelación de la suscripción no elimina tu cuenta; para
            eliminar todos tus datos, usa el enlace anterior.
          </p>

          <a
            href="/billing"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
          >
            Ir a Facturación
          </a>

          <h2 className="text-lg font-bold text-slate-900">Datos que se eliminan</h2>
          <p>
            Al eliminar tu cuenta se borrarán: datos de perfil, medicamentos, horarios, historial de
            tomas, alertas y cualquier otro dato asociado a tu cuenta.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
          <Link href="/privacy" className="text-emerald-600 underline">
            Política de privacidad
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/terms" className="text-emerald-600 underline">
            Términos y condiciones
          </Link>
        </div>
      </div>
    </main>
  );
}
