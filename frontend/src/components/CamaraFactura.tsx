"use client";
import { useRef, useState } from "react";

export default function CamaraFactura() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Inicia la cámara
  const startCamera = async () => {
    setMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      setMsg("No se pudo acceder a la cámara.");
    }
  };

  // Toma la foto y la guarda como base64
  const tomarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(videoRef.current, 0, 0, 320, 240);
      const image = canvasRef.current.toDataURL("image/jpeg");
      setCaptured(image);
      setMsg("¡Foto capturada!");
      // Detiene la cámara después de tomar la foto
      if (videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    }
  };

  // Convierte base64 a blob para subir
  function base64toBlob(dataurl: string) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  // Subir la foto al backend
  const handleUpload = async () => {
    if (!captured) {
      setMsg("No hay foto capturada.");
      return;
    }
    setUploading(true);
    setMsg("Subiendo...");
    const blob = base64toBlob(captured);
    const file = new File([blob], "factura.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("factura", file);

    const res = await fetch("http://localhost:4000/api/facturas/subir", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      setMsg("¡Factura subida! " + data.filePath);
      setCaptured(null);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, 320, 240);
      }
    } else {
      setMsg("Error: " + data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl glass-card shadow-xl text-center">
      <h2 className="text-2xl font-bold mb-4">Capturar Factura con Cámara</h2>
      {!captured && (
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
            <button className="btn" onClick={startCamera}>
              Abrir Cámara
            </button>
            <button className="btn" onClick={tomarFoto}>
              Tomar Foto
            </button>
          </div>
          <canvas ref={canvasRef} width={320} height={240} style={{ display: "none" }} />
        </>
      )}
      {captured && (
        <div>
          <img
            src={captured}
            alt="captura"
            className="rounded w-60 h-auto mx-auto mb-3"
            style={{ border: "2px solid #7b35ff" }}
          />
          <div className="flex gap-3 justify-center">
            <button className="btn" onClick={handleUpload} disabled={uploading}>
              {uploading ? "Subiendo..." : "Subir Factura"}
            </button>
            <button
              className="btn"
              onClick={() => {
                setCaptured(null);
                setMsg("");
              }}
              disabled={uploading}
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
