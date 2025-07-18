"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart, DollarSign, FileText, MessageSquare } from "lucide-react";
import { ReactNode } from "react";

// ---------- DashboardCard ultra visual ----------
interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  desc: string;
  href: string;
}

function DashboardCard({ title, icon, desc, href }: DashboardCardProps) {
  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ scale: 1.055, rotate: -1 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
      >
        <Card className="transition-all group-hover:bg-sky-800/80 dark:group-hover:bg-sky-900/70 shadow-2xl rounded-2xl min-h-[200px] flex flex-col justify-between glass-card relative overflow-hidden">
          <CardContent className="flex flex-col items-start gap-4 p-6 z-10">
            <span className="bg-gradient-to-br from-sky-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg text-4xl">
              {icon}
            </span>
            <div className="font-extrabold text-2xl tracking-wide text-sky-100 drop-shadow-md glow-anim">{title}</div>
            <div className="text-white/85 font-semibold">{desc}</div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

// ---------- Dashboard principal ----------
export default function Dashboard() {
  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-2">
      <motion.h1
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-black tracking-tight mb-8 glow-anim"
      >
        Panel de Control Fiscal
      </motion.h1>
      <p className="mb-10 text-xl text-sky-100 text-center max-w-2xl font-semibold drop-shadow">
        Bienvenido a tu panel. Aquí puedes monitorear tu estado fiscal, recibir alertas, gestionar facturas y acceder a tu asesoría personalizada con IA.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        <DashboardCard
          title="Estado Fiscal"
          icon={<BarChart size={40} className="text-sky-300" />}
          desc="Resumen de tus declaraciones y cumplimiento. Verifica si tienes pendientes o alertas."
          href="/dashboard/estado"
        />
        <DashboardCard
          title="Facturación"
          icon={<FileText size={40} className="text-sky-300" />}
          desc="Sube, consulta y descarga tus facturas. Todo centralizado y seguro."
          href="/facturas"
        />
        <DashboardCard
          title="Optimización de Impuestos"
          icon={<DollarSign size={40} className="text-sky-300" />}
          desc="Analiza y mejora tus deducciones automáticamente con ayuda de IA."
          href="/dashboard/optimizacion"
        />
        <DashboardCard
          title="Afiliados y Referidos"
          icon={<MessageSquare size={40} className="text-sky-300" />}
          desc="Gana comisiones y accede a tu panel de afiliados. ¡Empieza a recomendar!"
          href="/afiliados"
        />
        <DashboardCard
          title="Chat IA Fiscal"
          icon={<MessageSquare size={40} className="text-sky-300" />}
          desc="Consulta a nuestro asistente fiscal inteligente en cualquier momento."
          href="/chat"
        />
        <DashboardCard
          title="Agendar Consulta"
          icon={<FileText size={40} className="text-sky-300" />}
          desc="Reserva una cita con nuestros expertos fiscales."
          href="/agendar"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/chat">
          <Button className="bg-gradient-to-br from-sky-700 via-purple-600 to-sky-500 px-8 py-4 text-xl font-extrabold rounded-2xl shadow-xl hover:scale-105 hover:brightness-125 transition-all">
            Consultar con IA Fiscal
          </Button>
        </Link>
        <Link href="/facturas">
          <Button variant="outline" className="px-8 py-4 text-xl font-extrabold border-sky-400 text-sky-200 hover:bg-sky-900 rounded-2xl shadow-xl hover:scale-105 hover:text-white transition-all">
            Subir Factura
          </Button>
        </Link>
      </div>
    </main>
  );
}
