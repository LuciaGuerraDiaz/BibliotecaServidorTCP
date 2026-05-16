# BibliotecaServidorTCP
API TCP Cliente-Servidor en Node.js para gestionar una biblioteca mediante arquitectura MVC. Permite listar libros en tablas organizadas por consola y añadir nuevos ejemplares indexando autores y editoriales en archivos JSON en tiempo real, usando UUID v4 y control de errores en sockets. 📚✨

# 📚 Sistema de Gestión de Biblioteca - TCP API

¡Bienvenido/a! Este proyecto es un sistema de gestión de biblioteca basado en una **arquitectura Cliente-Servidor** utilizando sockets **TCP** nativos en Node.js. Permite la administración de libros, autores y editoriales con persistencia de datos en archivos JSON locales, implementando el patrón de diseño **MVC (Modelo-Vista-Controlador)**.

---

## 🚀 Características del Proyecto

* **Servidor TCP Robusto:** Maneja conexiones concurrentes, procesamiento de comandos estructurados y control de excepciones para evitar caídas del servicio.
* **Cliente Interactivos por Consola:** Menú guiado paso a paso con emoticons y visualización de datos en formato de tabla limpia (`console.table`).
* **Asociación Dinámica (Relaciones):** Al agregar un libro, el sistema verifica si el Autor o la Editorial ya existen por su nombre. Si no existen, los crea automáticamente "al vuelo" y genera identificadores únicos con `UUID v4`.
* **Base de Datos en JSON:** Persistencia fluida mediante el módulo nativo `fs` (File System) de Node.js.

---

## 🛠️ Tecnologías y Módulos Utilizados

* **Runtime:** Node.js (versión 20+ recomendada)
* **Networking:** Módulo nativo `net` (Sockets TCP)
* **I/O Consola:** Módulo nativo `readline`
* **Persistencia:** Módulo nativo `fs` y `path`
* **IDs Únicos:** Librería externa `uuid`

---

## 📂 Estructura del Proyecto (MVC)

```text
book-api/
├── data/
│   ├── books.json          # "Base de datos" de libros
│   ├── authors.json        # "Base de datos" de autores
│   └── publishers.json     # "Base de datos" de editoriales
├── controllers/
│   └── bookController.js   # Lógica de negocio y cruce de datos
├── models/
│   ├── bookModel.js        # Manejo I/O de libros
│   ├── authorModel.js      # Manejo I/O de autores
│   └── publisherModel.js   # Manejo I/O de editoriales
├── views/
│   └── bookView.js         # Formateador de respuestas para el protocolo
├── server.js               # Servidor TCP (Escucha en puerto 8080)
├── client.js               # Cliente TCP (Interfaz de usuario)
└── package.json            # Dependencias del proyecto
