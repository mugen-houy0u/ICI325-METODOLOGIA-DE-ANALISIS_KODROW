# database.py

from pymongo import MongoClient
from pymongo.server_api import ServerApi
import sys # Para imprimir errores

uri = "mongodb+srv://renato:papazeta123@elvecino.dpu1taw.mongodb.net/?appName=ElVecino"

class DBMongo:
    def __init__(self):
        self.client = None
        self.db = None

    def connect(self):
        """
        Se conecta a la base de datos. Se llama SÓLO al inicio de la app.
        """
        # Si ya estamos conectados, no hacemos nada
        if self.client:
            return
            
        print("INFO:     Conectando a MongoDB Atlas...")
        try:
            # 1. Creamos el cliente
            self.client = MongoClient(uri, server_api=ServerApi('1'))
            
            # 2. Hacemos un 'ping' para probar la conexión
            self.client.admin.command('ping')
            
            # 3. Si el ping funciona, asignamos la BBDD
            self.db = self.client["Metodologia"]
            print("INFO:     Conexión a MongoDB exitosa.")
            
        except Exception as e:
            print(f"ERROR:    No se pudo conectar a MongoDB: {e}", file=sys.stderr)
            self.client = None
            self.db = None

    def close(self):
        """
        Cierra la conexión. Se llama SÓLO al apagar la app.
        """
        if self.client:
            self.client.close()
            print("INFO:     Conexión a MongoDB cerrada.")

    def get_db(self):
        """
        Esta es la función que usarán los 'Depends' en las rutas.
        """
        if self.db is None:
            # Si el 'lifespan' funcionó, 'db' nunca debería ser None aquí.
            # Si lo es, algo muy malo pasó al inicio.
            raise Exception("Error grave: La BBDD no está conectada.")
        return self.db

# --- IMPORTANTE ---
# Creamos UNA sola instancia de nuestra clase para toda la app
db_mongo = DBMongo()

# Esta es la función que importarán 'main.py' y 'routers.py'
def get_mongo_db():
    return db_mongo.get_db()