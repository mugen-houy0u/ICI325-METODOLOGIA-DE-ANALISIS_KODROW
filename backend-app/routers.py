# routers.py

from fastapi import APIRouter, Depends, status, HTTPException
from pymongo.database import Database
from pydantic import BaseModel 
from typing import Optional, List # Importamos List para los arrays

from database import get_mongo_db
from bson import ObjectId

# Creamos el enrutador
router = APIRouter()


# --- 1. Modelos de Datos Pydantic (CONSULTAS) ---

class PacienteBase(BaseModel):
    nombre: str
    apellido: str
    rut: str
    telefono: str

class ConsultaBase(BaseModel):
    tipo: str
    doctor: str
    fecha: str 
    hora: str 
    paciente: PacienteBase # Modelo anidado

# Modelo para Actualizar (PUT) Consultas
class PacienteUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    rut: Optional[str] = None
    telefono: Optional[str] = None

class ConsultaUpdate(BaseModel):
    tipo: Optional[str] = None
    doctor: Optional[str] = None
    fecha: Optional[str] = None 
    hora: Optional[str] = None 
    paciente: Optional[PacienteUpdate] = None
    class Config:
        from_attributes = True 


# --- ¡NUEVO! 2. Modelos de Datos Pydantic (ODONTOLOGOS) ---
# (Basado en la estructura de tu imagen)

class OdontologoBase(BaseModel):
    nombre: str
    especialidad: str
    rut: str
    horarios: List[str]  # Esto define que 'horarios' es una lista de strings


# ==========================================================
# --- 3. Rutas CRUD para /consultas/ ---
# ==========================================================

@router.post("/consultas/", 
             status_code=status.HTTP_201_CREATED,
             summary="Crea una nueva consulta")
def crear_consulta(consulta: ConsultaBase, db: Database = Depends(get_mongo_db)):
    collection = db["consulta"]
    consulta_dict = consulta.model_dump()
    try:
        result = collection.insert_one(consulta_dict)
        return {
            "status": "Consulta creada exitosamente",
            "id_insertado": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/consultas/", summary="Obtiene todas las consultas")
def get_todas_las_consultas(db: Database = Depends(get_mongo_db)):
    collection = db["consulta"]
    consultas_cursor = collection.find()
    lista_consultas = []
    for doc in consultas_cursor:
        doc["_id"] = str(doc["_id"])
        lista_consultas.append(doc)
    return lista_consultas


@router.get("/consultas/{id_consulta}", summary="Obtiene una consulta por su ID")
def get_consulta_por_id(id_consulta: str, db: Database = Depends(get_mongo_db)):
    try:
        obj_id = ObjectId(id_consulta)
    except Exception:
        raise HTTPException(status_code=400, detail="El formato del ID no es válido")

    consulta = db["consulta"].find_one({"_id": obj_id})
    
    if consulta:
        consulta["_id"] = str(consulta["_id"])
        return consulta
    else:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")


@router.put("/consultas/{id_consulta}", summary="Actualiza una consulta por su ID")
def actualizar_consulta(id_consulta: str, 
                        consulta_update: ConsultaUpdate, 
                        db: Database = Depends(get_mongo_db)):
    try:
        obj_id = ObjectId(id_consulta)
    except Exception:
        raise HTTPException(status_code=400, detail="El formato del ID no es válido")

    update_data = consulta_update.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No se enviaron datos para actualizar")

    result = db["consulta"].update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    
    if result.modified_count == 0:
        return {"status": "Sin cambios, los datos enviados eran idénticos"}

    return {"status": "Consulta actualizada exitosamente"}


@router.delete("/consultas/{id_consulta}", summary="Elimina una consulta por su ID")
def eliminar_consulta(id_consulta: str, db: Database = Depends(get_mongo_db)):
    try:
        obj_id = ObjectId(id_consulta)
    except Exception:
        raise HTTPException(status_code=400, detail="El formato del ID no es válido")

    result = db["consulta"].delete_one({"_id": obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
        
    return {"status": "Consulta eliminada exitosamente"}


# ==========================================================
# --- 4. Rutas GET y POST para /odontologos/ ---
# ==========================================================

@router.post("/odontologos/",
             status_code=status.HTTP_201_CREATED,
             summary="Crea un nuevo odontólogo")
def crear_odontologo(odontologo: OdontologoBase, db: Database = Depends(get_mongo_db)):
    """
    Crea un nuevo documento de odontólogo en la colección 'odontologos'.
    """
    collection = db["odontologos"] # <-- Apunta a la nueva colección
    
    # Convertimos el modelo a diccionario
    odontologo_dict = odontologo.model_dump()
    
    try:
        result = collection.insert_one(odontologo_dict)
        return {
            "status": "Odontólogo creado exitosamente",
            "id_insertado": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/odontologos/", summary="Obtiene todos los odontólogos")
def get_todos_los_odontologos(db: Database = Depends(get_mongo_db)):
    """
    Obtiene todos los documentos de la colección 'odontologos'.
    """
    collection = db["odontologos"] # <-- Apunta a la nueva colección
    odontologos_cursor = collection.find()
    
    lista_odontologos = []
    for doc in odontologos_cursor:
        doc["_id"] = str(doc["_id"])
        lista_odontologos.append(doc)
        
    return lista_odontologos


# Te incluyo también la de obtener un odontólogo por ID, es estándar.
@router.get("/odontologos/{id_odontologo}", summary="Obtiene un odontólogo por su ID")
def get_odontologo_por_id(id_odontologo: str, db: Database = Depends(get_mongo_db)):
    """
    Obtiene un odontólogo específico usando su _id.
    """
    try:
        obj_id = ObjectId(id_odontologo)
    except Exception:
        raise HTTPException(status_code=400, detail="El formato del ID no es válido")

    # Apunta a la nueva colección
    odontologo = db["odontologos"].find_one({"_id": obj_id})
    
    if odontologo:
        odontologo["_id"] = str(odontologo["_id"])
        return odontologo
    else:
        raise HTTPException(status_code=404, detail="Odontólogo no encontrado")