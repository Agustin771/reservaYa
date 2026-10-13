🏡 ReservaYa

ReservaYa es una aplicación web de reservas de alojamientos, desarrollada como proyecto integrador del desafío Professional Developer de Digital House.

Permite visualizar alojamientos disponibles en un catálogo, consultar sus detalles y administrar productos mediante un panel de administración.

🚀 Funcionalidades — Sprint 1

🏠 Página principal con catálogo de alojamientos.

🔎 Buscador y sección de categorías.

🖼️ Visualización de imágenes y detalle de cada alojamiento.

📄 Paginación del catálogo.

➕ Registro de nuevos productos desde el panel de administración.

📋 Listado de productos registrados.

🗑️ Eliminación de productos con confirmación.

💾 Persistencia de datos mediante MySQL.

🛠️ Tecnologías utilizadas

Frontend

React

Vite

JavaScript

CSS

Backend

Java

Spring Boot

Spring Data JPA

Spring Security

Maven

Base de datos

MySQL

⚙️ Instalación y ejecución

Requisitos previos

Java y Maven.

Node.js y npm.

MySQL Server.

Git.

1. Clonar el repositorio

git clone https://github.com/Agustin771/reservaYa.git
cd reservaYa

2. Configurar la base de datos

Iniciar MySQL y crear una base de datos para el proyecto:

CREATE DATABASE proyecto_coder;

Configurar las credenciales de conexión en el backend según las variables utilizadas por la aplicación.

No publicar contraseñas ni claves secretas en el repositorio.

3. Ejecutar el backend

Abrir el proyecto backend en el IDE o desde la terminal, ingresar a la carpeta correspondiente y ejecutar la aplicación Spring Boot.

Verificar que la conexión con MySQL esté configurada correctamente antes de iniciar el servidor.

4. Ejecutar el frontend

Ingresar a la carpeta del frontend y ejecutar:

npm install
npm run dev

Abrir en el navegador la dirección local que indique Vite en la terminal.

🧪 Pruebas funcionales

Durante el desarrollo se verificaron las siguientes operaciones:

Crear productos desde el panel de administración.

Visualizar los productos registrados en la página principal.

Eliminar productos y comprobar su desaparición del catálogo.

📌 Alcance del proyecto

Este repositorio corresponde al desarrollo del Sprint 1 del desafío Professional Developer de Digital House.

Las funcionalidades se incorporarán progresivamente de acuerdo con los requerimientos de los siguientes sprints.

👨‍💻 Autor

Agustín Pérez

Proyecto académico — Digital House, Professional Developer.

Repositorio: ReservaYa en GitHub
