# Checklist de Pruebas - Sprint 1 Backend (User Story 1)

## Pre-requisitos

### 1. Verificar Configuración del Entorno
- [ ] El archivo `.env` existe en `backend/` con todas las variables necesarias
- [ ] La base de datos PostgreSQL está corriendo (o configurada en Supabase)
- [ ] El entorno virtual está activado: `.\venv\Scripts\activate`
- [ ] Todas las dependencias están instaladas: `pip install -r requirements.txt`

### 2. Verificar Variables de Entorno Críticas
```bash
# Verifica que estas variables estén configuradas en tu .env
DATABASE_URL=postgresql://...
JWT_SECRET=tu_secret_key_aqui
RESEND_API_KEY=re_... (opcional para testing inicial)
RESEND_FROM_EMAIL=noreply@tu-dominio.com
FRONTEND_URL=http://localhost:5173
```

- [ ] `DATABASE_URL` apunta a tu base de datos
- [ ] `JWT_SECRET` está configurado (mínimo 32 caracteres)
- [ ] `RESEND_API_KEY` está configurado (o comentado para testing sin email)
- [ ] `FRONTEND_URL` está configurado

### 3. Verificar Migraciones de Base de Datos
```bash
# Desde backend/
.\venv\Scripts\alembic.exe upgrade head
```
- [ ] Las migraciones se ejecutaron sin errores
- [ ] La tabla `users` existe en la base de datos

### 4. Verificar que el Servidor Arranca
```bash
# Desde backend/
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- [ ] El servidor arranca sin errores
- [ ] Puedes acceder a http://localhost:8000/docs (Swagger UI)
- [ ] La documentación de API se muestra correctamente

---

## Pruebas de Componentes Individuales

### TASK-039: Schemas de Usuario

#### Prueba Manual con Python
```python
# Crea un archivo: backend/test_manual_schemas.py
from app.schemas.user import UserCreate, UserResponse
from datetime import datetime
from uuid import uuid4

# Test 1: UserCreate con datos válidos
try:
    user_data = UserCreate(
        email="test@example.com",
        password="Password123",
        full_name="Test User",
        phone="+1234567890"
    )
    print("✓ UserCreate válido funciona correctamente")
except Exception as e:
    print(f"✗ Error en UserCreate: {e}")

# Test 2: UserCreate sin teléfono (opcional)
try:
    user_data = UserCreate(
        email="test2@example.com",
        password="Password123",
        full_name="Test User Two"
    )
    print("✓ UserCreate sin phone funciona correctamente")
except Exception as e:
    print(f"✗ Error en UserCreate sin phone: {e}")

# Test 3: UserResponse
try:
    user_response = UserResponse(
        id=uuid4(),
        email="test@example.com",
        full_name="Test User",
        created_at=datetime.utcnow()
    )
    print("✓ UserResponse funciona correctamente")
except Exception as e:
    print(f"✗ Error en UserResponse: {e}")

print("\n✓ Todos los schemas funcionan correctamente")
```

```bash
.\venv\Scripts\python.exe test_manual_schemas.py
```

- [ ] UserCreate acepta datos válidos
- [ ] UserCreate funciona sin phone (campo opcional)
- [ ] UserResponse se crea correctamente
- [ ] Los campos EmailStr validan emails correctamente

---

### TASK-040: Funciones de Hashing de Contraseñas

#### Prueba Manual con Python
```python
# Crea un archivo: backend/test_manual_security.py
from app.core.security import hash_password, verify_password, needs_update

# Test 1: Hash de contraseña
password = "TestPassword123"
hashed = hash_password(password)
print(f"Password: {password}")
print(f"Hash: {hashed}")
print(f"✓ Hash generado correctamente (longitud: {len(hashed)})")

# Test 2: Verificación correcta
if verify_password(password, hashed):
    print("✓ verify_password: Contraseña correcta verificada")
else:
    print("✗ verify_password: Falló con contraseña correcta")

# Test 3: Verificación incorrecta
if not verify_password("WrongPassword", hashed):
    print("✓ verify_password: Contraseña incorrecta rechazada")
else:
    print("✗ verify_password: Aceptó contraseña incorrecta")

# Test 4: Verificar si necesita actualización
if needs_update(hashed):
    print("⚠ Hash necesita actualización (bcrypt rounds bajos)")
else:
    print("✓ Hash no necesita actualización")

print("\n✓ Todas las funciones de seguridad funcionan correctamente")
```

```bash
.\venv\Scripts\python.exe test_manual_security.py
```

- [ ] `hash_password()` genera hashes diferentes cada vez
- [ ] `verify_password()` acepta contraseñas correctas
- [ ] `verify_password()` rechaza contraseñas incorrectas
- [ ] `needs_update()` funciona correctamente

---

### TASK-041: UserService

#### Prueba Manual con Python
```python
# Crea un archivo: backend/test_manual_user_service.py
import asyncio
from app.services.user_service import UserService, EmailAlreadyExistsError
from app.schemas.user import UserCreate
from app.core.database import get_db
from app.models.user import User

async def test_user_service():
    """Test UserService con AsyncSession"""
    # Obtener sesión de base de datos asíncrona
    async for db in get_db():
        try:
            # Test 1: Registrar un usuario nuevo
            print("Test 1: Registrar usuario nuevo")
            user_data = UserCreate(
                email="test_service@example.com",
                password="Password123",
                full_name="Service Test User",
                phone="+1234567890"
            )

            user = await UserService.register(db, user_data)
            print(f"✓ Usuario registrado: {user.email} (ID: {user.id})")

            # Test 2: Intentar registrar con el mismo email (debe fallar)
            print("\nTest 2: Intentar registrar con email duplicado")
            try:
                duplicate_user = await UserService.register(db, user_data)
                print("✗ ERROR: Se permitió email duplicado")
            except EmailAlreadyExistsError as e:
                print(f"✓ Email duplicado rechazado correctamente: {e}")

            # Test 3: Buscar usuario por email
            print("\nTest 3: Buscar usuario por email")
            found_user = await UserService.get_by_email(db, "test_service@example.com")
            if found_user:
                print(f"✓ Usuario encontrado: {found_user.email}")
            else:
                print("✗ Usuario no encontrado")

            # Test 4: Verificar que la contraseña está hasheada
            print("\nTest 4: Verificar contraseña hasheada")
            from sqlalchemy import select
            result = await db.execute(select(User).filter(User.email == "test_service@example.com"))
            db_user = result.scalar_one_or_none()
            if db_user and db_user.password_hash.startswith("$2b$"):
                print(f"✓ Contraseña correctamente hasheada (bcrypt)")
            else:
                print("✗ Contraseña no está hasheada correctamente")

            # Test 5: Autenticar usuario
            print("\nTest 5: Autenticar usuario")
            authenticated = await UserService.authenticate(db, "test_service@example.com", "Password123")
            if authenticated:
                print(f"✓ Autenticación exitosa: {authenticated.email}")
            else:
                print("✗ Autenticación falló")

            # Test 6: Autenticar con contraseña incorrecta
            print("\nTest 6: Autenticar con contraseña incorrecta")
            failed_auth = await UserService.authenticate(db, "test_service@example.com", "WrongPassword")
            if not failed_auth:
                print("✓ Autenticación rechazada correctamente")
            else:
                print("✗ Autenticación aceptó contraseña incorrecta")

            print("\n✓ Todos los tests de UserService pasaron")

            # Limpieza (opcional - comentar si quieres mantener el usuario para otras pruebas)
            # from sqlalchemy import delete
            # await db.execute(delete(User).where(User.email == "test_service@example.com"))
            # await db.commit()
            # print("\n✓ Usuario de prueba eliminado")

        except Exception as e:
            print(f"\n✗ Error en tests: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await db.close()
        break  # Solo queremos ejecutar una vez

# Ejecutar los tests
if __name__ == "__main__":
    asyncio.run(test_user_service())
```

```bash
.\venv\Scripts\python.exe test_manual_user_service.py
```

- [ ] Se puede registrar un usuario nuevo
- [ ] No se permite email duplicado (lanza `EmailAlreadyExistsError`)
- [ ] `get_by_email()` encuentra usuarios correctamente
- [ ] La contraseña se hashea correctamente (empieza con `$2b$`)
- [ ] `authenticate()` acepta credenciales correctas
- [ ] `authenticate()` rechaza credenciales incorrectas

---

### TASK-043: Tokens de Verificación JWT

#### Prueba Manual con Python
```python
# Crea un archivo: backend/test_manual_tokens.py
from app.core.security import (
    create_verification_token,
    verify_verification_token,
    create_password_reset_token,
    verify_password_reset_token
)
from uuid import uuid4
import time

user_id = uuid4()
print(f"Testing with user_id: {user_id}")

# Test 1: Crear token de verificación
print("\nTest 1: Crear token de verificación")
verification_token = create_verification_token(user_id)
print(f"✓ Token creado: {verification_token[:50]}...")

# Test 2: Verificar token válido
print("\nTest 2: Verificar token válido")
verified_user_id = verify_verification_token(verification_token)
if verified_user_id == str(user_id):
    print(f"✓ Token verificado correctamente: {verified_user_id}")
else:
    print(f"✗ Token verificado con user_id incorrecto: {verified_user_id}")

# Test 3: Verificar token inválido
print("\nTest 3: Verificar token inválido")
invalid_result = verify_verification_token("token_invalido")
if invalid_result is None:
    print("✓ Token inválido rechazado correctamente")
else:
    print("✗ Token inválido fue aceptado")

# Test 4: Crear token de reset de contraseña
print("\nTest 4: Crear token de reset de contraseña")
reset_token = create_password_reset_token(user_id)
print(f"✓ Token de reset creado: {reset_token[:50]}...")

# Test 5: Verificar token de reset válido
print("\nTest 5: Verificar token de reset válido")
reset_verified_user_id = verify_password_reset_token(reset_token)
if reset_verified_user_id == str(user_id):
    print(f"✓ Token de reset verificado correctamente: {reset_verified_user_id}")
else:
    print(f"✗ Token de reset verificado con user_id incorrecto")

# Test 6: Verificar que tokens de verificación no funcionan como tokens de reset
print("\nTest 6: Verificar separación de tipos de tokens")
wrong_type_result = verify_password_reset_token(verification_token)
if wrong_type_result is None:
    print("✓ Token de verificación rechazado como token de reset")
else:
    print("✗ Token de verificación aceptado como token de reset")

# Test 7: Verificar expiración (opcional - toma tiempo)
print("\nTest 7: Verificar expiración de tokens (creando token con 1 segundo)")
short_token = create_verification_token(user_id, expires_hours=1/3600)  # 1 segundo
time.sleep(2)
expired_result = verify_verification_token(short_token)
if expired_result is None:
    print("✓ Token expirado rechazado correctamente")
else:
    print("✗ Token expirado fue aceptado")

print("\n✓ Todos los tests de tokens pasaron")
```

```bash
.\venv\Scripts\python.exe test_manual_tokens.py
```

- [ ] Se crean tokens de verificación correctamente
- [ ] Se verifican tokens válidos correctamente
- [ ] Se rechazan tokens inválidos
- [ ] Se crean tokens de reset de contraseña
- [ ] Los tokens de verificación no funcionan como tokens de reset
- [ ] Los tokens expirados son rechazados

---

## Pruebas del Endpoint con Postman

### TASK-044 y TASK-045: Endpoint POST /api/v1/auth/register

#### Configuración de Postman

1. **Crear una nueva Collection** llamada "12it API - Auth"

2. **Variables de Collection**:
   - `base_url`: `http://localhost:8000`
   - `api_version`: `v1`

---

#### Caso de Prueba 1: Registro Exitoso

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "usuario1@ejemplo.com",
    "password": "Password123",
    "full_name": "Usuario de Prueba 1",
    "phone": "+52 123 456 7890"
}
```

**Validaciones:**
- [ ] Status Code: `201 Created`
- [ ] Response tiene estructura:
  ```json
  {
      "success": true,
      "message": "...",
      "data": {
          "user": {
              "id": "uuid",
              "email": "usuario1@ejemplo.com",
              "full_name": "Usuario de Prueba 1",
              "created_at": "timestamp"
          }
      }
  }
  ```
- [ ] `id` es un UUID válido
- [ ] `email` coincide con el enviado
- [ ] `created_at` es un timestamp válido
- [ ] **NO** se devuelve el campo `password` o `password_hash`

---

#### Caso de Prueba 2: Registro sin Teléfono (Campo Opcional)

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "usuario2@ejemplo.com",
    "password": "Password456",
    "full_name": "Usuario Sin Teléfono"
}
```

**Validaciones:**
- [ ] Status Code: `201 Created`
- [ ] Se crea el usuario correctamente
- [ ] El campo `phone` es opcional

---

#### Caso de Prueba 3: Email Duplicado (409 Conflict)

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "usuario1@ejemplo.com",
    "password": "OtraPassword789",
    "full_name": "Otro Usuario"
}
```

**Validaciones:**
- [ ] Status Code: `409 Conflict` (NO 400)
- [ ] Response tiene estructura de error:
  ```json
  {
      "success": false,
      "error": "EmailAlreadyExists",
      "message": "...",
      "details": [
          {
              "field": "email",
              "message": "This email address is already registered",
              "code": "email_exists"
          }
      ]
  }
  ```

---

#### Caso de Prueba 4: Email Inválido (422 Validation Error)

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "email_invalido",
    "password": "Password123",
    "full_name": "Usuario Test"
}
```

**Validaciones:**
- [ ] Status Code: `422 Unprocessable Entity`
- [ ] El error indica que el email no es válido

---

#### Caso de Prueba 5: Contraseña Corta (422 Validation Error)

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "usuario3@ejemplo.com",
    "password": "123",
    "full_name": "Usuario Test"
}
```

**Validaciones:**
- [ ] Status Code: `422 Unprocessable Entity`
- [ ] El error indica que la contraseña debe tener al menos 8 caracteres

---

#### Caso de Prueba 6: Campos Faltantes (422 Validation Error)

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "usuario4@ejemplo.com"
}
```

**Validaciones:**
- [ ] Status Code: `422 Unprocessable Entity`
- [ ] El error indica los campos faltantes (`password`, `full_name`)

---

#### Caso de Prueba 7: full_name Demasiado Corto

**Request:**
```
POST {{base_url}}/api/{{api_version}}/auth/register
Content-Type: application/json

Body (JSON):
{
    "email": "usuario5@ejemplo.com",
    "password": "Password123",
    "full_name": "A"
}
```

**Validaciones:**
- [ ] Status Code: `422 Unprocessable Entity`
- [ ] El error indica que `full_name` debe tener al menos 2 caracteres

---

## Verificaciones en Base de Datos

### Verificación Manual de Datos

```sql
-- Conectarse a tu base de datos PostgreSQL
-- Puedes usar pgAdmin, DBeaver, o psql

-- 1. Verificar que los usuarios se crearon
SELECT id, email, full_name, phone, created_at, email_verified
FROM users
ORDER BY created_at DESC;
```

**Validaciones:**
- [ ] Los usuarios registrados aparecen en la tabla
- [ ] Los emails están guardados correctamente
- [ ] `email_verified` es `FALSE` por defecto
- [ ] `password_hash` NO es visible (o está hasheado)
- [ ] `created_at` tiene timestamps correctos

```sql
-- 2. Verificar que las contraseñas están hasheadas
SELECT email, password_hash
FROM users
WHERE email = 'usuario1@ejemplo.com';
```

**Validaciones:**
- [ ] `password_hash` empieza con `$2b$` (bcrypt)
- [ ] `password_hash` tiene aproximadamente 60 caracteres
- [ ] NO se ve la contraseña en texto plano

```sql
-- 3. Verificar unicidad de emails (intentar insertar duplicado)
-- Este query debe fallar si la restricción UNIQUE está activa
INSERT INTO users (email, password_hash, full_name, phone)
VALUES ('usuario1@ejemplo.com', 'fake_hash', 'Test', '');
```

**Validaciones:**
- [ ] El insert falla con error de UNIQUE constraint
- [ ] El error menciona `users_email_key` o similar

---

## Verificaciones de Email (TASK-042)

### Si Resend está Configurado

1. **Verificar configuración en .env:**
   ```bash
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=noreply@tu-dominio.com
   RESEND_FROM_NAME=12it Platform
   ```

2. **Registrar un usuario nuevo con Postman**

3. **Verificaciones:**
   - [ ] Revisa tu dashboard de Resend: https://resend.com/emails
   - [ ] Debe aparecer un email enviado
   - [ ] El email fue enviado a la dirección correcta
   - [ ] El asunto es "Verify your email - 12it Platform"
   - [ ] El email contiene un link de verificación con formato:
     ```
     http://localhost:5173/verify-email?token=eyJ...
     ```

4. **Verificar logs del servidor:**
   - [ ] Aparece log: `Email sent successfully to ...`

### Si Resend NO está Configurado

- [ ] El registro funciona correctamente
- [ ] Aparece log: `Email service not configured, skipping verification email`
- [ ] El usuario se crea sin enviar email

---

## Verificaciones de Logs y Middleware

### 1. Verificar Logs en la Consola del Servidor

Al hacer requests, deberías ver logs similares a:

```
INFO:     127.0.0.1:xxxxx - "POST /api/v1/auth/register HTTP/1.1" 201 Created
INFO:     New user registered: usuario1@ejemplo.com (ID: uuid)
INFO:     Email sent successfully to usuario1@ejemplo.com
```

**Validaciones:**
- [ ] Cada request genera un log de entrada
- [ ] Los registros exitosos muestran status 201
- [ ] Los errores muestran el status correcto (409, 422, etc.)
- [ ] Los warnings aparecen para emails duplicados

### 2. Verificar Middleware de Errores

- [ ] Los errores tienen formato consistente con `success: false`
- [ ] Los errores 500 no revelan información sensible
- [ ] Los errores de validación (422) incluyen detalles específicos

---

## Verificaciones de Seguridad

### 1. Contraseñas Nunca en Respuestas
- [ ] Las respuestas del API NUNCA incluyen `password` o `password_hash`
- [ ] Solo se devuelven campos seguros (`id`, `email`, `full_name`, `created_at`)

### 2. Tokens JWT
- [ ] Los tokens tienen formato JWT válido (3 partes separadas por puntos)
- [ ] Los tokens no se pueden decodificar sin el `JWT_SECRET`

### 3. Validación de Entrada
- [ ] Emails inválidos son rechazados
- [ ] Contraseñas cortas son rechazadas
- [ ] Campos faltantes son rechazados

---

## Verificación de Swagger UI

### Acceder a la Documentación Interactiva

1. **Abrir en navegador:** http://localhost:8000/docs

**Validaciones:**
- [ ] La documentación se carga correctamente
- [ ] Aparece el endpoint `POST /api/v1/auth/register`
- [ ] El endpoint muestra:
  - [ ] Request body schema (UserCreate)
  - [ ] Response 201: SuccessResponse
  - [ ] Response 409: Error - Email already registered
  - [ ] Response 422: Validation Error
  - [ ] Response 500: Server Error

2. **Probar desde Swagger UI:**
   - [ ] Expandir el endpoint `POST /api/v1/auth/register`
   - [ ] Click en "Try it out"
   - [ ] Llenar el body JSON
   - [ ] Click en "Execute"
   - [ ] Verificar que funciona igual que en Postman

---

## Checklist Final de Integración

### Flujo Completo de Registro

- [ ] Usuario completa formulario de registro
- [ ] POST request se envía a `/api/v1/auth/register`
- [ ] Backend valida los datos con Pydantic (UserCreate schema)
- [ ] UserService verifica que el email no exista
- [ ] UserService hashea la contraseña con bcrypt
- [ ] UserService crea el usuario en la base de datos
- [ ] Backend genera un token JWT de verificación
- [ ] EmailService envía email de verificación (si está configurado)
- [ ] Backend devuelve respuesta 201 con datos del usuario
- [ ] Usuario recibe email con link de verificación

### Manejo de Errores

- [ ] Email duplicado → 409 Conflict
- [ ] Email inválido → 422 Validation Error
- [ ] Contraseña corta → 422 Validation Error
- [ ] Campos faltantes → 422 Validation Error
- [ ] Error de base de datos → 500 Internal Server Error
- [ ] Error de email service → Usuario se crea pero sin email

---

## Problemas Comunes y Soluciones

### Problema 1: Error de conexión a la base de datos
```
sqlalchemy.exc.OperationalError: could not connect to server
```
**Solución:**
- Verifica que PostgreSQL está corriendo
- Verifica la `DATABASE_URL` en `.env`
- Prueba la conexión: `.\venv\Scripts\python.exe backend/test_db.py`

### Problema 2: Módulo no encontrado
```
ModuleNotFoundError: No module named 'xxx'
```
**Solución:**
- Activa el virtual environment: `.\venv\Scripts\activate`
- Instala dependencias: `pip install -r requirements.txt`

### Problema 3: Email no se envía
```
Email service not configured, skipping verification email
```
**Solución:**
- Verifica `RESEND_API_KEY` en `.env`
- Obtén tu API key en https://resend.com/api-keys
- Verifica el dominio en Resend

### Problema 4: Token JWT inválido
```
JWTError: Invalid token
```
**Solución:**
- Verifica que `JWT_SECRET` está configurado en `.env`
- El secret debe tener al menos 32 caracteres
- El secret debe ser el mismo entre creación y verificación

---

## Resumen de Comandos Útiles

```bash
# Activar entorno virtual
.\venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
.\venv\Scripts\alembic.exe upgrade head

# Iniciar servidor
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Probar conexión a base de datos
.\venv\Scripts\python.exe test_db.py

# Ver logs en tiempo real (Windows PowerShell)
Get-Content -Path "logs/app.log" -Wait -Tail 50
```

---

## Reporte de Pruebas

### Resumen de Resultados

| Componente | Status | Notas |
|------------|--------|-------|
| TASK-039: Schemas | ⬜ Pendiente | |
| TASK-040: Password Hashing | ⬜ Pendiente | |
| TASK-041: UserService | ⬜ Pendiente | |
| TASK-042: Email Service | ⬜ Pendiente | |
| TASK-043: JWT Tokens | ⬜ Pendiente | |
| TASK-044: Register Endpoint | ⬜ Pendiente | |
| TASK-045: Error Handling | ⬜ Pendiente | |

### Problemas Encontrados

1. **Problema:** _Descripción del problema_
   - **Solución:** _Cómo se resolvió_
   - **Archivo afectado:** _Ruta del archivo_

2. **Problema:** _Descripción del problema_
   - **Solución:** _Cómo se resolvió_
   - **Archivo afectado:** _Ruta del archivo_

---

## Próximos Pasos

Una vez que este checklist esté completo:

1. [ ] Documentar todos los problemas encontrados
2. [ ] Crear issues para bugs críticos
3. [ ] Actualizar el README con instrucciones de setup
4. [ ] Continuar con la siguiente User Story (verificación de email)
5. [ ] Preparar para deploy a Railway (staging)

---

**Fecha de pruebas:** _________________

**Probado por:** _________________

**Tiempo estimado:** 2-3 horas

**Ambiente de prueba:** Local Development
