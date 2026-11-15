<script setup>
import { computed } from 'vue';

const props = defineProps({
  tarea: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['alternar-estado', 'eliminar']);

const fechaFormateada = computed(() => {
  if (!props.tarea.fechaHora) return 'Sin fecha';
  const fecha = new Date(props.tarea.fechaHora);
  return fecha.toLocaleString('es-EC', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});
</script>

<template>
  <article class="card" :class="{ completada: tarea.completada }">
    <div class="card-top">
      <div class="check-titulo">
        <input
          type="checkbox"
          :id="'check-' + tarea.id"
          :checked="tarea.completada"
          @change="emit('alternar-estado', tarea.id)"
        />
        <label :for="'check-' + tarea.id" class="titulo">
          {{ tarea.titulo }}
        </label>
      </div>
      <span class="badge" :class="tarea.prioridad.toLowerCase()">
        {{ tarea.prioridad }}
      </span>
    </div>

    <p class="descripcion">{{ tarea.descripcion }}</p>

    <div class="card-footer">
      <span class="fecha">📅 {{ fechaFormateada }}</span>
      <button
        type="button"
        class="btn-eliminar"
        :aria-label="'Eliminar tarea ' + tarea.titulo"
        @click="emit('eliminar', tarea.id)"
      >
        Eliminar
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #0284c7;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.card.completada {
  border-left-color: #94a3b8;
  opacity: 0.78;
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}
.check-titulo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.titulo {
  font-weight: 600;
  font-size: 1.02rem;
  color: #0f172a;
  cursor: pointer;
}
.completada .titulo {
  text-decoration: line-through;
  color: #64748b;
}
.descripcion {
  margin: 0;
  font-size: 0.9rem;
  color: #475569;
  padding-left: 1.65rem;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.65rem;
  margin-top: 0.25rem;
}
.fecha {
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 500;
}
.badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.badge.alta { background: #fee2e2; color: #b91c1c; }
.badge.media { background: #fef3c7; color: #b45309; }
.badge.baja { background: #dcfce7; color: #15803d; }
.btn-eliminar {
  background: transparent;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 0.3rem 0.65rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
}
.btn-eliminar:hover {
  background: #fee2e2;
}
</style>