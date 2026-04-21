# 🎫 Ticketera - API REST

API REST para gestión de tickets desarrollada con Node.js, Express y MongoDB.

## 🚀 Tecnologías

- **Node.js** + **Express** — servidor y enrutamiento
- **MongoDB** + **Mongoose** — base de datos
- **JWT** — autenticación con JSON Web Tokens
- **bcrypt** — hash de contraseñas
- **Winston** — logging (info y errores)
- **Helmet** + **CORS** + **express-rate-limit** — seguridad
- **Jest** + **Supertest** — testing
- **Joi** — validación de datos

## 📁 Estructura

```
├── Models/          # Modelos de Mongoose
├── routes/          # Rutas de la API
├── middlewears/     # Middlewares (auth, errores, etc.)
├── validations/     # Esquemas de validación con Joi
├── helpers/         # Funciones utilitarias
├── scripts/         # Scripts (ej: poblar DB)
├── test/            # Tests con Jest
├── rest_request/    # Ejemplos de requests
└── app.js / server.js
```

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/christiansanguinetti/Ticketera.git
cd Ticketera

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editá el .env con tus valores
```

## 🔧 Variables de entorno

Creá un archivo `.env` en la raíz con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ticketera
JWT_SECRET=tu_secreto_jwt
NODE_ENV=dev
```

## ▶️ Uso

```bash
# Desarrollo
npm run dev

# Producción
npm start

# Poblar la base de datos
npm run db-populate

# Tests
npm test
```

## 📬 Endpoints

> Podés encontrar ejemplos de requests en la carpeta `/rest_request`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login y obtención de token |
| GET | `/api/tickets` | Listar tickets |
| POST | `/api/tickets` | Crear ticket |
| PUT | `/api/tickets/:id` | Actualizar ticket |
| DELETE | `/api/tickets/:id` | Eliminar ticket |

> ⚠️ Ajustá los endpoints según tus rutas reales.

## 🧪 Tests

```bash
npm test
```

## 👤 Autor

**Christian Sanguinetti** — [@christiansanguinetti](https://github.com/christiansanguinetti)

## 📄 Licencia

MIT