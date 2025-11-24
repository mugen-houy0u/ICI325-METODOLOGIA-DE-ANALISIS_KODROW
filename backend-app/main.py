from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pymongo.database import Database
from contextlib import asynccontextmanager # Para el 'lifespan'

# 1. Importamos la INSTANCIA 'db_mongo' y la FUNCIÓN 'get_mongo_db'
from database import db_mongo, get_mongo_db

# 2. Importamos el router
from routers import router as api_router

# 3. ¡NUEVO! Definimos el 'lifespan'
@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Código que se ejecuta AL ARRANCAR ---
    db_mongo.connect() # Aquí se conecta
    
    yield  # La aplicación se ejecuta aquí
    
    # --- Código que se ejecuta AL APAGARSE ---
    db_mongo.close() # Aquí se desconecta

# 4. Pasamos el 'lifespan' a nuestra app de FastAPI
app = FastAPI(title="Prototipo", lifespan=lifespan)

# 4.1 Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Puerto de Vite dev server (configurado)
        "http://localhost:5173",  # Puerto por defecto de Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

# 5. Incluimos las rutas
app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {
        "title": "MVP Metodologia ",
        "message": "Bienvenido al backend MVP Metodologia ",
        "status": "API corriendo sin problemas"
    }
