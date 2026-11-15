const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

let currentController = null;

// Datos base en español para enriquecer los registros de la API pública
const tareasEjemplo = [
  { titulo: 'Entregar informe técnico Unidad 3', descripcion: 'Exportar PDF con diagrama de componentes y estrategia de caché.', prioridad: 'Alta', offsetHoras: 4 },
  { titulo: 'Revisar Service Worker en modo Offline', descripcion: 'Verificar caché de assets y respuestas GET en DevTools.', prioridad: 'Alta', offsetHoras: 8 },
  { titulo: 'Subir repositorio a GitHub', descripcion: 'Incluir README con instrucciones de instalación y despliegue.', prioridad: 'Media', offsetHoras: 24 },
  { titulo: 'Desplegar aplicación en Vercel', descripcion: 'Validar certificado HTTPS y manifest instalable.', prioridad: 'Media', offsetHoras: 30 },
  { titulo: 'Optimizar accesibilidad de formularios', descripcion: 'Verificar etiquetas label, contraste y atributos aria-live.', prioridad: 'Baja', offsetHoras: 48 }
];

export const apiService = {
  async getAll(filtroTexto = '') {
    // Cancela cualquier petición anterior en vuelo (evita condiciones de carrera)
    if (currentController) {
      currentController.abort();
    }
    currentController = new AbortController();

    try {
      const response = await fetch(`${BASE_URL}?_limit=5`, {
        signal: currentController.signal
      });

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: No se pudo obtener la agenda.`);
      }

      const rawData = await response.json();

      // Transforma la respuesta de la API en objetos de agenda estructurados
      const ahora = Date.now();
      const tareasFormateadas = rawData.map((item, idx) => {
        const plantilla = tareasEjemplo[idx % tareasEjemplo.length];
        const fechaLimite = new Date(ahora + plantilla.offsetHoras * 3600000)
          .toISOString()
          .slice(0, 16);

        return {
          id: item.id,
          titulo: plantilla.titulo,
          descripcion: plantilla.descripcion,
          fechaHora: fechaLimite,
          prioridad: plantilla.prioridad,
          completada: item.completed
        };
      });

      if (!filtroTexto.trim()) return tareasFormateadas;

      const q = filtroTexto.toLowerCase();
      return tareasFormateadas.filter(
        (t) =>
          t.titulo.toLowerCase().includes(q) ||
          t.descripcion.toLowerCase().includes(q)
      );
    } catch (error) {
      if (error.name === 'AbortError') {
        return null;
      }
      throw error;
    }
  },

  async create(nuevaTarea) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: nuevaTarea.titulo,
        completed: false,
        userId: 1
      })
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: No se pudo agendar la tarea.`);
    }

    await response.json();
    return {
      ...nuevaTarea,
      id: Date.now(),
      completada: false
    };
  }
};