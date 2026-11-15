<script setup>
import { ref } from 'vue';

const emit = defineEmits(['crear-tarea']);

const titulo = ref('');
const descripcion = ref('');
const fechaHora = ref(new Date(Date.now() + 3600000).toISOString().slice(0, 16));
const prioridad = ref('Media');
const enviando = ref(false);

const enviarFormulario = async () => {
  if (!titulo.value.trim() || !fechaHora.value) return;

  enviando.value = true;
  emit('crear-tarea', {
    titulo: titulo.value.trim(),
    descripcion: descripcion.value.trim() || 'Sin descripción adicional.',
    fechaHora: fechaHora.value,
    prioridad: prioridad.value
  });

  titulo.value = '';
  descripcion.value = '';
  prioridad.value = 'Media';
  enviando.value = false;
};
</script>

<template>
  <form @submit.prevent="enviarFormulario" class="form-agenda">
    <h2>Agendar Nueva Tarea</h2>

    <div class="campo">
      <label for="titulo">Título de la tarea *</label>
      <input
        id="titulo"
        v-model="titulo"
        type="text"
        placeholder="Ej. Reunión de revisión de proyecto"
        required
      />
    </div>

    <div class="campo">
      <label for="descripcion">Descripción / Notas</label>
      <textarea
        id="descripcion"
        v-model="descripcion"
        rows="2"
        placeholder="Detalles, enlaces o entregables..."
      ></textarea>
    </div>

    <div class="fila-doble">
      <div class="campo">
        <label for="fechaHora">Fecha y Hora límite *</label>
        <input
          id="fechaHora"
          v-model="fechaHora"
          type="datetime-local"
          required
        />
      </div>

      <div class="campo">
        <label for="prioridad">Prioridad</label>
        <select id="prioridad" v-model="prioridad">
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>
    </div>

    <button type="submit" class="btn-guardar" :disabled="enviando">
      Agendar en Lista
    </button>
  </form>
</template>

<style scoped>
.form-agenda {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
h2 {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
}
.campo {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}
label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #334155;
}
input, textarea, select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
  font-family: inherit;
}
.fila-doble {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.btn-guardar {
  align-self: flex-start;
  padding: 0.65rem 1.4rem;
  background-color: #0284c7;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-guardar:hover {
  background-color: #0369a1;
}
</style>