# Backend run:

1. pip install fastapi uvicorn sqlalchemy pydantic
2. python -m uvicorn app.main:app --reload
3. (union con frontend) pip install fastapi[all]


# Frontend:
#### 1. Preparación del Entorno
1. Instalar Node.js en la computadora
2. Instalar Git
3. Instalar MetaMask en el navegador

#### 2. Clonar el Proyecto
```bash
git clone https://github.com/stephgrotewold/tech-final.git
cd TECH-FINAL
```
#### 3. Agregar el TOKEN al Metamask
1. Iniciar Sesion en MetaMask
2. Hacer click en Tokens
3. Luego ir a  `Import`
4. Copiar la dirección de contrato y darle aceptar.
```bash
0x668a659CC12a80925bEeC70729970B04Dc1a040F
```
#### 4. Instalar Dependencias
En la raiz del proyecto `tech-final`:
```bash
npm install
```
#### 5. Iniciar el Proyecto
En la raiz del proyecto `tech-final`:
```bash
npm start
```
Asegurarse de probar el localhost en el browser que tenga el metamask instalado. 
El proyecto debería estar corriendo en `http://localhost:3000`
