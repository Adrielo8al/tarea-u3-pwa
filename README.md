# Agenda y Gestión de Tareas (SPA / PWA con Vue 3)

Aplicación web de una sola página (SPA) y Progressive Web App (PWA) desarrollada con Vue 3 y Vite para la Unidad 3 de Aplicaciones Web (Universidad Politécnica Salesiana).

## Características principales
- Arquitectura de componentes en Vue 3 (TareasView, TareaForm, TareaCard, EstadoFeedback).
- Consumo centralizado de API con fetch, validación de response.ok y control de concurrencia con AbortController.
- Soporte PWA instalable y modo offline mediante vite-plugin-pwa (Workbox).

## Cómo ejecutar el proyecto
1. Instalar dependencias: npm install
2. Modo desarrollo: npm run dev
3. Modo producción / PWA: npm run build y luego npm run preview