<script setup>
import { ref, computed, onMounted } from 'vue';
import { apiService } from '../services/apiService';
import TareaForm from '../components/TareaForm.vue';
import TareaCard from '../components/TareaCard.vue';
import EstadoFeedback from '../components/EstadoFeedback.vue';

const tareas = ref([]);
const cargando = ref(false);
const error = ref(null);
const busqueda = ref('');
const filtroEstado = ref('todas'); // 'todas' | 'pendientes' | 'completadas'
const mostrarFormulario = ref(false);

const cargarTareas = async () => {
  cargando.value = true;
  error.value = null;
  try {
    const datos = await apiService.getAll(busqueda.value);
    if (datos !== null) {
      tareas.value = datos;
    }
  } catch (err) {
    error.value = err.message || 'No se pudo cargar la agenda.';
  } finally {
    cargando.value = false;
  }
};

const tareasFiltradas = computed(() => {
  if (filtroEstado.value === 'pendientes') {
    return tareas.value.filter((t) => !t.completada);
  }
  if (filtroEstado.value === 'completadas') {
    return tareas.value.filter((t) => t.completada);
  }
  return tareas.value;
});

const agregarTarea = async (nuevaTarea) => {
  try {
    const creada = await apiService.create(nuevaTarea);
    tareas.value.unshift(creada);
    mostrarFormulario.value = false;
  } catch (err) {
    error.value = 'Error al agendar: ' + err.message;
  }
};

const alternarEstado = (id) => {
  const tarea = tareas.value.find((t) => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
  }
};

const eliminarTarea = (id) => {
  tareas.value = tareas.value.filter((t) => t.id !== id);
};

onMounted(() => cargarTareas());
</script>

<template>
  <section class="contenedor">
    <header class="cabecera">
      <div>
        <h1>Agenda y Gestión de Tareas</h1>
        <p class="subtitulo">Organiza actividades con fecha límite y prioridad</p>
      </div>
      <div class="acciones-top">
        <button
          type="button"
          class="btn-nuevo"
          @click="mostrarFormulario = !mostrarFormulario"
        >
          {{ mostrarFormulario ? 'Cerrar Formulario' : '+ Agendar Tarea' }}
        </button>
        <button type="button" class="btn-refrescar" @click="cargarTareas">
          Sincronizar API
        </button>
      </div>
    </header>

    <TareaForm
      v-if="mostrarFormulario"
      class="panel-form"
      @crear-tarea="agregarTarea"
    />

    <!-- Barra de búsqueda y filtros -->
    <div class="controles">
      <input
        v-model="busqueda"
        type="search"
        placeholder="Buscar en la agenda..."
        aria-label="Buscar tareas"
        @input="cargarTareas"
      />
      <div class="filtros" role="group" aria-label="Filtrar por estado">
        <button
          type="button"
          :class="{ activo: filtroEstado === 'todas' }"
          @click="filtroEstado = 'todas'"
        >
          Todas ({{ tareas.length }})
        </button>
        <button
          type="button"
          :class="{ activo: filtroEstado === 'pendientes' }"
          @click="filtroEstado = 'pendientes'"
        >
          Pendientes
        </button>
        <button
          type="button"
          :class="{ activo: filtroEstado === 'completadas' }"
          @click="filtroEstado = 'completadas'"
        >
          Completadas
        </button>
      </div>
    </div>

    <!-- Estados de la UI -->
    <EstadoFeedback v-if="cargando" tipo="cargando" />

    <EstadoFeedback
      v-else-if="error"
      tipo="error"
      :mensaje="error"
      @reintentar="cargarTareas"
    />

    <EstadoFeedback
      v-else-if="tareasFiltradas.length === 0"
      tipo="vacio"
    />

    <div v-else class="lista-tareas">
      <TareaCard
        v-for="tarea in tareasFiltradas"
        :key="tarea.id"
        :tarea="tarea"
        @alternar-estado="alternarEstado"
        @eliminar="eliminarTarea"
      />
    </div>
  </section>
</template>

<style scoped>
.contenedor {
  max-width: 780px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}
.cabecera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
h1 {
  font-size: 1.55rem;
  color: #0f172a;
  margin: 0;
}
.subtitulo {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  color: #64748b;
}
.acciones-top {
  display: flex;
  gap: 0.6rem;
}
.btn-nuevo {
  padding: 0.55rem 1rem;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-refrescar {
  padding: 0.55rem 0.9rem;
  background: #e2e8f0;
  color: #1e293b;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
.panel-form {
  margin-bottom: 1.5rem;
}
.controles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.controles input {
  flex: 1;
  min-width: 220px;
  padding: 0.55rem 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}
.filtros {
  display: flex;
  gap: 0.4rem;
}
.filtros button {
  padding: 0.45rem 0.85rem;
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #334155;
}
.filtros button.activo {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
}
.lista-tareas {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>