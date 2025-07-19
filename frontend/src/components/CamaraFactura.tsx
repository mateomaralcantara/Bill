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

  // Responsive sizes
  const VIDEO_WIDTH = 360; // slightly larger for tablets/pc
  const VIDEO_HEIGHT = 270;

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

  const tomarFoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    setCaptured(canvasRef.current.toDataURL("image/jpeg"));
    setMsg("¡Foto capturada!");
    detenerCamara();
  };

  const detenerCamara = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const uploadToSupabase = async (imageBase64: string): Promise<string> => {
    const response = await fetch(imageBase64);
    const blob = await response.blob();
    const fileName = `factura-${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
      .from("facturas")
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg",
      });

    if (error || !data) throw error ?? new Error("Error desconocido en Supabase");
    return data.path;
  };

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

  const limpiarCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT);
    }
  };

  const reiniciarCaptura = () => {
    setCaptured(null);
    setMsg("");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8 rounded-xl glass-card shadow-xl text-center bg-white">
      <h2 className="text-2xl font-bold mb-4">Capturar Factura con Cámara</h2>
      {!captured ? (
        <>
          <div className="w-full flex justify-center">
            <video
              ref={videoRef}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              autoPlay
              className="rounded-lg bg-black border-4 border-violet-700 aspect-video max-w-full h-auto"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-2 mt-3">
            <button className="btn w-full sm:w-auto" onClick={startCamera} type="button">
              Abrir Cámara
            </button>
            <button className="btn w-full sm:w-auto" onClick={tomarFoto} type="button">
              Tomar Foto
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            style={{ display: "none" }}
          />
        </>
      ) : (
        <div>
          <Image
            src={captured}
            alt="captura"
            className="rounded-lg mx-auto mb-3 border-4 border-violet-700 aspect-video max-w-full h-auto"
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            unoptimized
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="btn w-full sm:w-auto"
              onClick={handleUpload}
              disabled={uploading}
              type="button"
            >
              {uploading ? "Subiendo..." : "Subir Factura"}
            </button>
            <button
              className="btn w-full sm:w-auto"
              onClick={reiniciarCaptura}
              disabled={uploading}
              type="button"
            >
              Tomar otra
            </button>
          </div>
        </div>
      )}
      <div className="mt-4 min-h-[24px] text-sm">{msg}</div>
    </div>
  );
}
