<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-layout">
    <nav class="navbar" aria-label="Navegación principal">
      <div class="nav-content">
        <span class="brand">AppWeb U3</span>
        <div class="links">
          <RouterLink to="/">Tareas</RouterLink>
          <RouterLink to="/info">Info PWA</RouterLink>
        </div>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
}
.navbar {
  background-color: #0f172a;
  color: white;
  padding: 0.9rem 1rem;
}
.nav-content {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  font-weight: 700;
  font-size: 1.1rem;
}
.links {
  display: flex;
  gap: 1.25rem;
}
.links a {
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
}
.links a.router-link-active {
  color: #ffffff;
  border-bottom: 2px solid #38bdf8;
  padding-bottom: 2px;
}
</style>