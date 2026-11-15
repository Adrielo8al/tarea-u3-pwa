<script setup>
defineProps({
  tipo: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['reintentar']);
</script>

<template>
  <div
    class="estado-box"
    :class="tipo"
    :role="tipo === 'error' ? 'alert' : 'status'"
    aria-live="polite"
  >
    <p v-if="tipo === 'cargando'">Cargando tareas desde el servidor...</p>
    <p v-else-if="tipo === 'vacio'">No hay tareas registradas.</p>
    <template v-else-if="tipo === 'error'">
      <p>{{ mensaje || 'Ocurrió un error al conectar con la API.' }}</p>
      <button type="button" @click="emit('reintentar')">Reintentar</button>
    </template>
  </div>
</template>

<style scoped>
.estado-box {
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  background: #f1f5f9;
  color: #475569;
}
.estado-box.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
button {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background: #991b1b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>