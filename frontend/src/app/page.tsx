"use client";
import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


// Tarjeta cuadrada, ultra visual, bien separada del resto
const FeatureCard = memo(function FeatureCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-2xl hover:shadow-[0_8px_36px_0_rgba(52,64,128,0.12)] transition-all duration-300 px-10 py-10 min-h-[215px] h-full"
    >
      <span className="text-[2.8rem] md:text-[3.4rem] mb-2">{emoji}</span>
      <h3 className="font-bold text-lg md:text-xl text-blue-700 mb-2 text-center">{title}</h3>
      <p className="text-base text-gray-700 text-center leading-relaxed">{desc}</p>
    </motion.div>
  );
});

const services = [
  {
    emoji: "📈",
    title: "Declaración de ISR",
    desc: "Preparamos y presentamos tu declaración anual con precisión y optimización máxima.",
  },
  {
    emoji: "🧾",
    title: "Gestión de ITBIS",
    desc: "Controlamos tu ITBIS mensual y recuperamos tus créditos fiscales sin dolor.",
  },
  {
    emoji: "💸",
    title: "Gastos Deducibles",
    desc: "Maximizamos tus deducciones legales para que pagues solo lo justo.",
  },
  {
    emoji: "📝",
    title: "Registros Contables y Fiscales",
    desc: "Organizamos y mantenemos tus registros contables y fiscales al día, esenciales para auditorías y cumplimiento.",
  },
  {
    emoji: "📊",
    title: "Planificación Fiscal Estratégica",
    desc: "Estrategias fiscales personalizadas para minimizar riesgos y maximizar beneficios.",
  },
  {
    emoji: "🏛️",
    title: "Trámites ante la DGII",
    desc: "Representación y gestión de trámites ante la Dirección General de Impuestos Internos.",
  },
  {
    emoji: "🤝",
    title: "Asesoría Personalizada",
    desc: "Soluciones a tu medida con claridad, transparencia y apoyo constante.",
  },
];

const faqs = [
  {
    q: "¿Qué es el ITBIS y cómo me afecta?",
    a: "El ITBIS es el Impuesto a la Transferencia de Bienes Industrializados y Servicios en República Dominicana. Si vendes bienes o servicios gravados, debes declararlo y pagarlo mensualmente.",
  },
  {
    q: "¿Quiénes deben pagar Impuesto Sobre la Renta (ISR)?",
    a: "Todas las personas físicas y jurídicas que generan ingresos en el país, según los topes definidos por la DGII.",
  },
  {
    q: "¿Qué tipo de gastos son deducibles de impuestos?",
    a: "Gastos necesarios y pertinentes para tu actividad económica, respaldados por factura válida, como servicios profesionales, alquiler, suministros, etc.",
  },
  {
    q: "¿Cómo puedo registrarme como contribuyente ante la DGII?",
    a: "Te guiamos paso a paso para registrarte formalmente ante la DGII y obtener tu RNC.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen text-gray-900 font-sans bg-gradient-to-br from-[#f4f6fa] via-white to-[#eef2fb] overflow-x-hidden">
      {/* BANNER IMAGEN FULL WIDTH */}
      <div className="w-full relative aspect-[3/1] min-h-[200px] max-h-[400px]">
        <Image
          src="/images/dgii.jpg"
          alt="Imagen DGII principal"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center max-w-5xl mx-auto pt-16 pb-10 px-4 md:flex-row md:items-center md:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="mx-auto mb-10 md:mb-0 flex-shrink-0 flex items-center justify-center w-full md:w-1/3"
        >
          <div className="relative w-64 h-64 md:w-full md:max-w-[340px] md:h-[340px] aspect-square shadow-2xl rounded-3xl overflow-hidden border-8 border-white bg-gray-100">
            <Image
              src="/images/dgii.jpg"
              alt="Logo DGII destacado"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 90vw, 33vw"
            />
          </div>
        </motion.div>
        <div className="flex-1 flex flex-col items-center md:items-start md:text-left">
          <motion.h1
            initial={{ opacity: 0, scale: 0.85, y: -18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 text-[#363676] drop-shadow-[0_4px_12px_rgba(109,109,220,0.10)]"
          >
            Tu Tranquilidad Fiscal,<br />
            <span className="text-[#5a5ac9]">Nuestra Misión.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-7 mt-1 max-w-xl text-lg md:text-2xl font-medium leading-relaxed text-[#676787]"
          >
            Asesoría profesional para individuos y empresas.<br />
            Optimiza tus impuestos y accede a una experiencia 100% digital.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            <Link href="/agendar" className="group">
              <button className="relative overflow-hidden rounded-2xl px-9 py-4 text-lg font-semibold shadow-lg border-2 border-[#605cf7] bg-[#eaeafe] hover:bg-[#deddfd] text-[#373789] transition">
                Agenda Consulta Gratis
              </button>
            </Link>
            <Link href="/chat" className="group">
              <button className="relative overflow-hidden rounded-2xl border-2 border-[#7fd4f9] px-9 py-4 text-lg font-semibold text-[#2475a5] shadow-lg transition hover:bg-[#eaf6fc] bg-white">
                Pregunta a un Asesor Fiscal
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS (Grid 3x3, tarjetas separadas y visualmente limpias) */}
      <section className="max-w-5xl mx-auto mt-16 mb-20 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map(({ emoji, title, desc }) => (
            <FeatureCard key={title} emoji={emoji} title={title} desc={desc} />
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="max-w-4xl mx-auto mb-20 px-2 fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#4f52c4]">ImpuestosRD: Tu Socio en Cumplimiento Fiscal.</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base md:text-lg text-[#44485d]">
          <li>✅ <strong>Expertos en Normativa Dominicana:</strong> Conocimiento profundo de las leyes y regulaciones fiscales de la RD.</li>
          <li>🤝 <strong>Asesoría Personalizada:</strong> Soluciones fiscales adaptadas a tus necesidades específicas, ya seas individuo o empresa.</li>
          <li>🗣️ <strong>Comunicación Clara y Directa:</strong> Explicamos conceptos fiscales complejos de manera sencilla para tu comprensión.</li>
          <li>🔒 <strong>Confidencialidad y Seguridad:</strong> Manejamos tu información con la máxima discreción y seguridad.</li>
          <li>💡 <strong>Optimización Fiscal:</strong> Te ayudamos a aprovechar todas las oportunidades legales para reducir tu carga fiscal.</li>
          <li>⏱️ <strong>Eficiencia y Puntualidad:</strong> Aseguramos que tus declaraciones y trámites se realicen a tiempo, evitando multas.</li>
        </ul>
      </section>

      {/* TESTIMONIOS */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold mb-7 text-[#363676]">Historias de Éxito: Contribuyentes Tranquilos.</h2>
        <motion.blockquote
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="italic text-lg md:text-2xl max-w-3xl mx-auto text-[#6d6da0] bg-[#fff] rounded-xl shadow p-7"
        >
          “Gracias a ImpuestosRD, mi negocio ahora cumple con todas las normativas fiscales. Me ahorraron tiempo y preocupaciones, ¡totalmente recomendados!”
        </motion.blockquote>
        <div className="mt-6 text-right font-semibold max-w-3xl mx-auto text-[#454587]">— Juan P., Santo Domingo</div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 mb-20 fadeIn">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#5657b2]">¿Tienes Preguntas Fiscales? Tenemos las Respuestas.</h3>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group border border-gray-200 rounded-xl p-4 cursor-pointer bg-white shadow transition-all duration-300">
              <summary className="font-semibold list-none focus:outline-none group-open:text-[#373789] flex items-center gap-2 text-lg">
                <span className="inline-block text-2xl text-[#605cf7]">+</span>
                {f.q}
              </summary>
              <p className="mt-2 leading-relaxed text-[#646690]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/chat"
            className="inline-block rounded-2xl px-14 py-4 font-semibold text-lg shadow-lg border-2 border-[#7fd4f9] bg-[#eaf6fc] text-[#2475a5] hover:bg-white transition"
          >
            Chatea con nuestra IA Fiscal para resolver tus dudas
          </Link>
        </div>
      </section>

      {/* CTA: Agendar Consulta */}
      <section className="mb-14 fadeIn text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#5657b2]">¡Agenda Tu Consulta Gratuita!</h2>
        <p className="mb-3 text-[#63669a]">
          ¿Listo para poner tus impuestos en orden? Agenda una consulta gratuita con nuestros expertos para aclarar tus dudas fiscales.
        </p>
        <Link href="/agendar">
          <button className="btn text-lg md:text-xl px-8 py-3 rounded-2xl border-2 border-[#605cf7] bg-[#eaeafe] text-[#363676] shadow-md hover:bg-[#deddfd] transition">
            Ir a la Página de Agendamiento
          </button>
        </Link>
        <p className="text-xs mt-2 text-gray-400">
          Serás redirigido a nuestra página de agendamiento para elegir la fecha y hora que mejor te convenga.
        </p>
      </section>

      {/* CTA Cotización */}
      <section className="mb-20 fadeIn text-center">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-[#44485d]">Escríbenos y recibe una cotización desde 1000 pesos mensuales en adelante</h3>
          <input
            type="number"
            placeholder="Ingresa un monto personalizado"
            className="input px-4 py-2 rounded border border-gray-200 mb-2 w-full"
          />
          <br />
          <button className="btn rounded-2xl bg-[#605cf7] text-white font-semibold px-8 py-3 shadow hover:bg-[#3939a8] transition">
            Solicitar Cotización
          </button>
        </div>
      </section>
    </main>
  );
}
