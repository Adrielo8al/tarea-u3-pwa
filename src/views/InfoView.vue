<template>
  <section class="info-container">
    <h1>Arquitectura y Estrategia PWA</h1>
    <p>Aplicación SPA/PWA desarrollada con <strong>Vue 3</strong> y <strong>Vite</strong>.</p>
    <ul>
      <li><strong>API:</strong> Consumo centralizado con validación <code>response.ok</code> y control de concurrencia vía <code>AbortController</code>.</li>
      <li><strong>Offline / Caché:</strong> Service Worker con estrategia <em>Cache First</em> para estáticos y <em>Network First</em> para datos de la API.</li>
    </ul>
  </section>
</template>

<style scoped>
.info-container { max-width: 720px; margin: 0 auto; padding: 1.5rem 1rem; line-height: 1.6; color: #334155; }
</style>