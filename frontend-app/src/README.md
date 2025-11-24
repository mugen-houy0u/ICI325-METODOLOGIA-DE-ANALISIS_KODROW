# Sistema de Agendamiento - Estéticom

Plataforma web de agendamiento para la clínica odontológica Estéticom construida con Next.js.

## 🚀 Tecnologías

- **Next.js 15** - Framework React con App Router
- **React 19** - Librería de componentes
- **TypeScript** - Tipado estático
- **Tailwind CSS 4.0** - Estilos
- **Shadcn/UI** - Componentes de interfaz
- **Lucide React** - Iconos

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx          # Layout raíz de Next.js
│   ├── page.tsx            # Página principal con flujo de agendamiento
│   └── globals.css         # Estilos globales y configuración Tailwind
├── components/
│   ├── ConsultationTypeStep.tsx    # Paso 1: Selección de tipo de consulta
│   ├── PatientInfoStep.tsx         # Paso 2: Formulario de datos del paciente
│   ├── DoctorScheduleStep.tsx      # Paso 3: Selección de doctor y horario
│   ├── ConfirmationDialog.tsx      # Modal de confirmación de reserva
│   └── ui/                         # Componentes Shadcn/UI
├── types/
│   └── appointment.ts      # Tipos TypeScript compartidos
└── tsconfig.json          # Configuración TypeScript

```

## 🎯 Características

### Flujo de Agendamiento Multi-Paso

1. **Tipo de Consulta**: Selección entre Consulta, Operación o Estética
2. **Datos del Paciente**: Formulario con nombre, apellido, RUT y teléfono
3. **Doctor y Horario**: Selección de doctor especializado según el tipo de consulta y horarios disponibles
4. **Confirmación**: Popup con resumen completo de la cita agendada

### Funcionalidades Principales

- ✅ Navegación paso a paso con indicador de progreso
- ✅ Doctores especializados por tipo de consulta
- ✅ Horarios dinámicos según el doctor seleccionado
- ✅ Calendario interactivo (deshabilita domingos y fechas pasadas)
- ✅ Validación de formularios
- ✅ Diseño responsive
- ✅ Datos mock listos para integración con backend

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 🔄 Migración desde React

Esta aplicación ha sido migrada de React a Next.js con las siguientes mejoras:

- **App Router**: Estructura moderna de Next.js con carpeta `/app`
- **Server Components**: Layout raíz como Server Component
- **Client Components**: Componentes con interactividad marcados con `'use client'`
- **Path Aliases**: Imports limpios usando `@/` 
- **TypeScript**: Configuración optimizada para Next.js

## 🎨 Personalización

### Colores del tema

Los colores principales están configurados en `/app/globals.css`:
- Primario: Teal (`--color-teal-600`)
- Puedes modificar las variables CSS en `:root` para personalizar el tema

### Datos Mock

Los doctores y horarios están definidos en `/components/DoctorScheduleStep.tsx`:
- Fácilmente reemplazables por llamadas a API
- Estructura lista para integración con base de datos

## 🚀 Próximos Pasos

- [ ] Integración con Supabase para persistencia de datos
- [ ] Validación de RUT chileno
- [ ] Sistema de notificaciones por SMS/Email
- [ ] Panel de administración para gestionar citas
- [ ] Sistema de autenticación para pacientes
- [ ] Recordatorios automáticos

## 📄 Licencia

Proyecto privado - Clínica Estéticom
