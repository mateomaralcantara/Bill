// frontend/src/components/CamaraFactura.tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

const VIDEO_WIDTH = 360;
const VIDEO_HEIGHT = 480; // Cambia aquí para capturar más
const CROP_WIDTH = VIDEO_WIDTH;
const CROP_HEIGHT = VIDEO_HEIGHT;
const MAX_FILE_SIZE = 500 * 1024; // 500 KB

async function compressImage(base64: string, maxSize = MAX_FILE_SIZE, minQuality = 0.3) {
  let quality = 0.7;
  let result = base64;
  for (let i = 0; i < 4; i++) {
    const blob = await (await fetch(result)).blob();
    if (blob.size <= maxSize || quality <= minQuality) return { base64: result, size: blob.size };
    const img = document.createElement("img");
    img.src = result;
    await new Promise((res) => (img.onload = res));
    const canvas = document.createElement("canvas");
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, CROP_WIDTH, CROP_HEIGHT);
    result = canvas.toDataURL("image/jpeg", quality -= 0.15);
  }
  const blob = await (await fetch(result)).blob();
  return { base64: result, size: blob.size };
}

export default function CamaraFactura() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const tomarFoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, CROP_WIDTH, CROP_HEIGHT); // Ahora TODO el video
    const base64 = canvasRef.current.toDataURL("image/jpeg", 0.7);
    const { base64: optBase64, size } = await compressImage(base64);
    setCaptured(optBase64);
    setFileSize(size);
    setMsg("¡Foto capturada!");
    detenerCamara();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMsg("Solo se permiten imágenes.");
      return;
    }
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    await new Promise((res) => (img.onload = res));
    const canvas = document.createElement("canvas");
    canvas.width = CROP_WIDTH;
    canvas.height = CROP_HEIGHT;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, CROP_WIDTH, CROP_HEIGHT);
    const base64 = canvas.toDataURL("image/jpeg", 0.7);
    const { base64: optBase64, size } = await compressImage(base64);
    setCaptured(optBase64);
    setFileSize(size);
    setMsg("Imagen lista y optimizada.");
  };

  const uploadToSupabase = async (imageBase64: string): Promise<string> => {
    const response = await fetch(imageBase64);
    const blob = await response.blob();
    if (blob.size > MAX_FILE_SIZE) {
      setMsg("¡No se pudo comprimir suficiente! Intenta una imagen más pequeña.");
      return "";
    }
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
      if (!filePath) return;
      setMsg("¡Factura subida a Supabase! " + filePath);
      setCaptured(null);
      setFileSize(null);
      limpiarCanvas();
    } catch (err) {
      const error = err as Error;
      setMsg("Error al subir: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const limpiarCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, CROP_WIDTH, CROP_HEIGHT);
    }
  };

  const detenerCamara = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const reiniciarCaptura = () => {
    setCaptured(null);
    setFileSize(null);
    setMsg("");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8 rounded-xl glass-card shadow-xl text-center bg-white">
      <h2 className="text-2xl font-bold mb-4">Subir Factura</h2>
      {!captured ? (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <video
              ref={videoRef}
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              autoPlay
              className="rounded-lg bg-black border-4 border-violet-700 aspect-video max-w-full h-auto"
              style={{ objectFit: "cover" }}
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
              <button className="btn w-full sm:w-auto" onClick={startCamera} type="button">
                Abrir Cámara
              </button>
              <button className="btn w-full sm:w-auto" onClick={tomarFoto} type="button">
                Tomar Foto
              </button>
            </div>
            <span className="text-sm my-2 text-gray-400">o</span>
            <input
              type="file"
              accept="image/*"
              className="w-full text-center border rounded-md py-2"
              onChange={handleFileInput}
              disabled={uploading}
            />
          </div>
          <canvas
            ref={canvasRef}
            width={CROP_WIDTH}
            height={CROP_HEIGHT}
            style={{ display: "none" }}
          />
        </>
      ) : (
        <div>
          <Image
            src={captured}
            alt="captura"
            className="rounded-lg mx-auto mb-3 border-4 border-violet-700 aspect-video max-w-full h-auto"
            width={CROP_WIDTH}
            height={CROP_HEIGHT}
            unoptimized
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="mb-2">
            <span className="text-xs text-gray-500">
              Tamaño: {fileSize ? (fileSize / 1024).toFixed(0) : "?"} KB
            </span>
            {fileSize && fileSize > MAX_FILE_SIZE && (
              <span className="ml-2 text-red-500 font-bold">¡Demasiado grande!</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="btn w-full sm:w-auto"
              onClick={handleUpload}
              disabled={uploading || (fileSize !== null && fileSize > MAX_FILE_SIZE)}
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
              Seleccionar otra
            </button>
          </div>
        </div>
      )}
      <div className="mt-4 min-h-[24px] text-sm">{msg}</div>
    </div>
  );
}
