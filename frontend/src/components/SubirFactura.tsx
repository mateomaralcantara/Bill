"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function SubirFactura() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mostrar preview si es imagen, solo nombre si es PDF
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  // Abrir cámara (mobile) o selector normal
  const openCamera = () => {
    if (inputRef.current) {
      inputRef.current.setAttribute("capture", "environment");
      inputRef.current.click();
    }
  };

  const openFilePicker = () => {
    if (inputRef.current) {
      inputRef.current.removeAttribute("capture");
      inputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg("Selecciona una imagen o PDF primero.");
      return;
    }
    const formData = new FormData();
    formData.append("factura", file);

    setMsg("Subiendo...");
    const res = await fetch("http://localhost:4000/api/facturas/subir", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("¡Factura subida! " + data.filePath);
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = ""; // reset input
    } else {
      setMsg("Error: " + data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl glass-card shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Subir Factura</h2>
      <div className="flex gap-4 mb-3">
        <button type="button" className="btn" onClick={openCamera}>
          Usar Cámara
        </button>
        <button type="button" className="btn" onClick={openFilePicker}>
          Seleccionar Archivo
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {file && (
        <div className="mb-3">
          {file.type.startsWith("image/") && preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={160}
              height={160}
              className="w-40 h-40 object-contain rounded-lg mx-auto"
              unoptimized
            />
          ) : (
            <p>
              Archivo seleccionado: <strong>{file.name}</strong>
            </p>
          )}
        </div>
      )}
      <button className="btn" onClick={handleUpload}>
        Subir Factura
      </button>
      <div className="mt-2 text-center">{msg}</div>
    </div>
  );
}
