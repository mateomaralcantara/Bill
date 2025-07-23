from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://hntxwzaptwssebabdyci.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudHh3emFwdHdzc2ViYWJkeWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MDk0NTYsImV4cCI6MjA2ODE4NTQ1Nn0.PWeXaHSr8IZr5YUusF0vXWaYV3MWUM8yLADzobGyWtg")

BUCKET = "facturas"
MAX_SIZE_MB = 2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Solo para dev. En prod usa tu dominio.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/")
def read_root():
    return {"message": "API lista 🚀"}

@app.post("/api/facturas/subir")
async def upload_factura(factura: UploadFile = File(...)):
    if factura.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Solo se aceptan imágenes jpg o png.")
    contents = await factura.read()
    size_mb = len(contents) / (1024 * 1024)
    if size_mb > MAX_SIZE_MB:
        raise HTTPException(status_code=400, detail="Imagen demasiado grande (máx 2MB).")
    filename = f"factura-{int(os.times().elapsed*1000)}-{factura.filename}"
    res = supabase.storage.from_(BUCKET).upload(filename, contents, {
        "content-type": factura.content_type
    })
    if res.get("error"):
        raise HTTPException(status_code=500, detail=res["error"]["message"])
    public_url = supabase.storage.from_(BUCKET).get_public_url(filename)
    return {"message": "Subida OK", "filePath": filename, "url": public_url}

@app.get("/api/facturas/listar")
def listar_facturas():
    res = supabase.storage.from_(BUCKET).list()
    files = res if isinstance(res, list) else []
    files_info = [
        {
            "name": f["name"],
            "url": supabase.storage.from_(BUCKET).get_public_url(f["name"])
        }
        for f in files
    ]
    return {"files": files_info}

@app.delete("/api/facturas/borrar")
def borrar_factura(filename: str = Query(..., description="Nombre del archivo a eliminar")):
    res = supabase.storage.from_(BUCKET).remove([filename])
    if res.get("error"):
        raise HTTPException(status_code=500, detail=res["error"]["message"])
    return {"message": f"{filename} eliminado"}
