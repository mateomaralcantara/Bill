"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function CamaraFactura() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Activa la cámara trasera del dispositivo
  const startCamera = async () => {
    setMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setMsg("No se pudo acceder a la cámara.");
    }
  };

  // Captura la imagen del video
  const tomarFoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);
    setCaptured(canvasRef.current.toDataURL("image/jpeg"));
    setMsg("¡Foto capturada!");
    detenerCamara();
  };

  // Detiene la cámara
  const detenerCamara = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  // Sube la imagen capturada a Supabase Storage
  const uploadToSupabase = async (imageBase64: string): Promise<string> => {
    const response = await fetch(imageBase64);
    const blob = await response.blob();
    const fileName = `factura-${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("facturas") // Nombre del bucket
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg",
      });

    if (error || !data) throw error ?? new Error("Error desconocido en Supabase");
    return data.path;
  };

  // Maneja el upload (sin 'any')
  const handleUpload = async () => {
    if (!captured) {
      setMsg("No hay foto capturada.");
      return;
    }
    setUploading(true);
    setMsg("Subiendo a Supabase...");
    try {
      const filePath = await uploadToSupabase(captured);
      setMsg("¡Factura subida a Supabase! " + filePath);
      setCaptured(null);
      limpiarCanvas();
    } catch (err) {
      if (err instanceof Error) {
        setMsg("Error al subir: " + err.message);
      } else {
        setMsg("Error desconocido al subir la factura.");
      }
    } finally {
      setUploading(false);
    }
  };

  // Limpia el canvas para tomar nueva foto
  const limpiarCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, 320, 240);
    }
  };

  // Reinicia la captura
  const reiniciarCaptura = () => {
    setCaptured(null);
    setMsg("");
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl glass-card shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-4">Capturar Factura con Cámara</h2>
      {!captured ? (
        <>
          <video
            ref={videoRef}
            width={320}
            height={240}
            autoPlay
            className="rounded mb-2 bg-black"
            style={{ border: "2px solid #7b35ff" }}
          />
          <div className="flex gap-3 justify-center mb-2">
            <button className="btn" onClick={startCamera} type="button">
              Abrir Cámara
            </button>
            <button className="btn" onClick={tomarFoto} type="button">
              Tomar Foto
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={320}
            height={240}
            style={{ display: "none" }}
          />
        </>
      ) : (
        <div>
          <Image
            src={captured}
            alt="captura"
            className="rounded w-60 h-auto mx-auto mb-3"
            style={{ border: "2px solid #7b35ff" }}
            width={240}
            height={180}
            unoptimized
            priority
          />
          <div className="flex gap-3 justify-center">
            <button
              className="btn"
              onClick={handleUpload}
              disabled={uploading}
              type="button"
            >
              {uploading ? "Subiendo..." : "Subir Factura"}
            </button>
            <button
              className="btn"
              onClick={reiniciarCaptura}
              disabled={uploading}
              type="button"
            >
              Tomar otra
            </button>
          </div>
        </div>
      )}
      <div className="mt-2">{msg}</div>
    </div>
  );
}
